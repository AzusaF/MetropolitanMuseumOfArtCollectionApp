import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";


export default function ArtworkCard(prop) {
   let objectID = prop.objectID;
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
            <Card style={{ width: '18rem' }}>
               <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall:"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}></Card.Img>
               <Card.Body>
                  <Card.Title>{data.title ? data.title :"N/A"}</Card.Title>
                  <Card.Text>
                     {data.objectDate && data.classification && data.medium ?  <>{data.objectDate} {data.classification} {data.medium}</> :"N/A"}
                  </Card.Text>
                  <Link href={`/artwork/${data?.objectID}`} ><Button variant="outline-dark"><b>ID: </b>{data?.objectID}</Button></Link>
               </Card.Body>
            </Card>
         </>
      );
   }else{
      return(
         <>
         </>
      );
   }
}
