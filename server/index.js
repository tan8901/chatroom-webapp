const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const fs = require("fs");
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users = []


socketIO.on('connection', (socket) => {
    console.log(`--> user ${socket.id} just connected!`)
    const d = new Date();    
    //setting up the date to enter record into the log file which only executes when server is started
    const today=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
    const datefile=fs.readFileSync('today.txt').toString();
    if (today!=datefile)
    {
      fs.writeFile('today.txt',today, (err)=>{
        if (err) throw err;
      });
      fs.appendFile('log.txt',"\n"+today+"\n"+"------------------"+"\n", (err)=> {
        if (err) throw err;
      });
    }
    
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
      //we use "data" to write messages to the log file
      const d1 = new Date();
      const time = d1.getHours()+":"+d1.getMinutes();
      let msg = data.name+" ("+time+"): "+data.text+"\n"
      
      //----> console.log(msg);
      fs.appendFile('log.txt',msg, (err) => {
        if (err) throw err;
      })
    })

    //new user joined event creation
    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })

    //user disconnected event
    socket.on('disconnect', () => {
      console.log(`x-x-x user ${socket.id} disconnected`);
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});