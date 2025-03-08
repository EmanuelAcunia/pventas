import {
    getData,
} from './Services'

export const getOrderCacheDetailLista = async () => {
    const res = await getData('/ordercachedetail/ordercachedetail_select');
    return res
}

export const getOrderCacheDetailPanel = async (searchOca,searchArt, page, perPage) => {
    let queryParams = [];
        console.log("oca",searchOca);
        console.log("art",searchArt);
        console.log("page",page);
        console.log("perPage",perPage);
    if (searchOca) {
        queryParams.push(`oca_id=${encodeURIComponent(searchOca || '')}`);
    }
    if (searchArt) {
        queryParams.push(`art_Id=${encodeURIComponent(searchArt || '')}`);
    }
    if (page) {
        queryParams.push(`page=${encodeURIComponent(page || 1)}`);
    }
    if (perPage) {
        queryParams.push(`perPage=${encodeURIComponent(perPage || 10)}`);
    }
    const queryString = queryParams.length > 0 ? `?&${queryParams.join('&')}` : '';
     const res = await getData("/ordercachedetail/getOrderCacheDetailOca_Id", queryString);
     return res
};

export const getOrderCacheDetailById = async (id) => {
    const res = await getData(`/ordercachedetail/${id}`)
    return res
}
