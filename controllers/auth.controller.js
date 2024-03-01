/**
 * Controller /llogic to register a user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")

exports.signup = async (req, res)=>{
    /**
     * Logic to create a user
     */
    //Read the request body
    const request_body = req.body  //request body in js object

    //Insert the data in mongodb collection
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password :bcrypt.hashSync(request_body.password,8)
    }
    try{
        const created_user = await user_model.create(userObj)
        const res_object = {
            name : created_user.name,
            email : created_user.email,
            userId : created_user.userId,
            userType : created_user.userType,
            craetedAt : created_user.createdAt,
            updatedAt : created_user.updatedAt
        }
        
        res.status(201).send(res_object)
    }catch(err){
        
        console.log("Error while registrating user",err)
        res.status(500).send({
            message : "Registartion failed due to error"
        })
    }

    //Return the response back to the user
}
