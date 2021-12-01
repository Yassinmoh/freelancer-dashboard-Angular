const Project = require('../models/project');
const jwt = require('jsonwebtoken')



//create new book
exports.createproject = (req, res) => {
const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
    if (data) {
        const Projects = new Project({
            project_name: req.body.project_name,
            budget: req.body.budget,
            description: req.body.description,
            state: req.body.state
        } )
        Projects.save()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    } else {
        res.send("You cannot access project");
    }

})

  

}
//show one Project
exports.listOneproject = (req, res, next)=> {
    Project.findOne({ project_name: req.body.project_name },function (err, pro) {
        if (err) res.status(400).send(err);
        res.status(200).send(pro);
    });
}
//show all Project

exports.listAllProject = (req, res) => {
    Project.find()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    
}
//update book
exports.updateProject = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        if (data.typeUser === "user" ) {
            Project.findOneAndUpdate({ _id: req.params.id ,userid: data.id}, {
                project_name: req.body.project_name,
                budget: req.body.budget,
                description: req.body.description,
            }, { new: true },(err,pro)=>{
                if(err) res.status(403).send(err);
                res.send(pro);                
            })
        } else if (data.typeUser === "admin") {
            // We Are Send Id Project No User
            Project.findByIdAndUpdate(req.params.id, {
                project_name: req.body.project_name,
                budget: req.body.budget,
                description: req.body.description,
                state: req.body.state
            }, { new: true },(err,pro)=>{
                if(err) res.status(403).send(err);
                res.send(pro);                
            })
        }
        else {
            res.send("You cannot access Project");
        }

    })
}
//delete book
exports.deleteProject = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        // We Are Send Id Post No User Id
        if (data.userType === "user" ) {
            console.log(data.typeUser)
            Project.findOneAndDelete({ _id: req.params.id ,userid: data.id},(err,pro)=>{
                if(err) res.status(403).send(err);
                res.send(pro);                
            })
        } else if (data.userType === "admin") {
            Project.findByIdAndDelete(req.params.id,(err,pro)=>{
                if(err) res.status(403).send(err);
                res.send(pro);                
            })
        }
        else {
            res.send("You cannot access Project");
        }

    })
}


exports.paginate= (req, res)=>{
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    Project.find({}).skip(skip).limit(limit)
    .then(data => {
        res.send(data)
    }).catch (err => {
        console.log(err)
    })
};
