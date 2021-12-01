var mongoose = require('mongoose')
const users = require('../models/user');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyparser=require('body-parser')

//sign Up
exports.signUp = (req, res) => {
    var validateEmail = validator.isEmail(req.body.Email);
    var validatePassword = validator.isStrongPassword(req.body.Password);
    users.findOne({Email:req.body.Email},(err,user)=>{
        if(user){
            res.status(401).send("this is already exists...")
        }else{
            if (validateEmail && validatePassword) {
                var user = new users({
                    userName:req.body.userName,
                    Email: req.body.Email,
                    Phone:req.body.Phone,
                    Password: bcrypt.hashSync(req.body.Password,10), 
                    firstName: req.body.firstName,
                    lastName:req.body.lastName,
                    whatDo: req.body.whatDo,
                    Description:req.body.Description,
                    Language:req.body.Language,
                    dateOfBirth:req.body.dateOfBirth,
                    linkAcount:req.body.linkAcount,
                    Address:req.body.Address,
                    City:req.body.City,
                    State:req.body.State,
                    zipCode:req.body.zipCode,
                    Country:req.body.Country,
                })
        
            } else {
                res.send(`unvalid Email or password`)
            }
            user.save()
            .then(Data => {
                res.send(Data)
            }).catch(err => {
                res.status.send(err)
            })
            
        }
    })

    
   

}
// login
 exports.login =(req, res) => {  
     console.log(req.body)         
     users.findOne({Email:req.body.Email}, 
        function (err, user) {
        if (err) {
            return res.status(500).send("server error");
            }
            if (!user || !bcrypt.compareSync(req.body.Password, user.Password)) {
            console.log(user)
            return res.status(404).send("user not found please register");

        }
        const userToken = jwt.sign({ id: user._id, userName: user.userName, typeUser: user.typeUser }, "group4");
        jwt.verify(userToken, "group4" , (err, data) => {
            if (data) {
                
                    const c = {userName:data.userName,
                    token:userToken};
                    res.send(c);
                
            }
            if (err) {
                res.send("Your cannot access");
            }
        });
        
    });
}
// //show all users 
exports.ShowallUser = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        console.log(data)
        //  if (data.typeUser === "admin" ) {

            users.find({typeUser:"user"}, { _id:1,   userName: 1,firstName:1,lastName:1 , Country:1, _id:0 }).then(function (user) {
                res.send(user);
            });
        // } else {
        //      console.log("hello")
        //      res.send("You cannot access users");
        // }
    })
}


//show all admin
exports.Showalladmin = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
      
            users.find({typeUser:"admin"}, { _id:1,   userName: 1,firstName:1,lastName:1 , Country:1 ,typeUser:1, _id:0 }).then(function (user) {
               
                res.send(user);
            
            });
        
        
    })
}



// //update user
exports.updateUser = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        if (data.typeUser === "admin") {
            users.findByIdAndUpdate(req.params.id, {
                userName:req.body.userName,
                Email: req.body.Email,
                Phone:req.body.Phone,
                Password: bcrypt.hashSync(req.body.Password,10), 
                typeUser:req.body.typeUser,
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                whatDo: req.body.whatDo,
                Description:req.body.Description,
                Language:req.body.Language,
                dateOfBirth:req.body.dateOfBirth,
                linkAcount:req.body.linkAcount,
                Address:req.body.Address,
                City:req.body.City,
                State:req.body.State,
                zipCode:req.body.zipCode,
                Country:req.body.Country,
            }, { new: true })
                .then(user => {
                    res.send(user)
                });          
        } else if (data.typeUser === "user" ){
            users.findByIdAndUpdate(data.id, {
                userName:req.body.userName,
                Email: req.body.Email,
                Phone:req.body.Phone,
                Password: bcrypt.hashSync(req.body.Password,10), 
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                whatDo: req.body.whatDo,
                Description:req.body.Description,
                Language:req.body.Language,
                dateOfBirth:req.body.dateOfBirth,
                linkAcount:req.body.linkAcount,
                Address:req.body.Address,
                City:req.body.City,
                State:req.body.State,
                zipCode:req.body.zipCode,
                Country:req.body.Country,
            }, { new: true })
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");

        }
})

}

//delete user
exports.deleteUser = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        console.log(data.userType);
        if (data.typeUser === "admin") {
            users.findByIdAndDelete(req.params.id)
                .then(user => {
                    res.send(user)
                })           
        } else if (data.typeUser === "user" ){
            users.findByIdAndDelete(data.id)
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");
        }
})

}






