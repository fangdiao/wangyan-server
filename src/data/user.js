import mongoose from 'mongoose';


const usersSchema = new mongoose.Schema({
  id: Number,
  name: String,
  avatar: String,
  birthday: Number,
  school: String,
  province: String,
  city: String,
  contact: Object,
  motto: String,
  sex: String,
  accountNumber: String,
  password: String,
  followPeople: Array,
  followMessage: Array,
  release: Array
});
const users = mongoose.model('users', usersSchema);

export default class UserModel {
  async findUser (name) {
    let res = null;
    await users.find({ name }, (err, user) => {
      if(err) {
        res = {};
      } else {
        res = user[0];
      }
    });
    return res;
  }
};
