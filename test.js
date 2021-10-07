const axios = require('axios')
const { text, response } = require('express')







/* GET_POSTS_FOR_PUBLICKEY */


const postUser = async () => {
    let response=await axios.post('https://bitclout.com/api/v0/get-posts-for-public-key',{
        LastPostHashHex: "",
        PublicKeysBase58Check: "",
        MediaRequired: true,
        username: 'manu',
        NumToFetch: 10,
        ReaderPublicKeyBase58Check: "BC1YLhrF1CURq9xyu44oTSAkvqK3eh8fmPqYQdPDTD9Ne4chwtFgyPA",

         
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
            console.log('This is the response');
            console.log(response.data.Posts[0].ImageURLs[0]);
            return response.data
        
          
       
    }).catch(err=>{
       console.log('There is an error');
     })
    }






/* GET_NFTS_FOR_USER */


const NFTForSaleUser = async() => {
    let response = await axios.post('https://bitclout.com/api/v0/get-nfts-for-user',{
        IsForSale: true,
        ReaderPublicKeyBase58Check: "BC1YLhrF1CURq9xyu44oTSAkvqK3eh8fmPqYQdPDTD9Ne4chwtFgyPA",
        UserPublicKeyBase58Check: "BC1YLixzDQdYiZW5nWLXP8KeB7Y5Vd4ePUiz3iwxQYV5xhownmf7CyT",
         
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
            console.log('This is the response');



            // for (const each in response.data.NFTsMap) {
            //     console.log(response.data.NFTsMap[each]);
            // }
            let passResponse = []

            for (const each in response.data.NFTsMap) {
                ImageURL = response.data.NFTsMap[each].PostEntryResponse.ImageURLs[0];
                LikeCount = response.data.NFTsMap[each].PostEntryResponse.LikeCount;
                HighestBidNanos = response.data.NFTsMap[each].NFTEntryResponses[0].HighestBidAmountNanos;

                passResponse = [...passResponse, {ImageURL, LikeCount, HighestBidNanos}]
                
            }
            console.log(passResponse);
            return response.data
        
          
       
    }).catch(err=>{
       console.log('There is an error');
     })
    }




    const userDetails = async() => {
        let response = await axios.post('https://bitclout.com/api/v0/get-single-profile',{
        PublicKeysBase58Check: '',
        username: 'manu'

         
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{

            let profileData = response.data.Profile
            let responseData = {
                username: profileData.Username,
                description: profileData.Description,
                profile_image: 'https://bitclout.com/api/v0/get-single-profile-picture/' + profileData.PublicKeyBase58Check + '?fallback=https://bitclout.com/assets/img/default_profile_pic.png',
                bitclout_link: 'https://bitclout.com/u/' + profileData.Username,
                coin_price: (profileData.CoinPriceBitCloutNanos/1000000000).toFixed(2)

            }
            console.log('This is the Profile Data');
            console.log(responseData);

    })
}

const exchange_rate = async() => {
    let response = await axios.get('https://bitclout.com/api/v0/get-exchange-rate', {
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => {
            console.log('This is the Exchange Rate Data');
            console.log(response.data.USDCentsPerBitCloutExchangeRate)
        })
        .catch(err => {
            console.log(err)
        })
}





const getUserInfo = async() => {
      
    let response=await axios.post('https://api.bitclout.com/get-single-profile',{

       PublicKeysBase58Check: [""],
       Username: 'manu'

       }, {
         headers: {
             'Content-Type': 'application/json'
         }}).then(response=>{
           console.log(response.data);
           return response.data
         
           
        
         }).catch(err=>{
           console.log(err);
          }) 
          
         
          
        console.log('This is getUserInfo.js');

}

getUserInfo()