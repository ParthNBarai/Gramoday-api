const mongoose = require("mongoose");

const mandiSchema = mongoose.Schema({
    reportDetail:{
        userID:{
            type : String,
            required : true
        },
        marketID:{
            type : String,
            required : true,
            // unique:true
        },
        marketName:{
            type : String,
            required : true
        },
        cmdtyID:{
            type : String,
            required : true,
            // unique:true
        },
        marketType:{
            type : String,
            required : true
        },
        cmdtyName:{
            type : String,
            required : true
        },
        priceUnit:{
            type : String,
            required : true
        },
        convFctr:{
            type : Number,
            // required : true
        },
        users:[{
                type: String
        }],
        price:{
            type : Number,
            required : true
        },
        timestamp:{
            
        }
    }
});

module.exports = mongoose.model('reports' , mandiSchema);