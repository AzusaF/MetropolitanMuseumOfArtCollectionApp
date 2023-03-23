import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card, Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites(){
   const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

   if(favouritesList){
         return(
            <>
               {favouritesList.length > 0 
                  && (
                     <>
                     <Row className="gy-4">
                        {favouritesList.map((objectID)=>(
                           <Col lg={3} key={objectID}><ArtworkCard objectID={objectID} /></Col>
                        ))}
                     </Row>
                     </>
               )}
               {favouritesList.length == 0
                  && (
                  <Card>
                     <h4>Nothing Here</h4>
                     Try adding some new artwork to the list.
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