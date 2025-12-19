const express = require("express");
const app = express();
app.use(express.json());

const users = [];

const generateToken = () => {
    return Math.random().toString(36).substring(2);
}

app.post("/signup",function(req,res){
    const {username,password} = req.body;
    users.push({
      username:username,
      password:password
    });

    res.json({message:"User Signed up"})
    console.log(users);
})

app.post("/signin",function(req,res){
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
        const token = generateToken();
        founderUser.token = token;
        res.json({message:"User Signed in",token})
    }else{
        res.status(401).json({message:"Invalid credentials"})
    }
    console.log(users)
    
})

app.get("/me", function(req,res){
    const token = req.headers.token;
    let foundUser = null;

    for(let i = 0;i<users.length;i++){
        if(users[i].token == token){
            foundUser = users[i];
        }
    }

    if(foundUser){
        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    }else{
        res.json({message:"Invalid token"})
    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
