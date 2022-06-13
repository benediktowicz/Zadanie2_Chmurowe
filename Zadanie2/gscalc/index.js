const express = require("express");
const redis = require("redis");
const app = express();
const port = 3001;

const redisClient = redis.createClient({
    socket: {
        port: 6379,
        host: "redis"
    }
});

function geometry(n) {
    let b1 = 1;
    let q = n;
    if(n <= 10){
        return b1 * Math.pow(q, n-1) ;
    }
    else{
        alert("Wartość k powinna być mniej lub równa 10");
    }
}

app.get("/api/gscalc", async (req, res) => {

    if (req.query.count == null) {
        res.sendStatus(400);
        return;
    }
    
    const count = req.query.count;
    await redisClient.connect();
    let value = await redisClient.get(count + "");
    if (value == null) {
        value = geometry(count);
        redisClient.set(count + "", value + "");
    }

    redisClient.quit();
    res.status(200).send({ result: value });
});

app.listen(port, () => {
    console.log(`GS calc nasłuchuje na porcie ${port}`);
});