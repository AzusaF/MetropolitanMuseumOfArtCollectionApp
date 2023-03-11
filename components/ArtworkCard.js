import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCard(props) {
   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher);

   if(error){
      return (
         <>
            <Error statusCode={404} />
         </>
       );
   }
   console.log(data)
   if(data){
      return (
         <>
            <Card style={{ width: '18rem' }}>
               <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall:"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}></Card.Img>
               <Card.Body>
                  <Card.Title>{data.title ? data.title :"N/A"}</Card.Title>
                  <Card.Text>
                     {data.objectDate}&&{data.classification}&&{data.medium}:"N/A"
                  </Card.Text>
                  <Link href={data.objectID}><Button variant="outline-primary">{data.objectID}</Button></Link>
               </Card.Body>
            </Card>
         </>
       );
   }else{
      return(
         <>
         </>
      )
   }
}

