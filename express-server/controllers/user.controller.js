const { userCredentials } = require("../data");

const registerUserDetails = (req, res) => {
  console.log("controller fn started");
  console.log(req.body);
  console.log("token==>", req.token);
  console.log(req.params);
  console.log(req.query);
  res.status(200);
  res.json("completedzs");
};

// login controller for user
// payload : email,password(req)
//res

const loginUser = (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  // step 1: find data in database on behalf of given details (i.e email)
  let user = userCredentials.find((userDetail) => {
    return userDetail.email === email;
  });

  //validation : if user not found send A res to logger that no user found , please register
  if (!user) {
    res.send({
      data: null,
      status: false,
      statusCode: 404,
      message: "user not found, please register as a user",
    });
    return;
  }

  //step 2 : match user password with stored password you get in checkUser
  let check = user?.password === password;

  // validation : if password not matched
  if (!check) {
    res.status(401).send({
      data: null,
      message: "invalid credentials",
      statusCode: 401,
    });

    return
  }


  //final step

  let datatosend = {...user,password:undefined}

  res.status(302).send({
    data:datatosend,
    status: true,
    statusCode: 302,
    message: "user Found",
  });
};

module.exports = { registerUserDetails, loginUser };
