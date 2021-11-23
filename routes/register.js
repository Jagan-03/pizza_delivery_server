const express = require("express");
const router = express.Router();
const mongo = require("../mongo");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/resetPassword", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().max(50).required(),
      password: Joi.string()
      .min(8)
      .required(),
    });

    //   Validating credentials
    const { error } = await schema.validate(req.body);
    if(error) return res.status(400).send({msg : error.details[0].message});
    
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = await mongo.db.collection("users").findOne({email : req.body.email});
    if(!user) return res.status(400).send({msg : "This user is not registered yet. Please register first or check if the email-id entered is correct."});

    const response = await mongo.db.collection("users").findOneAndUpdate({email : req.body.email}, { $set : {password : req.body.password}});
    res.send(response);

  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {

      const schema = Joi.object({
          name: Joi.string().min(4).max(15).required(),
          email: Joi.string().max(50).required(),
          password: Joi.string()
          .min(8)
          .required(),
        });
        
        //   Validating credentials
        const { error } = await schema.validate(req.body);
        if(error) return res.status(400).send({msg : error.details[0].message});
        
        // Checking if user already exists
          const user = await mongo.db.collection("users").findOne({email : req.body.email});
          if(user) return res.status(400).send({msg : "User already registered. Try login instead."});
        
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        
        const newUser = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            cart : [],
            orders : []
        };
          const response = await mongo.db.collection("users").insertOne(newUser);
          res.send(response);
        
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;
