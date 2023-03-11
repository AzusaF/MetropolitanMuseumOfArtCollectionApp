import { useRouter } from "next/router";
import   useSWR from "swr";
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Artwork(){
   const  PER_PAGE = 12;
   const [artworkList, setArtworkList] = useState(null);
   const [page, setPage] = useState(1);

   const router = useRouter();
   let finalQuery = router.asPath.split('?')[1];

   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
   console.log(data);

   function previousPage(page){
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
   // console.log(artworkList.length);

   if(artworkList){
         return(
            <>
               <Row className="gy-4">
               {artworkList.length > 0 
                  && 
                  <Card>
                     {/* {artworkList[page-1].map((item)=>(
                        <Col lg={3} key={item.objectID}><ArtworkCard objectID={item.objectID} /></Col>
                     ))} */}
                     <h4>hii</h4>
                  </Card>
               }
               {artworkList.length == 0
                  &&
                  <Card>
                  <h4>Nothing Here</h4>
                  Try searching for something else.
                  </Card>
               }
               </Row>
            </>
         );
   }else{
      return(
         <>
         </>
      );   

   }
}


