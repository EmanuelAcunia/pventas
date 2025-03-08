import { postData } from '../api/requests';

export const postAuthLogin = async (appUser, appPass) => {
    let queryParams = [];

    if (appUser) { 
        queryParams.push(`usr=${encodeURIComponent(appUser)}`);
    } 
    if (appPass) { 
        queryParams.push(`pass=${encodeURIComponent(appPass)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    console.log(`postAuthLogin: /ws_seller.php${queryString}`);
    return await postData(`/ws_seller.php${queryString}`);
};
