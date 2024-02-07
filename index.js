const express=require("express")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/catogries");
const connection= require("./config/db")
const app=express()
const cors=require("cors")
app.use("/images", express.static("images"));


const mongoose = require("mongoose");
const multer = require("multer");
app.use(express.json())



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  app.use(cors())
  app.use("/api/auth", authRoute)
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/categories", categoryRoute);
app.listen(8000, async()=>{
    try {
        await connection
        console.log("server running at port 8000")
    } catch (error) {
        console.log(error)
    }
})