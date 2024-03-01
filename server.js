//starting file of project

const express = require("express")
const mongoose = require("mongoose")
const server_config = require("./configs/server.config")
const app = express()
const db_config = require ("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())  //whenever u read json then read that as javascript object

/**
 * Create an admin user at the starting of app if not present
 */
//connection with database
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection

db.on("error" , (err)=>{
    console.log("Error occured")
})
db.once("open" , ()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init() {
    try{
        let user = await user_model.findOne({userId : "admin"})
        console.log(user)
        
        if(user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error while reading data ",err)
    }
    
    
    try{
        user = await user_model.create({
            name : "mehnaz",
            userId : "admin",
            email : "menaz@mail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome1",8)
        })
        
        console.log("Admin created")

    }catch(err){
        console.log("Error while creating admin" , reportError)
    }
}
//Stich the route to the server

require("./routes/auth.route")(app)  //calling routes and passing app object
//Start the server
app.listen(server_config.PORT, () => {
    console.log("Server Started at port num : ", server_config.PORT)
})