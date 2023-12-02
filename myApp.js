let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(
    function(req, res, next) {
        console.log(`${req.method} ${req.path} - ${req.ip}`)
        next();
      }
)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

app.get("/json", (req, res) => {
    if ( process.env.MESSAGE_STYLE === 'uppercase'){
        res.json(
            {"message": "HELLO JSON"}
        )
    }else{
            res.json(
                {"message": "Hello json"}
            )
        }
});

app.get("/now", function(req,res,next){
    req.time = new Date()
    next()
}, function (req,res) {
    res.json({
        time: req.time
    })
});

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
});

app.get("/name", (req, res) => {
    const { first } = req.query;
    const { last } = req.query;
    last
    res.json({
      name: `${first} ${last}`
    });
});





























 module.exports = app;
