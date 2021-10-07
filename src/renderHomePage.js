
var userNFTs = require('./userNFTs');
var UserProfile = require('./getProfilePic')
var Featured = require('./Featured')



const featured = async (req, res) => {

   var featuredResponse = await Featured.NFTForSaleUser()
   res.json(featuredResponse)

}



const profile = async(req,res) => {      
   console.log('This is renderHomePage.js');
      var profileCards=await UserProfile.getUserProfile(20)
      // console.log(profileCards);
      const newProfileCards = profileCards.map((profileCard) => {
         return { username: profileCard.username, UserProfilePic: profileCard.UserProfilePic}
      })

      res.json(newProfileCards);
      
}



const nft = async(req,res) =>{ 

      let numOfPosts=50
      
      var userposts=await userNFTs.getData(numOfPosts)
      // console.log(userposts);
      console.log(new Date(userposts[0].time/1000000));
      console.log(new Date(userposts[1].time/1000000));

      console.log(new Date(userposts[0].time/1000000) - new Date(userposts[1].time/1000000));
      const newuserposts = userposts.map(post => {
         return {
            imageURLs : post.imageURLs, 
            likes: post.likes, 
            HighestBidAmount: post.HighestBidAmount, 
            NFTPageLink: post.singlePage, 
            DiamondCount: post.Diamonds, 
            NumNFTCopies: post.NumNFTCopies, 
            NumNFTCopiesForSale: post.NumNFTCopiesForSale,
            timeStamp: post.time
         }
      })
      console.log(newuserposts);
      res.json(newuserposts);
      // console.log(userposts);
   }
   
   

module.exports = {profile, nft, featured}