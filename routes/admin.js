exports.login = function(req, res) {
  console.log(req.session.email);
	if(req.session.email)
    res.render('home', {
      email : req.session.email, 
      fname : req.session.fname, 
      lname : req.session.lname, 
      createdAt : req.session.createdAt
    });
	else
		res.render('login');
}

exports.home = function(req, res) {
  // console.log(req.session.email);
  // if(req.session.useremail) {
  //   res.render('home', {
  //     email : req.session.user.email, 
  //     fname : req.session.user.fname, 
  //     lname : req.session.user.lname, 
  //     createdAt : req.session.user.createdAt
  //   });
  // }
  // else
  // {
  //   res.redirect('/login');
  // }
  res.render('home', {
    email : req.session.user.email, 
    fname : req.session.user.fname, 
    lname : req.session.user.lname, 
    createdAt : req.session.user.createdAt
  });
}

exports.logout = function(req, res) {
  console.log(req.session.email);
    //Logout the user - invalidate the session
      req.session.destroy();
      res.redirect('/login');
}
