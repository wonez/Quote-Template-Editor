const router = require('express').Router();
const Template = require('../models/template')
const TermsOfService = require('../models/termsOfService')

router.get('/',  (req, res) => {
    res.render('app', { user: req.user._id })
})

//API
router.get('/templates', async (req, res) => {
    const templates = await Template.find({ author: req.user._id }, { title: 1 })
    res.json(templates)
})

router.get('/template/:id', async(req, res) => {
    const id = req.params.id;
    const template = await Template.findById(id, { editors: 1, _id: 0 })
    res.json(template)
})

router.post('/template', async(req, res) => {
    const template = new Template()
    template.author = req.user._id
    template.title = 'New Template',
    template.editors = {
        Editor1: {}
    }
    template.markModified('editors');
    template.save()
    res.json({_id: template._id, title: template.title, author: template.author})
})


router.put('/template/:id', async(req, res) => {
    const updated = await Template.findByIdAndUpdate(req.params.id, { editors: req.body.editors }, { new: true })
    res.json(updated)
})

router.put('/rename', async(req, res) => {
    const template = await Template.findByIdAndUpdate(req.body.id, { title: req.body.title }, { new: true })
    res.json(template)
})

router.delete('/template/:id', async(req, res) => {
    const id = req.params.id
    const template = await Template.findByIdAndDelete(id)
    res.json({_id: template._id})
})

router.post('/terms-of-service', async(req, res) => {
    const term = await new TermsOfService({
        author: req.user._id,
        ...req.body,
    }).save()
    res.json(term)
})

router.get('/terms-of-service', async(req, res) => {
    const terms = await TermsOfService.find({ author: req.user._id })
    res.json(terms)
})

router.get('/terms-of-service/:id', async(req, res) => {
    try{
        const id = req.params.id
        const term = await TermsOfService.findById(id)
        if(term.author != req.user._id)
            throw "Unothorized"
        res.json(term)
    }catch(err){
        res.json({message: "Reques failed"})
    }
})

router.delete('/terms-of-service/:id', async(req, res) => {
    const id = req.params.id
    const item = await TermsOfService.findByIdAndDelete(id)
    res.json(item)
})

router.put('/terms-of-service/:id', async(req, res) => {
    const id = req.params.id
    const item = await TermsOfService.findByIdAndUpdate(id, {
        ...req.body
    })
    res.json(item)
})

module.exports = router;