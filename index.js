const express = require('express');
const app = express();

require('dotenv').config();
const dbConnect = require('./db');
const urlRouter = require('./routes/url')


const PORT = process.env.PORT || 5000;


//middleware middleware
app.use(express.json());

app.use("/api", urlRouter);
app.get("*", (req, res) => {
    res.send("<h1>Invalid API endpoint!</h1>");
})

app.listen(PORT, async () => {
    await dbConnect(process.env.URI);
    console.log(`MongoDb and SERVER is running at ${PORT}`);
})