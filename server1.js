var express = require("express");
var app = express();



/*var db = require("./db");*/
var db = require("./example2");

var cron = require('node-cron');
cron.schedule('1 * * * * *', function(){
    console.log('작업 실행1');
});

var cors = require('cors');

app.use(cors());

var router = express.Router();
router.get('/', cors(), (req, res) => { res.send('cors!') });

app.use(express.json());

app.use("/", function (req, res, next) {
    res.redirect('https://jr-dd568.firebaseapp.com');

});

app.get("/:key",(req,res,next)=>{

    console.log(req.params.key);

    db.read(req.params.key, (obj)=>{
        res.send(obj);
    })
});

/*app.get("/members",(req,res,next)=>{

    //console.log(req.params.key);

    db.read((obj)=>{
        //read((obj)=>console.log(obj))
        res.send(obj);
    })
});*/

app.post("/members",(req,res,next)=>{

    console.log("req.body 이것이 뭔가",req.body);

    var obj = req.body;
    db.save(obj,(key)=>{
        res.send({key:key});
    });

    cron.schedule('1 * * * * *', function(){
        console.log('작업 실행2');
        db.sendMsg(req.body.token, req.body.keyword);
    });
});

app.use(express.json());

app.listen(3000, ()=>{console.log("Hello Run SERVER")});
