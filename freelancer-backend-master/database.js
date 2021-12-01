const mongoose = require('mongoose');
//const url = 'mongodb://localhost:27017/free'
 const conndb=("mongodb+srv://freelance:12345@freelance.mhgq8.mongodb.net/freelace?retryWrites=true&w=majority")

mongoose.connect(conndb)    
.then(() => {
        console.log("success connect to database")
}).catch((err) => {
    console.log(err)
})