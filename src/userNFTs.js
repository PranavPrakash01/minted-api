
const axios = require('axios');

const HighestBidSorter = (userPostsDoc) => {

  return  userPostsDoc.sort(function(a, b){
          return  b.HighestBidAmountNanos - a.HighestBidAmountNanos ;
    });

}




const sorter = (response,numOfPosts,userPostsDoc) => {
   
  // console.log(response.NFTCollections[0]);
     for (let i = 0; i < numOfPosts; i++){
          //  console.log(response.NFTCollections[i]);
          
           
           if(response.NFTCollections[i].PostEntryResponse.ImageURLs !== null ){  

            let ImageURLs=String(response.NFTCollections[i].PostEntryResponse.ImageURLs[0])
            let LikeCount=String(response.NFTCollections[i].PostEntryResponse.LikeCount)
            let DiamondCount=String(response.NFTCollections[i].PostEntryResponse.DiamondCount)
            let Body=String(response.NFTCollections[i].PostEntryResponse.Body)
            let CommentCount=String(response.NFTCollections[i].PostEntryResponse.CommentCount)
            let PostHashHex=String(response.NFTCollections[i].PostEntryResponse.PostHashHex)
            let HighestBidAmountNanos=String(response.NFTCollections[i].HighestBidAmountNanos)
            let LowestBidAmountNanos=String(response.NFTCollections[i].LowestBidAmountNanos)

            let username=String(response.NFTCollections[i].ProfileEntryResponse.Username)
            let publicKey=String(response.NFTCollections[i].ProfileEntryResponse.PublicKeyBase58Check)

            var UserProfilePic = "https://bitclout.com/api/v0/get-single-profile-picture/"+ publicKey+"?fallback=https://bitclout.com/assets/img/default_profile_pic.png"
            var UserLink='https://bitclout.com/u/'+username  
            var profilePage=String('/u/'+username)
            
            let time = response.NFTCollections[i].PostEntryResponse.TimestampNanos
            let NumNFTCopies = response.NFTCollections[i].PostEntryResponse.NumNFTCopies
            let NumNFTCopiesForSale = response.NFTCollections[i].PostEntryResponse.NumNFTCopiesForSale
            

            let template={  
              'username':username,                                             //template to pass to userPost
              'body':Body,
              'likes':LikeCount,
              'Diamonds':DiamondCount,
              'Comments':CommentCount,
              'imageURLs':ImageURLs,
              'singlePage':String('/nft/'+PostHashHex),
              'BitcloutLink':String('https://bitclout.com/nft/'+PostHashHex+'?tab=postsbody'),
              'HighestBidAmount':(HighestBidAmountNanos/1000000000),
              'LowestBidAmount':(LowestBidAmountNanos/1000000000),
              'UserProfilePic':UserProfilePic,
              'profilePage': profilePage,
              'UserLink':UserLink,
              'HighestBidAmountNanos':HighestBidAmountNanos,
              'time': time,
              'NumNFTCopies': NumNFTCopies,
              'NumNFTCopiesForSale': NumNFTCopiesForSale
              }

              userPostsDoc.push(template)
            
            }
          } 
          
     return userPostsDoc
     //console.log(userPostsDoc);

}


const getData = async(numOfPosts) => {
  var userPostsDoc =[]

 // var numOfPosts=20
    

   let response=await axios.post('https://bitclout.com/api/v0/get-nft-showcase',{

     UserPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag",
     ReaderPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag"
         
     }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
          // console.log(response.data.NFTCollections[0]);
          // console.log(response.data.NFTCollections[0])
          return response.data
        
          
       
    }).catch(err=>{
         console.log('There is an error');
     })
      
      sorter(response,numOfPosts,userPostsDoc)
    
      console.log('This is getUserPosts.js');

    return HighestBidSorter(userPostsDoc);
    
} 
module.exports.getData=getData
  
