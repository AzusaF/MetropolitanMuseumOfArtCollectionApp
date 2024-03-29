import useSWR from "swr";
import Error from "next/error";
import { Button, Card } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail(props) {
   const objectID = props.objectID;
   const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null);
   const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
   const [showAdded, setShowAdded] = useState(false);

   useEffect(()=>{ 
      setShowAdded(favouritesList?.includes(objectID))
   }, [favouritesList])

   async function favouritesClicked(){
      if(showAdded){
         setFavouritesList(await removeFromFavourites(objectID));
         setShowAdded(false);
      }else{
         setFavouritesList(await addToFavourites(objectID))
         setShowAdded(true);
      }
   }


   if(error){
      return (
         <>
            <Error statusCode={404} />
         </>
       );
   } else if(data){
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
                     <br/><br/>
                     <Button variant={showAdded?"primary":"outline-primary"} onClick={(e)=>favouritesClicked()}>{showAdded?"+ Favourite (added)":"+ Favourite"}</Button>                
                  </Card.Text>
               </Card.Body>
            </Card>
         </>
       );
   }
}