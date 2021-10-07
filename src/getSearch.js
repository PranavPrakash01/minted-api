const axios = require('axios');



const getSearchData= async(searchKey,res) => {  

    var searchResultArr=[]
 
    let response=await axios.post('https://bitclout.com/api/v0/get-profiles',{

        PublicKeyBase58Check:"",
        Username:"",
        UsernamePrefix:searchKey,
        Description:"",
        OrderBy:"",
        NumToFetch:20,
        ReaderPublicKeyBase58Check:"BC1YLin2QZLzk3GwnjwxYt4P11oLBNXsJtBdBSq9LEvdmVS7MN1qEag",
        ModerationType:"",
        FetchUsersThatHODL:false,
        AddGlobalFeedBool:false
        
       }, {
         headers: {
             'Content-Type': 'application/json'
         }}).then(response=>{
           
           return response

       }).catch(err=>{
          
          }) 
        
        let Body=response.data.ProfilesFound
              
        for (let i = 0; i < Body.length; i++){
          let username=Body[i].Username;
          let publicKey=Body[i].PublicKeyBase58Check
          var UserProfilePic = "https://bitclout.com/api/v0/get-single-profile-picture/"+ publicKey+"?fallback=https://bitclout.com/assets/img/default_profile_pic.png"
          var profilePage=String('/u/'+username)
          template={
            'username':username,
            'UserProfilePic':UserProfilePic,
            'profilePage': profilePage
          }
          searchResultArr.push(template)


        }
       
        res.json(searchResultArr); ;
}



//let searchKey="yogi"
//getSearchData(searchKey)

module.exports.getSearchResults=getSearchData
