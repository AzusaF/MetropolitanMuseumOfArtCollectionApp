import { useRouter } from "next/router";
import   useSWR from "swr";
import { useEffect, useState } from "react";
import { Card, Row, Col, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "@/public/data/validObjectIDList.json";

export default function Artwork(){
   const PER_PAGE = 12;
   const [artworkList, setArtworkList] = useState([]);
   const [page, setPage] = useState(1);

   const router = useRouter();
   let finalQuery = router.asPath.split('?')[1];

   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

   useEffect(() => {
      if([data]){
         let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));
         let results = [];
         for (let i = 0; i < filteredResults?.length; i += PER_PAGE) {
            const chunk = filteredResults.slice(i, i + PER_PAGE); 
            results.push(chunk);
         }
         setArtworkList(results);
      }
   }, [data]);

   function nextPage(){
      if (page > 0) {
         setPage(page + 1);
      }
   }

   function previousPage(){
      if (page < artworkList.length) {
         setPage(page - 1);
      }
   }

   if (error){
      return(
         <>
            <Error statusCode={404} />
         </>
      );
   }
   console.log("artworkList", artworkList)
   if(artworkList){
      let artworks = artworkList[page-1];
      console.log(artworks)
         return(
            <>
               {artworkList.length > 0 
                  && (
                     <>
                     <Row className="gy-4">
                        {artworks.map((objectID)=>(
                           <Col lg={3} key={objectID}><ArtworkCard objectID={objectID} /></Col>
                        ))}
                     </Row>
                     <Pagination>
                        <Pagination.Prev onClick={previousPage}/>
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} /> 
                     </Pagination>
                     </>
               )}
               {artworkList.length == 0
                  && (
                  <Card>
                     <h4>Nothing Here</h4>
                     Try searching for something else.
                  </Card>
               )}
            </>
         );
   }else{
      return(
         <>
         </>
      );   
   }
}


