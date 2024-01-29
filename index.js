// GET - User can check how many kidneys they have and their health
// POST - User can add a new kidney
// PUT - User can replace a kidney, make it healthy
// DELETE - User can remove a kidney


const express = require("express");
const app = express();

const users = [{
    name: "Kabir",
    kidneys: [{
        healthy: true
    }]
}];

app.use(express.json());

app.get("/", function (req, res) {
    const kabirkidneys = users[0].kidneys;
    const noofkidney = kabirkidneys.length;''
    let noofhealthykidney = 0;
    for (let i = 0; i < kabirkidneys.length; i++) {
        if (kabirkidneys[i].healthy) {
            noofhealthykidney = noofhealthykidney + 1;
        }
    }
    const noofunhealthykidney = noofkidney - noofhealthykidney;
    res.json({
        noofkidney,
        noofhealthykidney,
        noofunhealthykidney
    })
})

app.post("/", function (req, res) {
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/", function (req, res) {
    if (isoneunheltykidney()) {
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({});
    }
    else{
        res.status(411).json({
            msg: "You have already healthy kidney."
        });
    }
})

app.delete("/", function (req, res) {
    if (isoneunheltykidney()) {
        const newkidney = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newkidney.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newkidney;
        res.json({
            msg: "Finally Done"
        });
    }
    else{
        res.status(411).json({
            msg: "You have no bad kidney."
        });
    }
})

// What should happen if they try to delete when there are no kidneys?
// What should happen if they try to make a kidney healthy when all are already healthy

function isoneunheltykidney() {
    let oneunhelthykidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            oneunhelthykidney = true;
        }
    }
    return oneunhelthykidney;
}
app.listen(4000);