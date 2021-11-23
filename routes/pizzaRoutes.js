const express = require('express');
const router = express.Router();

const mongo = require("../mongo");

router.get("/", async (req, res) => {
    try {
        const data = await mongo.db.collection("pizzas").find().toArray();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
