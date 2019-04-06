module.exports = (req, res, next) => {
    if(req.user){
        next();
    }else{
        req.user = {
            _id : "5c8d079b9a10ac4fa76d60da"
        }
        next();
    }
    // if(!req.isAuthenticated()){
    //     res.redirect('/login');
    // }else{
    //     next()
    // }
}