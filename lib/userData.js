import { getToken, removeToken, readToken } from "./authenticate";

export async function addToFavourites(id) {
   let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, {
      method: 'PUT',
      headers: {
         "Authorization": `JWT ${getToken()}`
      }
   });
   if(res.status == 200){
      let data = await res.json();
      return data;
   }else{
      return [];
   }
}

export async function removeFromFavourites(id){
   let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, {
      method: 'DELETE',
      headers: {
         "Authorization": `JWT ${removeToken()}`
      }
   });
   if(res.status == 200){
      let data = await res.json();
      return data;
   }else{
      return [];
   }
}

export async function getFavourites(){
   let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`, {
      method: 'GET',
      headers: {
         "Authorization": `JWT ${readToken()}`
      }
   });
   if(res.status == 200){
      let data = await res.json();
      return data;
   }else{
      return [];
   }
}

export async function addToHistory(id){
   let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`, {
      method: 'PUT',
      headers: {
         "Authorization": `JWT ${getToken()}`
      }
   });
   if(res.status == 200){
      let data = await res.json();
      return data;
   }else{
      return [];
   }
}

export async function removeFromHistory(id){
   let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`, {
      method: 'DELETE',
      headers: {
         "Authorization": `JWT ${removeToken()}`
      }
   });
   if(res.status == 200){
      let data = await res.json();
      return data;
   }else{
      return [];
   }
}

export async function getHistory(){
   let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history`, {
      method: 'GET',
      headers: {
         "Authorization": `JWT ${readToken()}`
      }
   });
   if(res.status == 200){
      let data = await res.json();
      return data;
   }else{
      return [];
   }
}