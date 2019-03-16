const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req, res) => {
    if(req.isAuthenticated()) return res.redirect('/app')
    res.render('login', { message: req.flash('message')});
})
router.get('/signup', (req, res) => {
    if(req.isAuthenticated()) return res.redirect('/app')
    res.render('signup');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            req.flash('message', 'Something went wrong');
            return res.redirect('/login') 
        }
        if (!user) { 
            req.flash('message', 'Invalid credentials');
            return res.redirect('/login'); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                req.flash('message', 'Something went wrong');
                return res.redirect('/login') 
            }
            return res.redirect('/home');
        });
    })(req, res, next);
})

router.post('/signup', async (req, res) => {
    try{
        if(req.body.username && req.body.password && req.body.confirmation){
            if(req.body.password !== req.body.confirmation) throw "Passwords don't match"
            const user = await User.findOne({username: req.body.username})
            if(user) throw 'Username already exists'
            req.body.password = User.hashPassword(req.body.password);
            await new User({ ...req.body }).save();
            res.redirect('/')
        }else{
            throw 'All Fields are required'
        }
    }catch(msg){
        res.render('signup', { message: msg })
    }
})

router.get('*', (req, res) => {
    res.redirect('/login')
})

module.exports = router;