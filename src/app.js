const express=require('express')
const path = require('path')
const cors = require('cors')
const renderHomePage=require('./renderHomePage')
const renderProfilePage=require('./renderProfilePage')
const renderNFTPage=require('./renderNFTPage')

const profileNFTs = require('./profileNFTs')

const getUserInfo = require('../src/getUserInfo')

const searchData= require('./getSearch')

const { countReset } = require('console')
const PORT =5001

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
//const bodyParser = require('body-parser');

const app= express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//const port=process.env.PORT || 3000
app.use(cors(corsOptions))

// app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))
// app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')))
// app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')))


//ROUTING
let userpublickey = null
//ROUTES RELATED TO HOME PAGE
app.post('/userlog',(req, res) => {
    console.log(req.body)

    res.status(200).json({
      message: 'running',
     })
    
		});
  
app.get('/featured' , (req , res)=>{
  
  renderHomePage.featured(req, res)
  
})


app.get('/top-creators',(req,res)=>{
  renderHomePage.profile(req,res);
  
})


app.get('/showcase',(req,res)=>{

  renderHomePage.nft(req,res)
 
})



//ROUTES RELATED TO PROFILE PAGE
app.get('/u/:username', async(req, res) => {
  
  let  username=req.params.username
  console.log(username);
  renderProfilePage.renderProfilePage(username, res)
  
})

app.get('/unfts/:pub', async(req, res) => {
  let pub = req.params.pub
  profileNFTs.allNFTs(pub, res)
  
})


//ROUTES RELATED TO NFT PAGE
app.get('/nft/:postHashHex', (req, res) => {
  
    let postHashHex=req.params.postHashHex
    console.log('I am working');
    renderNFTPage.getNFTData(postHashHex,res)

})

app.get('/search/:key', async(req, res) => {
  
  let  searchKey=req.params.key
  searchData.getSearchResults(searchKey,res)
 
})

//server create
app.listen(PORT,()=> {

    console.log(`Listening to PORT ${PORT}`);

})

