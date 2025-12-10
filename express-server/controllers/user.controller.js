const registerUserDetails = (req, res) => {
  console.log("controller fn started");
  console.log(req.body);
  console.log("token==>", req.token);
  console.log(req.params);
  console.log(req.query);
  res.status(200);
  res.json("completedzs");
};

module.exports = { registerUserDetails };
