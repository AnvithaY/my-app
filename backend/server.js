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


app.post('/login', async (req, res) => {
   

    var user = req.body.email;
    var pass = req.body.password;
 
 var q="select * from UserTable where email='"+user+"' and Password='"+pass+"' and userType='N'"
 console.log(q)
  
       con.query(q, function (err, result, fields) {
     if (err) console.log(err)
         if(result.length == 1)
         {
             var abc={
                 error:'',
                 response:'success'
             }
         }
         else
         {
             var abc={
                 error:'No Such User Exists. Please Register first',
                 response:'fail'
             }
 
         }
         res.json(JSON.stringify(abc));
 
   });
     
 });

app.post('/',(req,res)=>{
	var {name,rollno} =req.body;
	var records = [[req.body.name,req.body.rollno]];
	if(records[0][0]!=null)
	{
		con.query("INSERT into student (name,rollno) VALUES ?",[records],function(err,res,fields){

			if(err) throw err;

			console.log(res);
		});
	}
	res.json('Form recieved');


})

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

// Abhishek:this.state.Abhishek,
// Anvitha:this.state.Anvitha,
// Asritha:this.state.Asritha,
// Nithesh:this.state.Nithesh,
// Vamsi:this.state.Vamsi,
// Aditi:this.state.Aditi,
// Thushara:this.state.Thushara,
// Nayana:this.state.Nayana,
// Sayannah:this.state.Sayannah,
// Gayathri:this.state.Gayathri

app.post('/attendance',(req,res)=>{
    console.log("HERE")
    // console.log(req.body.fullName)
	var records = [[req.body.Abhishek,req.body.Anvitha,req.body.Asritha]];
    
    if(records[0][0]!=null)
	{
		con.query("INSERT into attendance (Abhishek,Anvitha,Asritha) VALUES ?",[records],function(err,resp,fields){

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
