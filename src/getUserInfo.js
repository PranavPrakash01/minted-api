const axios = require('axios');

const userDetails = async(u) => {

  let responseData = {}
  let response = await axios.post('https://bitclout.com/api/v0/get-single-profile',{
  PublicKeysBase58Check: '',
  username: u

   
}, {
  headers: {
      'Content-Type': 'application/json'
  }}).then(response=>{

      let profileData = response.data.Profile
      // console.log(profileData);
      responseData = {
          public_key: profileData.PublicKeyBase58Check,
          username: profileData.Username,
          description: profileData.Description,
          profile_image: 'https://bitclout.com/api/v0/get-single-profile-picture/' + profileData.PublicKeyBase58Check + '?fallback=https://bitclout.com/assets/img/default_profile_pic.png',
          bitclout_link: 'https://bitclout.com/u/' + profileData.Username,
          coin_price: (profileData.CoinPriceBitCloutNanos/1000000000).toFixed(2)

      }
      console.log('This is the Profile Data');
      // console.log(responseData);

})

return responseData
}


async function getUserInfo(username){  
      
     let response=await axios.post('https://api.bitclout.com/get-single-profile',{

        PublicKeysBase58Check: [""],
        Username: username

        }, {
          headers: {
              'Content-Type': 'application/json'
          }}).then(response=>{
            // console.log(response.data);
            return response.data
          
            
         
          }).catch(err=>{
            console.log(err);
           }) 
           
          
           
         console.log('This is getUserInfo.js');
      res.json(template);
}
//getUserInfo('cloutpunk')
module.exports = {userDetails}