const { json } = require("body-parser");
const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
var schedule = require('node-schedule');
app.use(bodyparser.json());

function doAvailable(id ,end){
  let rule = new Date(end);
  console.log("scheduled job"+rule+""+new Date());
  var j = schedule.scheduleJob(rule,function(){
    mysqlConnection.query("UPDATE task_schema.vehicle SET isbooked = 0 WHERE v_id = ?",id)
console.log("called from scheduler"+rule+new Date());
  });
}
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "task_schema",
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*' ); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

mysqlConnection.connect((err) => {
  if (!err) console.log("connection established!");
  else console.log("connection failed" + JSON.stringify(err, undefined, 2));
});

app.listen(3001, () => console.log("server is running on port :3001"));

app.get("/todo", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM task_schema.todo",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});


app.get("/todo/asc", (req, res) => {
  
 
  mysqlConnection.query(
    "SELECT * FROM task_schema.todo order by t_date asc",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/todo/desc", (req, res) => {
  
 
  mysqlConnection.query(
    "SELECT * FROM task_schema.todo order by t_date desc",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/todo/:id", (req, res) => {
    mysqlConnection.query(
      "SELECT * FROM task_schema.todo WHERE id= ? ",[req.params.id],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });

  app.delete("/todo/:id", (req, res) => {
    mysqlConnection.query(
      "DELETE FROM task_schema.todo WHERE id = ?;",[req.params.id],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });


  //Insert an employees
  app.post('/todo', (req, res) => {
    let todo = [req.body.id , req.body.title , req.body.t_date] ;
    mysqlConnection.query("INSERT INTO task_schema.todo(id,title,t_date) \
    VALUES (?,?,?)", todo,(err, rows, fields)=>{
      if (!err)
     res.send("ok");
      else
      console.log(err);
      })
      });
      

      app.post('/vehicle', (req, res) => {
        let vehicle = [req.body.v_id , req.body.vehicalName,req.body.v_type,req.body.isbooked] ;
        mysqlConnection.query("INSERT INTO task_schema.vehicle \
        (v_id, vehicalName, v_type, isbooked) VALUES (?, ?, ?, ?);",vehicle,(err, rows, fields)=>{
          if (!err){
            res.send("ok");}
          else{
          console.log(err);
          }
          })
          });

    app.get("/vehicle/avail", (req, res) => {
       mysqlConnection.query(
       "select * from task_schema.vehicle where isbooked = 0",
        (err, rows, fields) => {
        if (!err) {
        res.send(rows);
        } else {
        console.log(err);
        }
        }
      );
      });

      app.get("/booking", (req, res) => {
        mysqlConnection.query(
        "SELECT * FROM task_schema.booking",
         (err, rows, fields) => {
         if (!err) {
         res.send(rows);
         } else {
         console.log(err);
         }
         }
       );
       });
  app.post('/booking', (req, res) => {
        let booking = [req.body.b_id,req.body.v_id , req.body.pickup,req.body.drop_time] ;
        let id =[req.body.v_id];
        mysqlConnection.query("UPDATE task_schema.vehicle SET isbooked = 1 WHERE v_id = ?",id,(err,rows,fields)=>{
          if (!err)
          {
            mysqlConnection.query("INSERT INTO task_schema.booking(b_id,v_id,pickup,drop_time) VALUES (?,?,?,?);"
            ,booking,(err, rows, fields)=>{
               if (!err){
                 doAvailable(req.body.v_id,req.body.drop_time);
              res.status(201).send(req.body.v_id+" is booked");
               }else
               console.log(err);
               })
          }
          else
          console.log(err);
        })
          });
