import {get, writable} from "svelte/store";
import {getApi} from "../service/api.js";

function setAccommodations() {
    let initValues = {
        numberOfElements : 0,
        content : []
    }

    const {subscribe, update, set} = writable({...initValues});

    const fetchAccommodations = async () => {

        try {
            const options = {
                path: '/accommodations',
            }

            const getDatas = await getApi(options)

            const newData = {
                numberOfElements : getDatas.accommodationResponses.numberOfElements,
                content : getDatas.accommodationResponses.content
            }

            update(datas => {
                datas.numberOfElements = datas.numberOfElements === 0 ? newData.numberOfElements : datas.numberOfElements
                datas.content = [...newData.content]

                return datas
            })
        } catch (err) {
            throw err;
        }
    }

    const fetchAccommodationDetail = async (accommodationId) => {
        try {
            const options = {
                path: '/accommodations/' + accommodationId,
            }

            const getDatas = await getApi(options);

            return getDatas
        } catch (error) {
            throw error;
        }
    }

    return {
        subscribe,
        fetchAccommodations,
        fetchAccommodationDetail
    }
}

export const accommodations = setAccommodations()