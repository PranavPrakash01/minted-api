const axios = require('axios');

function bidJson(bidderDoc,BiderName,BidAmount$Clout){

    bidTemplate={

        'BidAmount$Clout':BidAmount$Clout,
        'BiderName':BiderName

    }
    bidderDoc.push(bidTemplate)

    return bidderDoc
  }

 function BidSorter(bidderDoc){

    return  bidderDoc.sort(function(a, b){
            return  b.BidAmount$Clout - a.BidAmount$Clout ;
      });

 }



async function getNftBids(hexData){ 
  console.log('This is getNFTBids.js');
       bidderDoc=[]
  
     let response=await axios.post('https://bitclout.com/api/v0/get-nft-bids-for-nft-post',{

         ReaderPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag",
         PostHashHex:hexData

        }, {
          headers: {
              'Content-Type': 'application/json'
          }}).then(response=>{
              
            return response.data
          
            
         
          }).catch(err=>{
           
           }) 
   if(response.BidEntryResponses!==null) {  
    for(let i = 0; i < response.BidEntryResponses.length; i++){  

        var BidAmountNanos =await response.BidEntryResponses[i].BidAmountNanos
        var BiderName=await response.BidEntryResponses[i].ProfileEntryResponse.Username;

        var BidAmount$Clout= (BidAmountNanos/1000000000)
        
        bidJson(bidderDoc,BiderName,BidAmount$Clout)
    
    }
    return BidSorter(bidderDoc)
  }else{
    noData=[{
      'BidAmount$Clout':0,
      'BiderName':'No Bids Yet'
      }]
     return noData
  }
}
//getNftBids("6b123e34cc5c4a57f5faa57ea1367ae2b760b83cad5f361cc4cad8d2d269d097")


module.exports.getNftBids=getNftBids