import axios from "axios";
import { DATA_SUCCESS, ERROR, LOADING, SORT_ASC, SORT_DES } from "./actionTypes";


export const fetchData =()=> async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const response = await axios.get("/public/db.json");
      setTimeout(()=>dispatch({ type: DATA_SUCCESS, payload: response.data.companies }),2000)
      
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };

export const sortAlphabetically=(order)=>async(dispatch)=>{
   dispatch({type:order=='ASC'?SORT_ASC:SORT_DES})
}