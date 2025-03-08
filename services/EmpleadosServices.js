import {
    getData,
    postData,
    patchData,
    deleteData
} from './Services'

export const getEmpleadosPanel = async (searchTerm, page, perPage) => {
    let queryParams = [];
  
    if (searchTerm) {
      queryParams.push(`search=${encodeURIComponent(searchTerm || '')}`);
    }
    if (page) {
      queryParams.push(`page=${encodeURIComponent(page)}`);
    }
    if (perPage) {
      queryParams.push(`perPage=${encodeURIComponent(perPage)}`);
    }
    const queryString = queryParams.length > 0 ? `?}&${queryParams.join('&')}` : '';
  
    return await getData("/empleados", queryString);
  };

export const getEmpleadoById = async (id) => {
    const res = await getData(`/empleados/${id}`)
    return res
}

export const getXEmpleado = async (searchTerm) => {
    return await getData("/empleados", `?sel_firstname=${searchTerm}`);
};

export const postEmpleado = async (body) => {
    const res = await postData('/empleados', body)
    return res
}

export const patchEmpleado = async (id, body) => {
    const res = await patchData(`/empleados/${id}`, body)
    return res
}

export const deleteEmpleado = async (id) => {
    const res = await deleteData(`/empleados/${id}`)
    return res
}