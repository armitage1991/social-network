const moongoose = require('mongoose');
const schema = moongoose.Schema;

const UserSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    date:{
        type:Date,
        required:Date.now()
    }
});


module.exports = User = moongoose.model('users',UserSchema);