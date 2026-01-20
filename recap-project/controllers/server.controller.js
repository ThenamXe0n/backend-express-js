function visitedDetails(req, res) {
  
    console.log(req.query)
    console.log("contoller se ==>",req.user)
  try {
    res.status(200).json({
        message:`hi ! ${req.user.name} thanks for visiting user id:${req.user.id} ,role:${req.user.role}`
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {visitedDetails}
