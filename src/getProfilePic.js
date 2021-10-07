const axios = require('axios');


const HighestBidSorter = (userPostsDoc) => {

  return  userPostsDoc.sort(function(a, b){
          return  b.HighestBidAmountNanos - a.HighestBidAmountNanos ;
    });

}




const sorter = (response,numOfPosts,userPostsDoc) => {
   

     for (let i = 0; i < numOfPosts; i++){
           //console.log(response.NFTCollections[i]);
          let ImageURLs=String(response.NFTCollections[i].PostEntryResponse.ImageURLs[0])
           
           if(ImageURLs!=='null'&& ImageURLs!=='undefined'){  

            
             let PostHashHex=String(response.NFTCollections[i].PostEntryResponse.PostHashHex)
             let HighestBidAmountNanos=String(response.NFTCollections[i].HighestBidAmountNanos)
             let LowestBidAmountNanos=String(response.NFTCollections[i].LowestBidAmountNanos)

             let username=String(response.NFTCollections[i].ProfileEntryResponse.Username)
             let publicKey=String(response.NFTCollections[i].ProfileEntryResponse.PublicKeyBase58Check)

             var UserProfilePic = "https://bitclout.com/api/v0/get-single-profile-picture/"+ publicKey+"?fallback=https://bitclout.com/assets/img/default_profile_pic.png"
             var UserLink='https://bitclout.com/u/'+username  
             var profilePage=String('/u/'+username)

            let template={  
              
               'username':username,                                             //template to pass to userPost
               'singlePage':String('/singlenft/'+PostHashHex),
               'BitcloutLink':String('https://bitclout.com/nft/'+PostHashHex+'?tab=postsbody'),
               'UserProfilePic':UserProfilePic,
               'profilePage': profilePage,
               'UserLink':UserLink,
               'HighestBidAmountNanos':HighestBidAmountNanos
              
              }
            
              userPostsDoc.push(template)
            
            }
          } 
          
          console.log('This is getProfilePic.js');
    return userPostsDoc
     //console.log(userPostsDoc);

}


const getUserProfile = async (numOfPosts) => {
  var userPostsDoc =[]

 // var numOfPosts=20
    

   let response=await axios.post('https://bitclout.com/api/v0/get-nft-showcase',{

     UserPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag",
     ReaderPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag"
         
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
            
            return response.data
        
          
       
    }).catch(err=>{
       throw err
     })
      
      sorter(response,numOfPosts,userPostsDoc)
    
     let sortedArr=HighestBidSorter(userPostsDoc)
          
      var clean = sortedArr.filter((sortedArr, index, self) =>
       index === self.findIndex((t) => (t.username === sortedArr.username)))

      return clean

     // console.log(sortedArr);
} 
//getUserPofile(20)
module.exports.getUserProfile=getUserProfile