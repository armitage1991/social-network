const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    data.email = !isEmpty(data.email)? data.email:'';
    data.password = !isEmpty(data.password)? data.password:'';

    
    if(!validator.isLength(data.password,{min:6,max:30})){
        errors.password = 'password must be at least 6 characteres'
    }


    if(validator.isEmpty(data.email)){
        errors.email = 'email field is required';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'password field is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'email field format is wrong';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}