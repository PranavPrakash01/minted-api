var profilePage = require('./getProfilePageData');
var UserInfo=require('./getUserInfo')
var userNFTs = require('./profileNFTs')

async function renderProfilePage(u, res){
    let test = await UserInfo.userDetails(u)
    
    console.log('This is from render Profile Page');
    // console.log(test);
    res.json(test)
    
}
   
module.exports.renderProfilePage=renderProfilePage