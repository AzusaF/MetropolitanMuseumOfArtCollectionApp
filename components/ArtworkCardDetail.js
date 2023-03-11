export default function ArtworkCardDetail(props) {
   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher);

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
               <Card.Img variant="top" src={data?primaryImage:"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}></Card.Img>
               <Card.Body>
                  <Card.Title>{data?title:"N/A"}</Card.Title>
                  <Card.Text>
                     {data.objectDate}&{data.classification}&{data.medium}<br/><br/>&
                     {data.artistDisplayName}(<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)&{data.creditLine}&{data.dimensions}
                     :"N/A"
                  </Card.Text>
                  <Link passHref><Button variant="outline-primary">{props.objectID}</Button></Link>
               </Card.Body>
            </Card>
         </>
       );
   }else{
      
   }
}