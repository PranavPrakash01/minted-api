var getSinglePost = require('./getSinglePost')
var getNftBids = require('./getNftBids')


const getNFTData = async(postHashHex,res) => {
    

        let NFTData=  await getSinglePost.getSingleData(postHashHex)
        let NFTDataBids = await getNftBids.getNftBids(postHashHex)
        
        NFTData.NFTDataBids = NFTDataBids
        // console.log('This is from renderNFTPage');
        // console.log(NFTData);
      
      

        res.json(NFTData);


 }
 
module.exports.getNFTData=getNFTData