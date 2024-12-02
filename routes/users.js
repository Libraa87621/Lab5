var express = require('express');
var router = express.Router();
var userModel = require("../Models/userModel")
const JWT = require('jsonwebtoken');
const config = require("../ultil/tokenConfig");



router.get("/all", async function(req,res){
  var list = await userModel.find();
  res.json(list);
});

router.post("/login", async function(req,res){
  try {
    const {name, password} = req.body;
    const checkUser = await userModel.findOne({name: name, password: password});
    
    if (checkUser == null) {
      res.status(200).json({status: false, message: "username and password sai kìa "});
    } else {
      const token = JWT.sign({name: name}, config.SECRETKEY, {expiresIn: '30s'});
      const refreshToken = JWT.sign({name: name}, config.SECRETKEY, {expiresIn: '1d'});
      
      res.status(200).json({status: true, message: "đăng nhập thành công", token: token, refreshToken: refreshToken});
    }
    
  } catch (e) {
    res.status(400).json({status: false, message: "có lỗi"});
  }
});


module.exports = router;