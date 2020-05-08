
const ex = require('express');
const bp = require('body-parser');
const rq = require('request');
//const es = require('ejs');

const app = ex();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended:true}));
app.use(ex.static("public"));


// app.get('/',function(req,res){
//   res.send("Ayush");
// })

app.get('/',function(req,ress){

//var link = 'https://cloud.iexapis.com/stable/stock/ab/quote?token=pk_caa40eddebbd4e34a5e93bbdba51a902';

rq.get('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_caa40eddebbd4e34a5e93bbdba51a902',{json: true},(err,res,body)=>{
 if(err) {ress.render('failure')}
 else if(res.statusCode == 200){
   //var g = JSON.parse(body);
   //console.log(res.statusCode);
   var CName = body.companyName;
   var syml = body.symbol;
   var lp = body.latestPrice;
   var pc = body.previousClose;
   var cp = body.changePercent;
   var mc = body.marketCap;
   var ytdc = body.ytdChange;
   var wh = body.week52High;
   var wl = body.week52Low;

   ress.render("info",{CName:CName, syml:syml, lp:lp, pc:pc, cp:cp, mc:mc, ytdc:ytdc, wh:wh, wl:wl});
 }
 else{
   ress.render('failure');
 }

});
})

app.post('/',function(req,ress){

//var link = 'https://cloud.iexapis.com/stable/stock/ab/quote?token=pk_caa40eddebbd4e34a5e93bbdba51a902';
var q = req.body.went;
var head = 'https://cloud.iexapis.com/stable/stock/';
var tail = '/quote?token=pk_caa40eddebbd4e34a5e93bbdba51a902';
var all = head+q+tail;

rq.get(all,{json: true},(err,res,body)=>{

 if(err) {ress.render('failure')}
 else if(res.statusCode == 200){
   //var g = JSON.parse(body);
   //console.log(res.statusCode);
   var CName = body.companyName;
   var syml = body.symbol;
   var lp = body.latestPrice;
   var pc = body.previousClose;
   var cp = body.changePercent;
   var mc = body.marketCap;
   var ytdc = body.ytdChange;
   var wh = body.week52High;
   var wl = body.week52Low;

   ress.render("info",{CName:CName, syml:syml, lp:lp, pc:pc, cp:cp, mc:mc, ytdc:ytdc, wh:wh, wl:wl});
 }
 else{
   ress.render('failure');
 }

});
})



app.get('/about',function(req,res){
  res.render('about');
})

app.get('/contact',function(req,res){
  res.render('contact');
})

app.post('/contact',function(req,res){

  var c = req.body.email;
  //console.log(c);

  var data = {
    members: [
      {
        email_address: c,
        status: "subscribed",
      }
    ]
  };

  var d = JSON.stringify(data);

var options = {
  url: "https://us8.api.mailchimp.com/3.0/lists/3a51c681cf",
  method: "POST",
  headers:{
    "Authorization":"narender1 0c07dda80e0c82cd28e4056c293d271d-us8",
  },
  body: d,
};

rq(options,function(error,response,body){
  if(error){
    res.render("failure");
  } else{
    if(response.statusCode === 200){
      res.render("success");
    } else{
      res.render("failure");
    }
  }
});
})

app.listen(process.env.PORT || 100,function(){
  console.log("SERVER running on PORT 100");
})


//0c07dda80e0c82cd28e4056c293d271d-us8

//3a51c681cf
