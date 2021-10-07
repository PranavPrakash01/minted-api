const axios = require('axios')
let NFTProfileList = {}

const ownedNFTs = (crap, pub) => {
    let owned = []
    for (const each in crap) {
        
        
        owned = [...owned, {
            ImageURL : crap[each].PostEntryResponse.ImageURLs[0],
            LikeCount : crap[each].PostEntryResponse.LikeCount,
            PostHashHex : crap[each].PostEntryResponse.PostHashHex,
            HighestBidNanos : crap[each].NFTEntryResponses[0].HighestBidAmountNanos,
            isForSale : crap[each].NFTEntryResponses[0].IsForSale,
            posterPublicKey : crap[each].PostEntryResponse.PosterPublicKeyBase58Check
        }]
        if ((crap[each].NFTEntryResponses[0].IsForSale === null) && (crap[each].PostEntryResponse.PosterPublicKeyBase58Check === pub)) {
        }
        
    }
    

    return owned
}




const forSaleNFTs = (crap) => {
    let forSale = []
    for (const each in crap) {
        // console.log(crap[each].NFTEntryResponses[0].IsForSale);
        if (crap[each].NFTEntryResponses[0].IsForSale === true) {
            forSale = [...forSale, {
                ImageURL : crap[each].PostEntryResponse.ImageURLs[0],
                LikeCount : crap[each].PostEntryResponse.LikeCount,
                PostHashHex: crap[each].PostEntryResponse.PostHashHex,
                HighestBidNanos : crap[each].NFTEntryResponses[0].HighestBidAmountNanos
            }]
        }
        
    }
    // console.log(forSale);
    console.log('I am trapped');
    return forSale
}


const allNFTs = async(pub, res) => {
    let response = await axios.post('https://bitclout.com/api/v0/get-nfts-for-user',{
        IsForSale: null,
        ReaderPublicKeyBase58Check: "BC1YLhrF1CURq9xyu44oTSAkvqK3eh8fmPqYQdPDTD9Ne4chwtFgyPA",
        UserPublicKeyBase58Check: pub,
         
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
            // console.log(response.data);
            // console.log('This is the response');
            // for (const each in response.data.NFTsMap) {
            //     console.log(response.data.NFTsMap[each].NFTEntryResponses);
            // }

            let nftsAll = []

            for (const each in response.data.NFTsMap) {

                let data = response.data.NFTsMap[each]

                

                nftsAll = [...nftsAll, {
                    ImageURL : data.PostEntryResponse.ImageURLs[0],
                    LikeCount : data.PostEntryResponse.LikeCount,
                    PostHashHex : data.PostEntryResponse.PostHashHex,
                    HighestBidNanos : data.NFTEntryResponses[0].HighestBidAmountNanos,
                }]
                
            }

            NFTProfileList.nftsAll = nftsAll
            NFTProfileList.nftsForSale = forSaleNFTs(response.data.NFTsMap)
            NFTProfileList.nftsOwned = ownedNFTs(response.data.NFTsMap, pub)
            // console.log(NFTProfileList.nftsOwned);

            console.log('--------NFT RESPONSE------------');
            // console.log(passResponse);
            res.json(NFTProfileList.nftsOwned)
            // return response.data
        
          
       
    }).catch(err=>{
       console.log('There is an error');
     })
    }

    module.exports = {allNFTs}