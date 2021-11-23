const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const mongo = require("../mongo");

router.get("/", async (req, res) => {
    try {
        const data = await mongo.db.collection("users").find().toArray();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const item = req.body;
        const data = await mongo.db.collection("users").findOneAndUpdate({_id : ObjectID(item.user_id)}, { $push : {cart : item}});
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

router.patch("/", async (req, res) => {
    try {
        const {id, items} = req.body;
        const data = await mongo.db.collection("users").updateOne({ _id : ObjectID(id)}, {$set: { cart : items}});
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/", async (req, res) => {
    try {
        const { id, items} = req.body;
            const data = await mongo.db.collection("users").updateOne({_id : ObjectID(id)}, { $set : { cart : [] } });
            res.send(data);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
