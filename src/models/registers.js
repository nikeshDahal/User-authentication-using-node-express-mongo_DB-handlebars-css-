//schemas for databases>> for mongo db , first create schemas and then create model of it.
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const res = require("express/lib/response");
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});
//schemas ended

//middleware started

//generating tokens
userSchemas.methods.generateToken=async function(){
    try {
        const tokensGenerated=await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:tokensGenerated});
         await this.save();
        return tokensGenerated;
    } catch (error) {
        res.send("error in jswon web tockens"+error);
        console.log(error,"error of json web tokens");
    }
}
//jwt token ended

//password is hashed

userSchemas.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
        this.confirmPassword=await bcrypt.hash(this.confirmPassword,10);
        next();
    }  
})

//password hashed ended
//middleware ended

// need to create collections
const Register=new mongoose.model("Register",userSchemas);
module.exports=Register;
