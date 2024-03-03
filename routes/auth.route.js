/**
 * poST URI
 * I need to intercept this request
 */
const authController =require("../controllers/auth.controller")
const authMw = require("../middlewares/auth.mw.js")

module.exports = (app)=>{
    app.post("/ecom/api/v1/auth/signup",authMw.verifySignUpBody,authController.signup)
    app.post("/ecom/api/v1/auth/signin",authMw.verifySignInBody,authController.signin) 
}

    
    






























