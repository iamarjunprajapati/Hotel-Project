const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://localhost/Hotel');
    console.log("signUp database connected");  
}
main().catch(err => console.log(err));
    // defining mongoose schema
const signUpSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
    // converting schema into a model
const signUpData = mongoose.model('singUPData', signUpSchema);
module.exports = signUpData;


