const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type:String,
        required:true,
        max: 40
    },

    company:{
        type:String
    },

    website:{
        type:String
    }
    ,
    localtion:{
        type:String
    }
    ,
    status:{
        type:String
    }
    ,
    skills:{
        type:[String]
    }
    ,
    bio:{
        type:String
    },
    github:{
        type:String
    },

    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String,
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String,
            }
        }
        
    ],

    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String,
            }
        }
        
    ],

    social:
        {
            youtube:{
                type:String,
            },
            twitter:{
                type:String,
            },
            facebook:{
                type:String,
            },
            instagram:{
                type:String,
            },
            linkedin:{
                type:String,
            },
            
        },
        date:{
            type:Date,
            default:Date.now
        }
       
    
});

module.exports = Profile = moongoose.model('profile',ProfileSchema);


