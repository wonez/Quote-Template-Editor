const router = require('express').Router();

router.use('/home', (req, res) => {
    res.end('Home');
})

module.exports = router;