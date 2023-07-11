const connectDb = require("../config/database");
const {
  hashValidator,
  hashGenerate,
} = require("../helper/hash.js");
const {
  tokenGen,
  tokenGenerator,
  tokenValidator,
  refreshtokenValidator,
  refreshToken,
} = require("../helper/token.js");
const User = require("../config/schema.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_KEY = "SFWERgjEYJSRATHafathrsr";
const JWT_REFRESH_KEY = "ABCDEFGHIJKLlkjihgfedcba";
// const mail = require('../config/mail.js');

const mailgun = require("mailgun-js");
(DOMAIN = "sandbox435f50f49be14624b0c88beb2e37938e.mailgun.org"),
  (MAILGUN_API_KEY = "17f5ddf9cb94a947ceeb383aef5ef3df-102c75d8-5b81c513");
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

const signUp = async (req, res) => {
  try {
    const hashedPassword = await hashGenerate(req.body.password);
    await connectDb();
    const existingUser = await User.user.findOne({ email: req.body.email });
    if (existingUser) {
      res.send({ message: "user already registered ... please login" });
    } else {
      let data = await User.user.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      //console.log(hashedPassword);
      res.send(data);
    }
  } catch (err) {
    res.send(err);
  }
};

const signIn = async (req, res) => {
  const {email, password} =req.body;
  try {
    await connectDb();
    const existingUser = await User.user.findOne({email});
    if (!existingUser) {
      res.send("invalid mail_id");
    } else {
      const checkUser = await hashValidator(
         password,
        existingUser.password
      );
      if (!checkUser) {
        res.send("invalid password");
      } else {
        const emailid =email
        console.log(email);
        const token = jwt.sign({emailid},  JWT_KEY, { expiresIn: '1m' });
        const reToken = jwt.sign({emailid}, JWT_REFRESH_KEY, { expiresIn: '2m' });
        console.log("reToken: ", reToken);
       const updateToken = await User.user.findOneAndUpdate({ email: req.body.email }, {refreshtoken:reToken});
        
        res.status(200).json({accesstoken:token,
                             refreshtoken: reToken});
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


const token= async(req,res)=>{
    const refreshToken = req.body.refreshtoken;
    await connectDb();
      if (refreshToken == null) {
         res.status(401).json("Plese enter the token");
      }
      
      const existingToken= await User.user.find({refreshtoken:refreshToken});
      if(existingToken){

         jwt.verify(refreshToken, JWT_REFRESH_KEY, async (err, user) => {
        if (err) {
           res.status(400).json("invalid token");
        }else{
        const token =await tokenGenerator(existingToken.email);
        res.status(200).json({accesstoken:token});
        }
      });
    }else{
      res.status(201).json("Token expired. Please login")
    }
    }; 
     








const forgotPassword = async (req, res) => {
  try {
    await connectDb();
    const users = await User.user.findOne({ email: req.body.email });
    console.log(users);

    if (!users) {
      res.send("user with this mailid does not exist");
    } else {
      const token = tokenGen(req.body.email);
      console.log(token);
      const url = `http://localhost:4000/api/users`;

      const data = {
        from: "noreply@onestop.com",
        to: req.body.email,
        subject: "password reset link",
        html: `<h1>please click on the linkt to reset your password</h1>
           <p> ${url}/resetpassword  ${token}</p>`,
      };

      const result = await User.user.updateOne({email:req.body.email},{resetLink: token }); 
        if (!result) {
          return res.status(400).json({ err: "reset password link error" });
        } else {
    const resultMail= await mg.messages().send(data); 
    // console.log((resultMail));
            if (!resultMail) {
              return res.json({ error: error.message });
            }
            return res.status(201).json({
              message: "Email has beed sent, kindly follow the instruction",
             resetLink: token
            });
          };
        }
    } catch (err) {
    res.send(err);
  }
};



const resetPassword = async (req, res) => {
  try {
    await connectDb();

    //  const {resetLink, newPass } =req.body;
    const hashedPassword = await hashGenerate(req.body.newPass);
    if (req.body.resetLink) {
      const verifyToken = await tokenValidator(req.body.resetLink);
      if (!verifyToken) {
        res.send("incorrect token or it is expired");
      } else {
        const data = await User.user.findOneAndUpdate(
          { resetLink: req.body.resetLink },
          { password: hashedPassword ,resetLink:'' }
        );
        console.log(data);
        res.send("password reset success");
      }
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

/*const authVerify = async (req, res, next) => {
  try {
    const{ jwt } =  req.cookies;
    const valid = await tokenValidator(jwt);
    if (valid) {
      next();
    } else {
      res.send("Access Denied");
    }
  } catch (err) {
    res.send(err);
  }
};*/

const findUdserById = async (req, res) => {
  await connectDb();
  let result = await data
    .collection("users")
    .findOne({ _id: new ObjectId(req.body.user_id) });
  res.send(result);
};

const findUserByMail = async (req, res) => {
  let data = await connectDb();
  let users = await data
    .collection("users")
    .findOne({ mail_id: req.body.mail_id });
  res.send(users);
};

const findUser = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .findOne({ fullName: req.body.fullName });
  res.send(result);
};

const getUsers = async (req, res) => {
  
  try{
    await connectDb();
  let result = await User.user.find({});
  console.log(result);
  res.send(result);
  }catch(error){
    console.log(error);
    res.send(error);
  }
};

const getUsersList = async (req, res) => {
  let data = await connectDb();
  let usersList = await data
    .collection("users")
    .find({}, { projection: { fullName: 1, _id: 0 } })
    .toArray();
  res.send(usersList);
};

const updateUser = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .updateOne(
      { _id: req.body.user_id },
      { $set: { password: req.body.password } }
    );
  res.send(`User with ${req.body.user_id} is updated!`);
};

const deleteUser = async (req, res) => {
  let data = await connectDb();
  let result = await data
    .collection("users")
    .deleteOne({ _id: req.body.user_id });
  res.send(`User with ${req.body.user_id} is deleted`);
};

const findUserByName = async (req, res) => {
  let data = await connectDb();
  let users = await data
    .collection("users")
    .find({ fullName: req.body.fullName })
    .toArray();
  res.send(users);
  //console.log(users);
};

module.exports = {
  getUsers,
  findUser,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  findUserByMail,
  findUdserById,
  findUserByName,
  getUsersList,
  forgotPassword,
  resetPassword,
  token
};

/*const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

mg.messages.create('sandbox-123.mailgun.org', {
	from: "Excited User <mailgun@sandbox-123.mailgun.org>",
	to: ["test@example.com"],
	subject: "Hello",
	text: "Testing some Mailgun awesomeness!",
	html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); // logs any error*/
