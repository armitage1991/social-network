const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};
    data.handle = !isEmpty(data.handle)? data.handle:'';
    data.status = !isEmpty(data.status)? data.status:'';
    data.skills = !isEmpty(data.skills)? data.skills:'';

    if(!validator.isLength(data.handle,{min:2,max:40})){
        errors.handle = 'handle must be between 2 and 4 characters'
    }

    if(validator.isEmpty(data.handle)){
        errors.handle = 'handle profile must be provided'
    }

    if(validator.isEmpty(data.status)){
        errors.status = 'status field is required'
    }

    if(validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required'
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = 'is not a valid url';
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'is not a valid url';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = 'is not a valid url';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'is not a valid url';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'is not a valid url';
        }
    }

    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = 'is not a valid url';
        }
    }

    if(!validator.isLength(data.handle,{min:2,max:40})){
        errors.handle = 'handle must be between 2 and 4 characters'
    }


  

    return {
        errors,
        isValid:isEmpty(errors)
    }
}