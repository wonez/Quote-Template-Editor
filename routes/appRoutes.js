const router = require('express').Router();

router.get('/',  (req, res) => {
    res.render('app', { user: req.user._id })
})

//API
router.get('/get-current', (req, res) => {
    console.log(req.user);
    res.json({message: 'aaa'});
})



module.exports = router;