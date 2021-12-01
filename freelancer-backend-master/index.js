const express = require('express');
const app = express();//create our server
const port = 8000;
require("./database")
const userRouter=require("./routes/user");
const projectRouter=require("./routes/project");
const postRouter=require("./routes/post");
app.use(express.json()); //read only json files
var cors = require('cors')

app.use(cors())
app.use("/users", userRouter)
app.use("/post", postRouter)
app.use("/project", projectRouter)


app.listen(port, () => {
    console.log("listining to port" +port)
})