import { ALGOLIO_FAIL_API, ALGOLIO_REQUEST_API, ALGOLIO_SUCCESS_API } from "../constants/AlgolioGetAPIConstants"
import axios from 'axios'

export const algolioGetAPIDet = () => async (dispatch,getState) => {
    try {
        dispatch({
            type: ALGOLIO_REQUEST_API,
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            }
        }

        const  {data}  =  await axios.get(`/api/config/algolia`,config)
               
        dispatch({
            type: ALGOLIO_SUCCESS_API,
            payload: data.app_id,
            payload1: data.search_api_key,
            payload2: data.index_id,
            payload3: data.ALGOLIA_PRICE_DESC,
            payload4: data.ALGOLIA_PRICE_ASC,
            payload5: data.ALGOLIA_QUERY_SUGGESTIONS,
        })

    } catch (error) {
        dispatch({
            type: ALGOLIO_FAIL_API,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}