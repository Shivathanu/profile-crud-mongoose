const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProfileSchema = new Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    emailId: {type: String, required: true, max: 100},
    productImage: {type: String, required: false}
});

// Export the model
module.exports = mongoose.model('Profile', ProfileSchema);
