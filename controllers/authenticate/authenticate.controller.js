const AuthenticateSignupSchema = require('../../models/authenticate/authenticate-signup.model');
const AuthenticateSigninSchema = require('../../models/authenticate/authenticate-signin.model');
const jwt = require('jsonwebtoken');

exports.authenticate_signup = (req, res) => {
  const userdata = new AuthenticateSignupSchema(
    {
      username: req.body.username,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword
    }
  );

  AuthenticateSignupSchema.find({username : userdata.username, password: userdata.password}, (err, user) => {
    
    if (user.length){
      return res.status(409).send({ 
        success: false, 
        message: 'User exists already' 
      });
    } else if (userdata.password === userdata.confirmpassword) {
      userdata.save((err) => {
        res.json({
          status: 200,
          success: true,
          message: 'User: ' + userdata.username + ' registered succesfully',
        });
      });
    } else {
      res.status(500).send({
        success: false,
        message: err
      });
    }

  });
  
};

exports.authenticate_signin = (req, res) => {
  const userdata = new AuthenticateSigninSchema(
    {
      username: req.body.username,
      password: req.body.password
    }
  );

  AuthenticateSignupSchema.findOne({username : userdata.username, password: userdata.password}, (err, user) => {
  
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if (userdata.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        const token = jwt.sign({ username: userdata.username }, 'luizalabs2018', {
          expiresIn: 60 * 60 
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      } 

    }

  });

}

