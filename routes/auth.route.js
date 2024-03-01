/**
 * poST URI
 * I need to intercep this request
 */
const authController =require("../controllers/auth.controller")
module.exports = (app)=>{
    app.post("/ecom/api/v1/auth/signup",authController.signup)
    
}






























