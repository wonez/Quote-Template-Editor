const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    editors: {}
}, { minimize: false })

module.exports = mongoose.model('Template', TemplateSchema)
