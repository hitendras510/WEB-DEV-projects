const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const app = express();
app.use(express.json());

const users = [];

// const generateToken = () => {
//     return Math.random().toString(36).substring(2);
// }
//add JWT = json web token

function logger(req,res,next){
    console.log(req.method+"request came")
    next();
}

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/FE/index.html")
})


app.post("/signup",logger,function(req,res){
    const {username,password} = req.body;
    users.push({
      username:username,
      password:password
    });

    res.json({message:"User Signed up"})
    console.log(users);
})

app.post("/signin",logger,function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    let founderUser = null;

    for(let i= 0; i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
            founderUser = users[i];
            break;
        }
    }
    
    if(founderUser){
        const token = jwt.sign({username:users[i].username},JWT_SECRET,{expiresIn:"1h"});
        // founderUser.token = token;
        res.json({message:"User Signed in",token})
    }else{
        res.status(401).json({message:"Invalid credentials"})
    }
    console.log(users)
    
})

function auth(req,res,next){
const token = req.headers.token; //Extracting token from header
const decodedData = jwt.verify(token,JWT_SECRET); // check token correct or not
if(decodedData.username){
    req.username = decodedData.username;
    next();
}else{
    res.status(401).json({message:"Invalid credentials"})
}
}

app.get("/me",logger,auth, function(req,res){
    const currentUser = req.username;
    let foundUser = null;

    for(let i = 0;i<users.length;i++){
        if(users[i].username == currentUser){
            foundUser = users[i];
        }
    }
    res.json({
        username:foundUser.username,
        password:foundUser.password
    })
})

app.get("/todo",logger,auth, function(req,res){
    
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
