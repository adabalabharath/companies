import { applyMiddleware, legacy_createStore } from "redux";
import { companyReducer } from "./companyReducer";
import { thunk } from "redux-thunk";

const initialState={
    loading:false,
    data:[],
    error:false,
    sortDes:false,
    sortAsc:true
}

export const store= legacy_createStore(companyReducer,initialState,applyMiddleware(thunk))