import { getData } from '../api/requests';

export const getArticulosPanel = async (appUser,appPass,pag=1) => {
  let queryParams = [];
  if (pag) {
    queryParams.push(`pag=${encodeURIComponent(pag)}`);
  }
  if (appUser) { 
    queryParams.push(`usr=${encodeURIComponent(appUser)}`);
} 
if (appPass) { 
    queryParams.push(`pass=${encodeURIComponent(appPass)}`);
}
const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
console.log(`postAuthLogin: /ws_productos.php${queryString}`);

return await getData(`/ws_productos.php${queryString}`);

};
