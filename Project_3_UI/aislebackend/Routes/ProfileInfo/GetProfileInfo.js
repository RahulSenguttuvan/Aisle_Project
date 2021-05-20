const express = require('express');
const router = express.Router();
const axios = require('axios')

router.post("/getProfileInfo", (req,res) => {
    console.log(req.body)
    return axios.get('https://testa2.aisle.co/V1/users/test_profile_list', 
    { 
        headers: { 
            "Authorization": req.body.authorizationToken,
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

module.exports = router; 