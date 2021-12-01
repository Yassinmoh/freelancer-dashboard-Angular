const Post = require('../models/Post');
const jwt = require('jsonwebtoken')



//create new book
exports.createPost = (req, res) => {
const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
    if (data) {
        const Posts = new Post({
            // post_name: { type: String ,required:true,minLength:10},
            // description:{type:String,required:true,minLength:30},
            // state:{type:String},
            // Url:{type:String},
            // comment:{type:String}


            post_name: req.body.post_name,
            description: req.body.description,
            state: req.body.state,
            Url: req.body.Url,
            comment: req.body.comment
        } )
        Posts.save()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    } else {
        res.send("You cannot access Post");
    }

})

  

}
//show one Post
exports.listOnePost = (req, res, next)=> {
    Post.findOne({ post_name: req.body.post_name },function (err, postone) {
        if (err) res.status(400).send(err);
        res.status(200).send(postone);
    });
}
//show all Project

exports.listAllPost = (req, res) => {
    Post.find()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    
}
//update book
exports.updatePost = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        if (data.typeUser === "user" ) {
            /// We Are Send Id Post No User
            Post.findOneAndUpdate({ _id: req.params.id ,userid: data.id}, {
                post_name: req.body.post_name,
                description: req.body.description,
                state: req.body.state,
                Url: req.body.Url,
                comment: req.body.comment
            }, { new: true },(err,pro)=>{
                if(err) res.status(403).send(err);
                res.send(pro);                
            })
        } else if (data.typeUser === "admin") {
            // We Are Send Id Project No User
            Post.findByIdAndUpdate(req.params.id, {
                post_name: req.body.post_name,
                description: req.body.description,
                state: req.body.state,
                Url: req.body.Url,
                comment: req.body.comment
            }, { new: true },(err,pro)=>{
                if(err) res.status(403).send(err);
                res.send(pro);                
            })
        }
        else {
            res.send("You cannot access Post");
        }

    })
}
//delete book
exports.deletePost = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "group4", (err, data) => {
        if (data.typeUser === "user" ) {
            console.log(data.typeUser)
            Post.findOneAndDelete({ _id: req.params.id ,userid: data.id},(err,postone)=>{
                if(err) res.status(403).send(err);
                res.send(postone);                
            })
        } else if (data.typeUser === "admin") {
            Post.findByIdAndDelete(req.params.id,(err,postone)=>{
                if(err) res.status(403).send(err);
                res.send(postone);                
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
    Post.find({}).skip(skip).limit(limit)
    .then(data => {
        res.send(data)
    }).catch (err => {
        console.log(err)
    })
};
