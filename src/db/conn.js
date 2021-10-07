const mongoose=require('mongoose')

//creating a database
mongoose.connect('mongodb://localhost:27017/trialDynamic',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then(()=>{
console.log('Connection Success');
}).catch((error)=>{
console.log(error);
})