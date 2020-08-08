const express = require("express");
const cors = require("cors");
const { exec } = require('child_process')


const router = express.Router();

const app = express()

router.use(cors())
router.use((req,res,next) => {
  Object.setPrototypeOf(req,app.request);
  Object.setPrototypeOf(res,app.response);
  req.res = res;
  res.req = req;
  next();
})

router.get("/dl",(req,res) => {
  const file = `${__dirname}/../dist.zip`;
  res.download(file);
})

router.get("/generate",(req,res) => {

  return new Promise(reso => {
    
    new Promise(reso1 => {
      exec('yarn generate', (err, stdout, stderr) => {

        if (err) {
          console.log(`stderr: ${stderr}`)
          return
        }
          console.log(`stdout: ${stdout}`)
          reso1();
        }
      )
    })
    .then(() => {
      exec('zip dist -r dist', (err, stdout, stderr) => {
        console.log("zipped !");
        if (err) {
          console.log(`stderr: ${stderr}`)
          return
        }
          console.log(`stdout: ${stdout}`)
          reso(res.status(200).json({ message: "Success"}));
        }
      )
    })


  })

});

module.exports = {
  path: "/api",
  handler: router
}