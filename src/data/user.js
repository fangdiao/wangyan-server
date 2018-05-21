import mongoose from 'mongoose';


const usersSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  birthday: Number,
  school: String,
  qq: String,
  weixin: String,
  motto: String,
  sex: String,
  accountNumber: String,
  password: String,
  friend: Array,
  message: Array,
  contact: Array,

});
const users = mongoose.model('users', usersSchema);

export default class UserModel {
  // 查找用户
  async findUser (accountNumber, password) {
    let res = await users.findOne({ accountNumber, password });
    return res || null;
  }
  // 存储用户
  async saveUser (data) {
    let newUsers = new users(data);
    await newUsers.save();
    return true;
  }

  // 填写信息
  async saveInfo (data) {
    let { accountNumber } = data;
    await users.update({ accountNumber }, data, err => {
      err && console.log(err);
    });
    return true;
  }

  // 与我相关

  async contact (time, accountNumber) {
    let data = await users.findOne({ accountNumber });
    if (!data.contact.find(i => i === time)) {
      data.contact = [ ...data.contact, time ];
    }
    await users.update({ accountNumber }, data, err => {
      err && console.log(err);
    });
    return true;
  }

  // 取消与我相关

  async cancleContact (time, accountNumber) {
    let data = await users.findOne({ accountNumber });
    data.contact = data.contact.filter(i => i !== time);
    await users.update({ accountNumber }, data, err => {
      err && console.log(err);
    });
    return true;
  }

  // 我的消息

  async message (messageContent) {
    const { accountNumber } = messageContent.messageTo;
    let data = await users.findOne({ accountNumber });
    data.message = [ ...data.message, messageContent ];
    await users.update({ accountNumber }, data, err => {
      err && console.log(err);
    });
    return true;
  }

  // 添加好友信息

  async addFriendMessage (messageContent) {
    const { accountNumber } = messageContent.messageTo;
    let data = await users.findOne({ accountNumber });
    data.message = [ ...data.message, messageContent ];
    await users.update({ accountNumber }, data, err => {
      err && console.log(err);
    });
    return true;
  }

  // 添加拒绝好友

  async addFriend (body) {
    const { time, user, friend, agree, messageContent } = body;
    let userData = await users.findOne({ accountNumber: user.accountNumber });
    let friendData = await users.findOne({ accountNumber: friend.accountNumber });
    let { message } = userData;
    // 修改信息
    const newMessage = message.map(i => {
      if (i.time === time) {
        i.agree = agree
      }
      return i;
    });
    userData.message = newMessage;
    // 添加好友
    if (agree) {
      userData.friend = [ ...userData.friend, friend ];
      friendData.friend = [ ...friendData.friend, user ];
    }
    friendData.message = [ ...friendData.message, messageContent ];
    await users.update({ accountNumber: user.accountNumber }, userData, err => {
      err && console.log(err);
    });
    await users.update({ accountNumber: friend.accountNumber }, friendData, err => {
      err && console.log(err);
    });
    return agree ? friendData : null;
  }

  // 获取我的消息
  async getMessage (accountNumber) {
    let data = await users.findOne({ accountNumber });
    return data.message;
  }

  // 获取与我相关

  async aboutMe (accountNumber) {
    let userData = await users.findOne({ accountNumber });
    return userData.contact;
  }

  // 删除好友

  async deleteFriend (body) {
    const { user, friend } = body;
    let userData = await users.findOne({ accountNumber: user.accountNumber });
    let friendData = await users.findOne({ accountNumber: friend.accountNumber });
    userData.friend = userData.friend.filter(i => i.accountNumber !== friend.accountNumber);
    friendData.friend = friendData.friend.filter(i => i.accountNumber !== userData.accountNumber);
    await users.update({ accountNumber: user.accountNumber }, userData, err => {
      err && console.log(err);
    });
    await users.update({ accountNumber: friend.accountNumber }, friendData, err => {
      err && console.log(err);
    });
    return true;
  }
  // 获取用户信息
  async getDetail (accountNumber) {
    let data = await users.findOne({ accountNumber });
    return data;
  }
};
