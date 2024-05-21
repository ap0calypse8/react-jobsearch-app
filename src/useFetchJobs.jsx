import { useReducer,useEffect } from "react"
import axios from 'axios' //for http request

const ACTION = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR:'error'
}

const base_url = `https://jsearch.p.rapidapi.com/search`

function reducer (state,action) {
    switch (action.type) {
        case ACTION.MAKE_REQUEST:
            return {loading: true, jobs:[] }
        case ACTION.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs }
        case ACTION.ERROR:
            return{...state,loading: false,error: action.payload.error, jobs:[] }
        default:
            return state
    }
}


export default function useFetchJobs(params, page) {
const [state,dispatch] = useReducer(reducer,{jobs: [],loading: true})


useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    dispatch({type: ACTION.MAKE_REQUEST })

    axios.get(base_url, {
        cancelToken: cancelToken.token,
        params: {  job_id: '7oKm_SkxjLxpFtVuAAAAAA==',
        extended_publisher_details: 'false',query: 'software', page: page, ...params },
        headers: {
            'X-RapidAPI-Key': '008e06e88dmshd0aed1084439b6dp1ebf16jsnde460374e045',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          }
      })
    
    .then(res =>{
        dispatch({type: ACTION.GET_DATA, payload: {jobs: res.data.results} })
})

.catch(e=> {
    if(axios.isCancel(e)) return 
    dispatch({ type: ACTION.ERROR, payload: {error: e} })
})
    return () => {
        cancelToken.cancel()
    }
},[params, page])

    return state
}
