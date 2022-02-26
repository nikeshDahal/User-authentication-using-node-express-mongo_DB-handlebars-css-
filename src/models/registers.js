//schemas for databases>> for mongo db , first create schemas and then create model of it.
const mongoose=require("mongoose");
const userSchemas=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
});
//schemas ended

// need to create collections
const Register=new mongoose.model("Register",userSchemas);
module.exports=Register;
