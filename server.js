require("dotenv").config()
const express = require("express")
const User = require("./models/Users")
const mongoose  = require("mongoose")
 

let app = express()
 //middleware
app.use(express.json())

//db connection string
let MONGO_URL = process.env.MONGO_URL
//setting up port for the app
let PORT = process.env.PORT

mongoose.connect(MONGO_URL)
    .then( data=>{
        console.log("Connection established...")
        //only listen to request, only when there is db connection
        app.listen(PORT, ()=>{
            console.log("App listening on request")
        })
    })
    .catch(err =>{
        console.log(err)
    })


//home rout to get all users from the db
app.get("/", ( req, res)=>{
    User.find()
        .then( data =>{
            res.send(data)
        })
        .catch( err =>{
            console.log( err)
        })
})

//create a user Rout
app.post("/createuser", (req, res)=>{
    const user = new User(req.body)
    user.save()
        .then( data =>{
            res.send(data)
        })
        .catch( err =>{
            res.send(err)
        })
   
})

//Update a user
app.put("/update/:id", (req, res)=>{
        let newFirstName = req.body.first_name
        let newAge = req.body.age
        const id = req.params.id
     User.findOneAndUpdate(
        {_id: id }, 
        {first_name : newFirstName, age: newAge},
        { new: true, runvalidator: true}
    )
    .then( update =>{
        res.send(update)
    })
    .catch(err =>{
        res.send(err)
    })
  })

//delete a user
app.delete("/delete/:id", (req, res)=>{
    let id = req.params.id
     User.findByIdAndDelete({_id: id})
        .then( delItem =>{
            res.send(`The user with the  ID: ${delItem._id} has been deleted`)
        })
        .catch( err =>{
            res.send(err)
        })
})


