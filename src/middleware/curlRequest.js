const fetchBlogData = async(req,res ,next)=>{
   try {
    const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "x-hasura-admin-secret":  '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
    })
    const data = await response.json();
    req.data = data
    next()
   } catch (error) {
      console.log('error = ===>',error)
      res.status(500).send({status:false,error:error.message})
   }
}
module.exports = {fetchBlogData}