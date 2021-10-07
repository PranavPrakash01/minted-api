const axios = require('axios')

const NFTForSaleUser = async() => {

    let passResponse = []
    let response = await axios.post('https://bitclout.com/api/v0/get-nfts-for-user',{
        IsForSale: true,
        ReaderPublicKeyBase58Check: "BC1YLhrF1CURq9xyu44oTSAkvqK3eh8fmPqYQdPDTD9Ne4chwtFgyPA",
        UserPublicKeyBase58Check: "BC1YLixzDQdYiZW5nWLXP8KeB7Y5Vd4ePUiz3iwxQYV5xhownmf7CyT",
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
            // console.log('This is the response');



            // for (const each in response.data.NFTsMap) {
            //     console.log(response.data.NFTsMap[each]);
            // }
            

            for (const each in response.data.NFTsMap) {
                
                ImageURL = response.data.NFTsMap[each].PostEntryResponse.ImageURLs[0];
                LikeCount = response.data.NFTsMap[each].PostEntryResponse.LikeCount;
                HighestBidNanos = response.data.NFTsMap[each].NFTEntryResponses[0].HighestBidAmountNanos;
                NFTPageLink = `/nft/${response.data.NFTsMap[each].PostEntryResponse.PostHashHex}`

                passResponse.push({ImageURL, LikeCount, HighestBidNanos, NFTPageLink})
                
            }
            // console.log(passResponse);
            
        
          
       
    }).catch(err=>{
       console.log('There is an error');
     })


    passResponse = passResponse.slice(0, 4)
    console.log('This is Featured.js');
    return passResponse
    }

module.exports = {NFTForSaleUser}