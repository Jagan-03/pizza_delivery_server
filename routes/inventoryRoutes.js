const express = require('express');
const router = express.Router();

const mongo = require("../mongo");

router.get("/", async (req, res) => {
    try {
        const data = await mongo.db.collection("inventory").find().toArray();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const items = req.body;
        const data = await mongo.db.collection("inventory").insertMany(items);
        res.send("Inserted");
    } catch (error) {
        console.log(error);
    }
})

router.patch("/", async (req, res) => {
    try {
        const count = req.body;
        Object.keys(count).forEach(async key => {
            try {
                await mongo.db.collection("inventory").findOneAndUpdate({name : key}, {$inc : {quantity : -(count[key])}});
            } catch (error) {
                console.log(error);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

