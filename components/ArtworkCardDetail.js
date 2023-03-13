import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";

export default function ArtworkCardDetail(prop) {
   const objectID = prop.objectID;
   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

   if(error){
      return (
         <>
            <Error statusCode={404} />
         </>
       );
   }
   if(data){
      return (
         <>
            <Card>
               <Card.Img variant="top" src={data.primaryImage ? data.primaryImage :"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}></Card.Img>
               <br/><br/>
               <Card.Body>
                  <Card.Title>{data.title?data.title:"N/A"}</Card.Title>
                  <Card.Text>
                     {data.objectDate && data.classification && data.medium ?  <>{data.objectDate} {data.classification} {data.medium}<br/><br/>
                     {data.artistDisplayName} {data.artistWikidata_URL ? (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>) :""} {data.creditLine} {data.dimensions}</> :"N/A"}
                  </Card.Text>
               </Card.Body>
            </Card>
         </>
       );
   }else{
      return
      <>
      </>
   }
}