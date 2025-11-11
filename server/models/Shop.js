const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    prodId: { type: String, required: true },
    image: { type: String, require: true, default: '' },
    name: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    desc: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);