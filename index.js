const express = require('express');
const cors = require("cors");

const mongo = require("./mongo.js");

// Importing routes
const razorpayRoute = require("./routes/razorRoute.js");
const cartRoutes = require("./routes/cartRoutes.js"); 
const pizzaRoutes = require("./routes/pizzaRoutes.js");
const priceRoutes = require("./routes/priceRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const inventoryRoutes = require("./routes/inventoryRoutes.js");
const registerRoute = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const sendMail = require("./routes/triggerMail.js");

const app = express();

// Using cors
app.use(cors());

// Parsing request body as JSON format
app.use(express.json());

(async () => {
    try {
        // Mongodb Connection
        await mongo.connect();
        // Routes
        app.use("/register", registerRoute);
        app.use("/login", loginRoute);
        app.use("/razorpay", razorpayRoute);
        app.use("/cart", cartRoutes);
        app.use("/price", priceRoutes);
        app.use("/pizzas", pizzaRoutes);
        app.use("/orders", orderRoutes);
        app.use("/inventory", inventoryRoutes);
        app.use("/sendMail", sendMail);
    } catch (error) {
        console.log(error);
    }
})();
app.listen(process.env.PORT || 3001, () => console.log("Listening on PORT 3001"));
