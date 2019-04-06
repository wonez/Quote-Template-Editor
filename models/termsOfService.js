const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermsOfServiceSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    text: String,
})

module.exports = mongoose.model('TermsOfService', TermsOfServiceSchema)
