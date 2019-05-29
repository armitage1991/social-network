import axios from 'axios';
import {GET_ERRORS} from './types';
import {SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const registeruser = (userData,history) => dispatch =>{
    axios.post('/api/users/register',userData)

            .then(result=>history.push('/login'))
            .catch(err=>
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            );
};


// login get user token

export const loginUser = userData => dispatch =>{
    axios.post('/api/users/login',userData)
        .then(res=>{     
            // Save to localStorage
            const {token} = res.data;
            // set token to local storage
            localStorage.setItem('jwtToken',token);
            // set token to auth header
            setAuthToken(token);
            //Decode Token to get the use rdata
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));

            console.log('logou');

        }).catch(err=>dispatch({
            
            type:GET_ERRORS,
            payload:err.response.data

        }))
};

// set logged user 

export const setCurrentUser = (decoded) =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Log user out

export const logoutUser = () => dispatch =>{
    // Remove the token from localstorage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    // Set the current user to an empty object and isAuthenticated to false

    dispatch(setCurrentUser({}));
    
}

