const mongoose = require('mongoose') ;

// function
 const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect("mongodb+srv://root:root@pottery-studio.edqxxug.mongodb.net/studioDb?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected`);
    }catch (err){
        console.log(err);
    }
}
module.exports= connectDB;