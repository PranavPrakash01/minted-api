const axios = require('axios');
var getNftBids = require('./getNftBids')


function dateConvrter(Timestamp){

  var remainingTime;

    function humanReadable(timeStamp){

        var unixTimestamp = timeStamp
      
       var milliseconds =  parseInt(unixTimestamp)* 1000 
      
       var dateObject = new Date(milliseconds)
      
       //var humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
      
        let month=dateObject.toLocaleString("en-US", {month: "short"}) 
        let day=dateObject.toLocaleString("en-US", {day: "numeric"})
        let year=dateObject.toLocaleString("en-US", {year: "numeric"})
        let hour=dateObject.toLocaleString("en-US", {hour: "numeric"})
        let minutes=dateObject.toLocaleString("en-US", {minute: "numeric"})
        let seconds=dateObject.toLocaleString("en-US", {second: "numeric"})
        
         ReadableTime=month+' '+day+', '+year+' '+parseInt(hour)+':'+minutes+':'+seconds
      
        return ReadableTime
      }

    //var FormattedDate=humanReadable(parseInt(String(Timestamp)/1000000000))
    
    var ExpiryDate=humanReadable(parseInt(String(Timestamp)/1000000000)+48*60*60)
          
    
    //console.log(search_timeStamp)
    //console.log(FormattedDate)
    //console.log(ExpiryDate)

    
    // Set the date we're counting down to
    var countDownDate = new Date(ExpiryDate).getTime();
                   
    // Update the count down every 1 second
    
  
    
    var now =new Date().getTime();   
    var distance = countDownDate - now; 
    
                    
                    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    

    // Display the result in the element with id="demo"
    remainingTime = String("🕑 Expires in :"+days + "d " + hours + "h "
      + minutes + "m ");

    // If the count down is finished, write some text
     if (distance < 0) {
     
      remainingTime = "EXPIRED";

             }
      return remainingTime
                 
}




async function getUserProfilePageData(username,numOfPosts){
 

  var userPostsDoc =[]


    let response=await axios.post('https://bitclout.com/api/v0/get-posts-for-public-key',{

        PublicKeyBase58Check:"",
        Username:username,
        ReaderPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag",
        NumToFetch:numOfPosts
          
      }, {
        headers: {
            'Content-Type': 'application/json'
        }}).then(response=>{
            
            return response.data

      }).catch(err=>{
       throw err
      })
          let body=response
          //console.log(body)
        
      for (let i = 0; i < numOfPosts; i++){

          
          
        let ImageURLs = String(body['Posts'][i]['ImageURLs'])
        let IsNFT= String(body['Posts'][i]['IsNFT'])
          
          if(ImageURLs !=='null' && IsNFT==='true'){                                      //imagefilter
              
          let ImageURLs = String(body['Posts'][i]['ImageURLs'])
          let Body = String(body['Posts'][i]['Body'])
          let LikeCount = String(body['Posts'][i]['LikeCount'])
          let DiamondCount = String(body['Posts'][i]['DiamondCount'])
          let CommentCount = String(body['Posts'][i]['CommentCount'])
          let RecloutCount = String(body['Posts'][i]['RecloutCount'])
          let NumNFTCopies = String(body['Posts'][i]['NumNFTCopies'])
          let publicKey = String(body['Posts'][i]['PosterPublicKeyBase58Check'])
          let PostHashHex=String(body['Posts'][i]['PostHashHex'])
          let singlePage  = String('/singlenft/'+body['Posts'][i]['PostHashHex'])
          let Timestamp=String(body['Posts'][i]['TimestampNanos'])

          var UserProfilePic = "https://bitclout.com/api/v0/get-single-profile-picture/"+ publicKey+"?fallback=https://bitclout.com/assets/img/default_profile_pic.png"
          
          let BitcloutLink=String('https://bitclout.com/nft/'+body['Posts'][i]['PostHashHex']+'?tab=postsbody')
          
          var getNftBidsArr = await getNftBids.getNftBids(PostHashHex)
            
          var ExpireTime=dateConvrter(Timestamp);
          
          let template={  
              'username':username,                                             //template to pass to userPost
              'body':Body,
              'likes':LikeCount,
              'Diamonds':DiamondCount,
              'Comments':CommentCount,
              'reclouts':RecloutCount,
              'imageURLs':ImageURLs,
              'NumNFTCopies':NumNFTCopies,
              'BitcloutLink':BitcloutLink,
              'UserProfilePic':UserProfilePic,
              'singlePage':singlePage,
              'Data':{Timestamp},
              'getNftBidsArr':getNftBidsArr,
                'PostHashHex':PostHashHex,
                'ExpireTime':ExpireTime
              }
              
              userPostsDoc.push(template)
          }
          
      }
  
      console.log('This is getProfilePageData.js');


      return userPostsDoc
}



  //getUserProfilePageData('Joiet',numOfPosts)
  module.exports.getUserProfilePageData=getUserProfilePageData