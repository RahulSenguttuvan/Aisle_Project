const express = require('express');
const router = express.Router();
const axios = require('axios')

router.post("/verifyNumber", (req,res) => {
    
    return axios.post('https://testa2.aisle.co/V1/users/phone_number_login', 
    req.body,
    { 
        headers: { 
            "Content-Type": "application/json",
            "Cookie" : "__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720"
        }      
    })
        .then(response => {
            console.log(response.data);
            res.status(200).send(response.data);
        })
        .catch(error =>{
            return res.status(404);
        })
});


router.post("/verifyOTP", (req,res) => {
    
    return axios.post('https://testa2.aisle.co/V1/users/verify_otp', req.body,
        { 
            headers: { 
                "Content-Type": "application/json",
                "Cookie" : "__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720"
            } 
        })
        .then(response => {
            console.log(response.data);
            res.status(200).send(response.data);
        })
        .catch(error =>{
            return res.status(404)
        })
});


module.exports = router; 