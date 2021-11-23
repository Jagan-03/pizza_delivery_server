const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const mongo = require("../mongo");

router.get("/", async (req, res) => {
    try {
        const data = await mongo.db.collection("users").find().toArray();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const item = req.body;
        const { data } = await mongo.db.collection("users").findOneAndUpdate({_id : ObjectID(item.user_id)}, { $push : {orders : item}});
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

router.patch("/", async (req, res) => {
    try {
        const {order, status} = req.body;
        const data = await mongo.db.collection("users").findOneAndUpdate({_id : ObjectID(order.user_id), "orders.name" : order.name}, { $set : {"orders.$.status" : status} });
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;
