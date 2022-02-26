//schemas for databases>> for mongo db , first create schemas and then create model of it.
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
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

//middleware started for hashing purpose
userSchemas.pre("save", async function(next){
    // bcrypt.hash(password)
    if(this.isModified("password")){
        console.log(`password is:${this.password}`);
        this.password= await bcrypt.hash(this.password,10);
        console.log(this.password);
        this.confirmPassword=undefined;
        next();
    
    }

   
})
//middleware ended

// need to create collections
const Register=new mongoose.model("Register",userSchemas);
module.exports=Register;
