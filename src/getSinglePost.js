const axios = require('axios');

let template = {}


async function getSingleData(hexData){  
  
     let response=await axios.post('https://bitclout.com/api/v0/get-single-post',{

         PostHashHex:hexData,
         ReaderPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag",
         FetchParents:true,
         CommentOffset:0,
         CommentLimit:20,
         AddGlobalFeedBool:false
        }, {
          headers: {
              'Content-Type': 'application/json'
          }}).then(response=>{

            let data = response.data
            // console.log(response.data);
            template={
                    
              imageURLs : data.PostFound.ImageURLs[0],
              username: data.PostFound.ProfileEntryResponse.Username,
              user_pubKey: data.PostFound.ProfileEntryResponse.PublicKeyBase58Check,
              minted_profileLink: `/u/${data.PostFound.ProfileEntryResponse.Username}`,
              body : data.PostFound.Body,
              likes : data.PostFound.LikeCount,
              Diamonds : data.PostFound.DiamondCount,
              Comments : data.PostFound.CommentCount,
              reclouts : data.PostFound.RecloutCount,
              DateAndTime : (new Date(parseInt(String(data.PostFound.TimestampNanos)/1000000))).toUTCString(),
              BitcloutLink : String('https://bitclout.com/nft/'+hexData+'?tab=postsbody'),
              Timestamp : String(data.PostFound.TimestampNanos)
  
             }
            return response.data
          
            
         
          }).catch(err=>{
              console.log('There is an error');
           }) 
           //console.log(response);
           
           
          
           //console.log(response.PostFound); 
           
           console.log('This is getSinglePost.js');
          
         // console.log(template);
          
           
          
      return template
}

     

module.exports.getSingleData=getSingleData
