import { deleteArticulo, getArticulosPanel} from "../../services/ArticulosServices";
import { getArtNoCombosPanel} from "../../services/ArticulosCombosServices";
import { ArticulosContext } from "./ArticulosContext"

export const ArticulosState = ({ children }) => {    
    const getArticulosPanelData = async (searchTerm, searchRam, searchRub, searchSubr, searchMar, searchDes, page, perPage) => {
        let res = await getArticulosPanel(searchTerm, searchRam, searchRub, searchSubr, searchMar, searchDes, page, perPage)
        return res;
    }    
    const getArtNoCombosPanelData = async (searchTerm, searchRam, searchRub, searchSubr, searchMar, searchDes, page, perPage) => {
        let res = await getArtNoCombosPanel(searchTerm, searchRam, searchRub, searchSubr, searchMar, searchDes, page, perPage)
        return res;
    }

    const deleteArticuloData = async (body) => {
        const res = await deleteArticulo(body)
        return res
    }

    return <ArticulosContext.Provider value={{
        deleteArticuloData,
        getArticulosPanelData,
        getArtNoCombosPanelData
    }} >
        {children}
    </ArticulosContext.Provider>
}