const express = require("express");
const router = express.Router();
const mongo = require("../mongo");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {

    // Checking if user already exists
    if(req.body.admin) {
      const admin = await mongo.db.collection("admin").findOne({email : req.body.email});
      if(!admin) return res.status(400).send({msg : "Not yet registered."});

      const isValid = await bcrypt.compare(req.body.password, admin.password);
      if(!isValid) return res.status(400).send({msg : "Incorrect password"});
      // generating token
      const token = JWT.sign({email : admin.email}, "SWERA", {expiresIn : '1h'});
      const adminObj = {
        token : token,
        admin_id: admin._id
      }
      res.send(adminObj);
    } else {
      const user = await mongo.db.collection("users").findOne({email : req.body.email});
      if(!user) return res.status(400).send({msg : "User not yet registered."});

      const isValid = await bcrypt.compare(req.body.password, user.password);
      if(!isValid) return res.status(400).send({msg : "Incorrect password"});
      // generating token
      const token = JWT.sign({email : user.email}, "SWERA", {expiresIn : '1h'});
      const userObj = {
        token : token,
        user_id: user._id
      }
      res.send(userObj);
    }

  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
