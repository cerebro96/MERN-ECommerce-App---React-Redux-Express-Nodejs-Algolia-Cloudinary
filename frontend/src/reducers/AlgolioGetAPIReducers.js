import { ALGOLIO_FAIL_API, ALGOLIO_REQUEST_API, ALGOLIO_SUCCESS_API } from "../constants/AlgolioGetAPIConstants"

export const GetAlgolioAPIReducer = (state = {},action) => {
    switch(action.type){
        case ALGOLIO_REQUEST_API:
            return{
                loading: true,
            }
        case ALGOLIO_SUCCESS_API:
            return{
                loading: false,
                api_data: action.payload,
                api_key: action.payload1,
                api_index: action.payload2,
                api_pri_desc: action.payload3,
                api_pri_asc: action.payload4,
                api_que_sugg: action.payload5,
            }
        case ALGOLIO_FAIL_API:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}