
import {GET_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE} from '../actions/types'
const initialState = {
    profile:{},
    profiles:null,
    loading:false
}

export default function (state = initialState,action){
    console.log(action)
    switch(action.type){
        
        case CLEAR_CURRENT_PROFILE:
            return{
                ...state,
                profile:{}
            }
        
        case GET_PROFILE:
            console.log('caiu no get profile');
            return{
                ...state,
                profile:action.payload,
                loading:false
            }

        case PROFILE_LOADING:
            return{
                ...state,
                loading:true
            }
       
        default:
            return state;
    }
}