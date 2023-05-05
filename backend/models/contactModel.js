const mongoose = require("mongoose")
const schema1 = new mongoose.Schema({
    name :{
        type: String,
        require : true,
    },
    email :{
      type : String,
      require : true,
},
    message : {
        type : String ,
        require : true,
    },
})

module.exports=mongoose.model("Contact",schema1);