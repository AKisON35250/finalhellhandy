const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.static("public")); // Serviert Handy-Frontend

// SQLite DB
const db = new sqlite3.Database("./database/database.db");
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

// REGISTER
app.post("/register", async (req,res)=>{
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password,10);
  db.run("INSERT INTO users(username,password) VALUES(?,?)",[username,hash], function(err){
    if(err) return res.json({success:false,message:"Name existiert bereits"});
    res.json({success:true,userId:this.lastID});
  });
});

// LOGIN
app.post("/login", async (req,res)=>{
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username=?",[username], async (err,row)=>{
    if(!row) return res.json({success:false,message:"User nicht gefunden"});
    const match = await bcrypt.compare(password,row.password);
    if(match) res.json({success:true,userId:row.id});
    else res.json({success:false,message:"Falsches Passwort"});
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server läuft auf Port ${PORT}`));
