import {
    getData,
} from './Services'

export const getOrderCacheLista = async () => {
  const res = await getData('/ordercache');
  return res
}


export const getOrderCacheById = async (id) => {
  const res = await getData(`/ordercache/${id}`)
  return res
}


export const getOrderCachePanel = async (searchCli,searchSel, page, perPage) => {
    let queryParams = [];
    if (searchCli) {
      queryParams.push(`user_id=${encodeURIComponent(searchCli)}`);
    }
    if (searchSel) {
      queryParams.push(`sel_id=${encodeURIComponent(searchSel)}`);
    }
    if (page) {
      queryParams.push(`page=${encodeURIComponent(page)}`);
    }
    if (perPage) {
      queryParams.push(`perPage=${encodeURIComponent(perPage)}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  
    return await getData("/ordercache/busquedaOrderCache_filtros", queryString);
  }
 