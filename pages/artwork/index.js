import { useRouter } from "next/router";
import   useSWR from "swr";
import { useEffect, useState } from "react";
import { Card, Row, Col, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Artwork(){
   const  PER_PAGE = 12;
   const [artworkList, setArtworkList] = useState(null);
   const [page, setPage] = useState(1);

   const router = useRouter();
   let finalQuery = router.asPath.split('?')[1];

   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
   console.log("data in artwork/index:", data);

   function nextPage(page){
      if (page > 1) page++;
   }

   function previousPage(page){
      if (page < artworkList.length) page--;
   }

   useEffect(() => {
      if([data]){
         let results = [];
         for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
            const chunk = data?.objectIDs.slice(i, i + PER_PAGE); 
            results.push(chunk);
         }
         setArtworkList(results);
         setPage(1);
      }
   }, [data]);

   if (error){
      return(
         <>
            <Error statusCode={404} />
         </>
      );
   }
   // console.log(artworkList.length)
   if(artworkList){
      let artworks = artworkList[page-1];
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
                        <Pagination.Prev onClick={previousPage(page)}/>
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage(page)} /> 
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


