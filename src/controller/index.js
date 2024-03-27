const homepage = (req,res)=>{
  try {
     res.status(200).send({
        message:"welcome to Wanderlust"
     })
  } catch (error) {
    res.status(500).send({
        message:"internal server error"
    })
  }
}

export default {
    homepage
}