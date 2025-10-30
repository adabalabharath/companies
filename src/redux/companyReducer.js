import { DATA_SUCCESS, ERROR, LOADING, SORT_ASC, SORT_DES } from "./actionTypes";

export const companyReducer=(state,action)=>{
    switch(action.type){
        case LOADING:
            return{
                ...state,
                loading:true,
                data:[],
                error:false
            }
         case DATA_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload,
                error:false
            }
         case ERROR:
            return{
                ...state,
                loading:false,
                data:[],
                error:true
            }
         case SORT_DES:
            return{
                ...state,
                sortDes:true,
                sortAsc:false,
            }
        case SORT_ASC:
            return{
                ...state,
                sortDes:false,
                sortAsc:true,
            }
        default:
            return state
    }
}