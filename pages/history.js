import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { ListGroup, Button } from "react-bootstrap";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";

export default function History(){
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
   let parsedHistory = [];
   const router = useRouter();


   if (searchHistory) {
      searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries(); 
        parsedHistory.push(Object.fromEntries(entries));
      });
   }

   function historyClicked(e, index){
      router.push(`/artwork?${searchHistory[index]}`);
   }

   async function removeHistoryClicked(e, index){
      e.stopPropagation(); // stop the event from trigging other events 
      setSearchHistory(await removeFromHistory(searchHistory[index]));
   }
   
   if(parsedHistory.length == 0){
      return null;
   }else{
      return (
         <>
           <ListGroup>
             {parsedHistory.map((historyItem, index)=> (
               <ListGroup.Item className={styles.historyListItem} onClick={()=>historyClicked(historyItem, index)}>
                 {Object.keys(historyItem).map(key => (
                   <>{historyItem[key]?(<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>):""}</>
                 ))}
                 <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
               </ListGroup.Item>
             ))}
           </ListGroup>
         </>
       );
   }  
}