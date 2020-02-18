const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;

var mysql = require('mysql');

const app = express();

app.use(cors())
app.use(bodyParser.json());
 
// create a connection variable with the required details
var con = mysql.createConnection({
  host: "dbid.cmjzbnwmwvtz.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", // user name to your mysql database
  password: "password", // corresponding password
  database: "guestlecture" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
 console.log('connection successful');
});



app.get('/',(req,res)=>{
  res.json('OK');
})

app.post('/del',(req,res)=>{
  
    console.log(req.body.fullName)
    con.query("DELETE FROM guestlecture where fullName=?",[req.body.fullName],function(err,resp,fields){

        var abc={
            error:err,
            result:resp
        }

        if(err) console.log(err);

        console.log(resp);
        res.json(JSON.stringify(abc));
    });

})
//fullName,email,location,date,hrs,choicedept
// app.post('/modify',(req,res)=>{
  
//     // console.log(req.body.fullName)
//     con.query("UPDATE guestlecture SET fullName=?,email=?,location=?,date=?,hrs=?,choicedept=? WHERE eventfullName=?",[req.body.eventfullName],function(err,resp,fields){

//         var abc={
//             error:err,
//             result:resp
//         }

//         if(err) console.log(err);

//         console.log(resp);
//         res.json(JSON.stringify(abc));
//     });

// })


app.post('/modify',(req,res)=>{
    // console.log("HERE")
    // var {fullName,eventfullName,email,location,date,hrs,choicedept} =req.body;
    // console.log(fullName)
    console.log(req.body.fullName)
	var records = [[req.body.fullName,req.body.eventfullName,req.body.email,req.body.location,req.body.date,req.body.hrs,req.body.choicedept]];
    // UPDATE guestlecture SET fullName=?,email=?,location=?,date=?,hrs=?,choicedept=? WHERE eventfullName=?"
    var sql =`UPDATE guestlectures SET fullName=${req.body.fullName} ,email=${req.body},location=${req.body.location},date=${req.body.date},hrs=${req.body.hrs},choicedept=${req.body.choicedept} WHERE eventfullName=${req.body.eventfullName}`;
   console.log(sql)
    if(records[0][0]!=null)
	{
		con.query(sql,[records],function(err,resp,fields){

            var abc={
                error:err,
                result:resp
            }

			if(err) console.log(err);

            console.log(resp);
            res.json(JSON.stringify(abc));
		});
    }
    // console.log("Finished insert")
    else
    {
        var abc={
            error:"No record"
        }
        res.json(JSON.stringify(abc));
    }
    
    	
})


app.post('/addtoDB',(req,res)=>{
    console.log("HERE")
    // var {fullName,eventfullName,email,location,date,hrs,choicedept} =req.body;
    // console.log(fullName)
    console.log(req.body.fullName)
	var records = [[req.body.fullName,req.body.eventfullName,req.body.email,req.body.location,req.body.date,req.body.hrs,req.body.choicedept]];
    
    if(records[0][0]!=null)
	{
		con.query("INSERT into guestlecture (fullName,eventFullName,email,location,dateon,hrs,choicedept) VALUES ?",[records],function(err,resp,fields){

            var abc={
                error:err,
                result:resp
            }

			if(err) console.log(err);

            console.log(resp);
            res.json(JSON.stringify(abc));
		});
    }
    // console.log("Finished insert")
    else
    {
        var abc={
            error:"No record"
        }
        res.json(JSON.stringify(abc));
    }
    
    	
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});