const { request } = require("express");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const { aggregate } = require("./schemas/mandireport");
const mandiSchema = require("./schemas/mandireport");

async function Reports(request,response){
    // console.log(request);

    var found;
    const result = mandiSchema.find({ $and: [{"reportDetail.cmdtyID": request.body.reportDetail.cmdtyID },
                 { "reportDetail.marketID":request.body.reportDetail.marketID }] });

        //  response.status(200).json(result);
        // console.log(Date.now())
        mandiSchema.find({ $and: [{"reportDetail.cmdtyID": request.body.reportDetail.cmdtyID },
                 { "reportDetail.marketID":request.body.reportDetail.marketID }] })
        .exec()
        .then(async report1 => {
            
            if(report1.length >0){
                console.log(report1[0].reportDetail.users);
                
            var agprice = await aggregatefunc(request,report1);
            // Number(agprice);
            // console.log(agprice);
            // console.log(Number(agprice));
            const reports1 = ({
                
                reportDetail: {
                    "userID": request.body.reportDetail.userID,
                    "marketID": request.body.reportDetail.marketID,
                    "marketName": request.body.reportDetail.marketName,
                    "cmdtyID": request.body.reportDetail.cmdtyID,
                    "marketType": request.body.reportDetail.marketType,
                    "cmdtyName": request.body.reportDetail.cmdtyName,
                    // "convFctr" :request.body.reportDetail.convFctr,
                    "priceUnit": "Kg",
                    "timestamp": Date.now(),
                    "price": Number(agprice),
                    
                    $push:{
                        users:  request.body.reportDetail.userID
                    }
            }
            });
            report1[0].reportDetail.users.push(request.body.reportDetail.userID);
            
            
            // found = true;
            // console.log(found)
            try{ 
                const saved= await mandiSchema.updateOne(result, reports1);
                response.status(200).json({status : "Success",
                                          report_id  :report1[0]._id});
            }
           catch(err){
               response.status(404).json(err);
           }
        }
       


    else {
        // console.log("Entered")
    //    console.log(request.body.reportDetail.userID)
    // console.log(request.body.reportDetail.userID)
        const reports = new mandiSchema({
                
            reportDetail: {
                "userID": request.body.reportDetail.userID,
                "marketID": request.body.reportDetail.marketID,
                "marketName": request.body.reportDetail.marketName,
                "cmdtyID": request.body.reportDetail.cmdtyID,
                "marketType": request.body.reportDetail.marketType,
                "cmdtyName": request.body.reportDetail.cmdtyName,
                // "convFctr" :request.body.reportDetail.convFctr,
                "priceUnit": "Kg",
                "timestamp": Math.floor(Date.now() / 1000),
                "price": (request.body.reportDetail.price/request.body.reportDetail.convFctr),
                
               
                // $push:{
                    
                //     "reportDetail.users":  request.body.reportDetail.userID
                //     }
        }
    });

    reports.reportDetail.users.push(request.body.reportDetail.userID);
        try{
            const saving = await reports.save();
            response.status(200).json({status : "Success",
                                       report_id  :saving._id});
        }
        catch(err){
            response.status(400).json(err);
        }
       
    }
})
}

async function aggregatefunc(request,report1){
    // console.log(report1[0].reportDetail.price);
    var aggregateprice = (((report1[0].reportDetail.price)+
                         (request.body.reportDetail.price / request.body.reportDetail.convFctr))/2);
    console.log(Number(aggregateprice))
    return Number(aggregateprice);
}

async function fetchReport(request,response){
    const report = mandiSchema.findOne({_id : request.params._id});
    response.status(200).json(report);
}

async function fetch(request,response){
    const report = mandiSchema.find();
    response.status(200).json(report);
}   

module.exports = {Reports,fetchReport,fetch}