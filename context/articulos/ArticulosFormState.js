import { useEffect, useState } from "react"
import {
    getArticuloById,
    postArticulo,
    patchArticulo,
} from "../../services/ArticulosServices"
import { postArtColor } from "../../services/ArticulosColoresServices";
import { postCombo } from "../../services/ArticulosCombosServices";
import { postArtMedida } from "../../services/ArticulosMedidasServices";
import { postArtModelo } from "../../services/ArticulosModelosServices";
import { postArtPresentacion } from "../../services/ArticulosPresentacionesServices";
import { postArtTalle } from "../../services/ArticulosTallesServices";
import { postArtTemporada } from "../../services/ArticulosTemporadasServices";
import { ArticulosFormContext } from "./ArticulosContext"
import { useNavigate, useParams } from 'react-router-dom';

export const ArticulosFormState = ({ children }) => {
    const [report, setReport] = useState({})
    // Definir estados para las variables temporales
    const [caracteristicasData, setCaracteristicasData] = useState({
        color: [],
        medida: [],
        modelo: [],
        combo: [],
        presentacion: [],
        talle: [],
        temporada: []
    });
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        if (id) getArticuloByIdData(id)
    }, [id])

    const getArticuloByIdData = async (id) => {
        let res = await getArticuloById(id)
        console.log("res: ", res)
        if (res) setReport(res)
        return res
    }

    const postArticuloData = async (body) => {
        let res = null;
        console.log("body original ", body); // Verifica que el body original contiene los datos correctos

        try {
            if (caracteristicasData.combo.length > 0) {
                const Articulos_combo = caracteristicasData.combo.map(({ ac_id_hijo, ac_cantidad }) => ({
                    "id": ac_id_hijo,  // Renombrar `ac_id_hijo` a `id`
                    "cantidad": parseFloat(ac_cantidad) // Mantener `cantidad`
                }));

                console.log("Array combo actualizado con id y cantidad:", Articulos_combo);

                // Serializar el array `Articulos_combo` a JSON y agregarlo a FormData
                body.append('art_id', JSON.stringify(Articulos_combo));

                console.log("FormData actualizado con Articulos_combo serializado:", body.get('art_id'));
                res = await postCombo(body);
                console.log("res: ", res);
            }
            else {
                console.log("El array combos está vacío.");
                res = await postArticulo(body); // Si no hay combo, usar el body original
                console.log("res: ", res);
            }

            if (res) {
                const articleId = res.data.id;
                console.log("id res", res.data.id);
                console.log("codigo res", res.data.art_codigo);

                // Revisión de las características y grabación de datos adicionales
                if (caracteristicasData.color.length > 0) {
                    await grabarColores(articleId, caracteristicasData.color);
                } else {
                    console.log("El array color está vacío.");
                }

                if (caracteristicasData.medida.length > 0) {
                    await grabarMedidas(articleId, caracteristicasData.medida);
                } else {
                    console.log("El array medida está vacío.");
                }

                if (caracteristicasData.modelo.length > 0) {
                    await grabarModelos(articleId, caracteristicasData.modelo);
                } else {
                    console.log("El array modelo está vacío.");
                }

                if (caracteristicasData.presentacion.length > 0) {
                    await grabarPresentaciones(articleId, caracteristicasData.presentacion);
                } else {
                    console.log("El array presentacion está vacío.");
                }

                if (caracteristicasData.talle.length > 0) {
                    await grabarTalles(articleId, caracteristicasData.talle);
                } else {
                    console.log("El array talle está vacío.");
                }

                if (caracteristicasData.temporada.length > 0) {
                    await grabarTemporadas(articleId, caracteristicasData.temporada);
                } else {
                    console.log("El array temporadas está vacío.");
                }

                navigate("/articulos");
            }
        } catch (error) {
            console.error("Error al guardar el artículo:", error);
        }
    };

    const grabarColores = async (articleId, colores) => {

        console.log("El array color tiene elementos.", colores);
        console.log("colores para guardar", colores)
        // Recorrer el array de colores y ejecutar postColor para cada uno
        const promises = colores.map(async (color) => {
            // Ajustar el body del color según lo que se necesita para postColor
            delete color.id;
            delete color.art_Id;
            delete color.col_descripcion;
            const colorBody = {
                art_Id: articleId,  // Asociar el color al ID del artículo recién creado
                ...color  // Si el objeto color ya tiene las propiedades necesarias
            };
            console.log("color para guardar", colorBody)
            try {
                const colorRes = await postArtColor(colorBody);
                console.log("Color guardado:", colorRes);
                return colorRes;  // Devolver el resultado de cada postColor
            } catch (error) {
                console.error("Error al guardar el color:", error);
                throw error;  // Lanzar el error para manejarlo si es necesario
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

    };

    const grabarMedidas = async (articleId, medidas) => {

        console.log("El array medida  tiene elementos.", medidas);
        console.log("medida para guardar", medidas)

        const promises = medidas.map(async (medida) => {

            delete medida.id;
            delete medida.art_Id;
            delete medida.med_descripcion;
            const medidaBody = {
                art_Id: articleId,
                ...medida
            };
            console.log("medida para guardar", medidaBody)
            try {
                const medidaRes = await postArtMedida(medidaBody);
                console.log("medida guardado:", medidaRes);
                return medidaRes;
            } catch (error) {
                console.error("Error al guardar el medida:", error);
                throw error;
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

    };

    const grabarModelos = async (articleId, modelos) => {

        console.log("El array modelos tiene elementos.", modelos);
        console.log("modelos para guardar", modelos)
        const promises = modelos.map(async (modelos) => {

            delete modelos.id;
            delete modelos.art_Id;
            delete modelos.mod_descripcion;
            const modeloBody = {
                art_Id: articleId,
                ...modelos
            };
            console.log("modelo para guardar", modeloBody)
            try {
                const modeloRes = await postArtModelo(modeloBody);
                console.log("modelo guardado:", modeloRes);
                return modeloRes;  // Devolver el resultado de cada postModelo
            } catch (error) {
                console.error("Error al guardar el modelo:", error);
                throw error;  // Lanzar el error para manejarlo si es necesario
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

    };

    const grabarPresentaciones = async (articleId, presentaciones) => {

        console.log("El array presentacion tiene elementos.", presentaciones);
        console.log("presentaciones para guardar", presentaciones)
        const promises = presentaciones.map(async (presentacion) => {
            delete presentacion.id;
            delete presentacion.art_Id;
            delete presentacion.pre_descripcion;
            const presentacionBody = {
                art_Id: articleId,
                ...presentacion
            };
            console.log("presentacion para guardar", presentacionBody)
            try {
                const presentacionRes = await postArtPresentacion(presentacionBody);
                console.log("presentacion guardado:", presentacionRes);
                return presentacionRes;
            } catch (error) {
                console.error("Error al guardar el presentacion:", error);
                throw error;
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

    };

    const grabarTalles = async (articleId, talles) => {

        console.log("El array talles tiene elementos.", talles);
        console.log("talles para guardar", talles)
        const promises = talles.map(async (talle) => {
            // Ajustar el body del color según lo que se necesita para postColor
            delete talle.id;
            delete talle.art_Id;
            delete talle.tal_descripcion;
            const talleBody = {
                art_Id: articleId,
                ...talle
            };
            console.log("talle para guardar", talleBody)
            try {
                const talleRes = await postArtTalle(talleBody);
                console.log("talle guardado:", talleRes);
                return talleRes;  // Devolver el resultado de cada postColor
            } catch (error) {
                console.error("Error al guardar el talle:", error);
                throw error;  // Lanzar el error para manejarlo si es necesario
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

    };

    const grabarTemporadas = async (articleId, temporadas) => {

        console.log("El array talles tiene elementos.", temporadas);
        console.log("talles para guardar", temporadas)
        const promises = temporadas.map(async (temporada) => {
            // Ajustar el body del color según lo que se necesita para postColor
            delete temporada.id;
            delete temporada.art_Id;
            delete temporadas.tem_descripcion;
            const temporadaBody = {
                art_Id: articleId,
                ...temporada
            };
            console.log("temporadas para guardar", temporadaBody)
            try {
                const temporadaRes = await postArtTemporada(temporadaBody);
                console.log("temporada guardado:", temporadaRes);
                return temporadaRes;  // Devolver el resultado de cada postColor
            } catch (error) {
                console.error("Error al guardar el temporada:", error);
                throw error;  // Lanzar el error para manejarlo si es necesario
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

    };

    const patchArticuloData = async (id, body) => {
        const res = await patchArticulo(id, body)
        if (res) navigate("/articulos");
    }

    const addItemToArray = (type, item) => {
        setCaracteristicasData(prevState => ({
            ...prevState,
            [type]: [...prevState[type], item]
        }));
    };

    const viewItemFromArray =  (type, id) => {
        // Convertimos ambos a string para asegurarnos de que la comparación sea consistente
        const item =caracteristicasData.type.find((item) => String(item.id) === String(id));

        return item || null; // Si no encuentra el elemento, devuelve null
    };
 


    const updateItemFromArray = (type, id, cantidad) => {
        setCaracteristicasData(prevState => ({
            ...prevState,
            [type]: prevState[type].map(item =>
                item.id === id
                    ? { ...item, ac_cantidad: cantidad }
                    : item
            )
        }));
    };

    const deleteItemFromArray = (type, id) => {
        setCaracteristicasData(prevState => ({
            ...prevState,
            [type]: prevState[type].filter(item => item.id !== id)
        }));
    };

    return <ArticulosFormContext.Provider value={{
        report,

        postArticuloData,
        patchArticuloData,

        getArticuloByIdData,

        caracteristicasData,
        addItemToArray,
        viewItemFromArray,
        updateItemFromArray,
        deleteItemFromArray
    }} >
        {children}
    </ArticulosFormContext.Provider>
}