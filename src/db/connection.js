//scripts for connection to database
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/registrationLogin", {
//     useNewUrlParser:true,
//     useUnifiedTopology:true
    
// }).then(()=>{
//     console.log("connection sucessful");
// }).catch((e)=>{
//     console.log("no connection");
// })

mongoose.connect('mongodb://localhost:27017/LoginRegistration',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("DB connected")
});
    