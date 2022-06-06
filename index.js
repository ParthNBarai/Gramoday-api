const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv/config");
const dbfunc = require("./dbfunctions");
const mandiSchema = require("./schemas/mandireport");

const port = process.env.PORT || 1234;

const con = mongoose.connect(process.env.MONGO_URL);


mongoose.connection.once("open" , ()  => {
console.log("Connected...");
}).on("error", function(error){
console.log("error is:" , error);
});

app.use(express.json());

app.post("/reports",async (request,response) => {
    // console.log(request.body);
     

      // const result = await mandiSchema.find({"reportDetail.cmdtyID" : request.body.reportDetail.cmdtyID});
                     
      // response.status(200).json(result);
    dbfunc.Reports(request,response);

  });



app.get("/reports/:reportId", async (request,response)=>{
    dbfunc.fetchReport(request,response);
});

app.get("/reports", async (request,response)=>{
  dbfunc.fetch(request,response);
});

app.listen(port, () => console.log(`Server up and running...at ${port}`))