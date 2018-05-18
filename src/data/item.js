import mongoose from 'mongoose';


const itemsSchema = new mongoose.Schema({
  time: Number,
  author: Object,
  content: String,
  imgUrl: Array,
  like: Array,
  comment: Array
});
const items = mongoose.model('items', itemsSchema);

export default class ItemModel {
  // 查找信息
  async getItem (index) {
    let res = await items.find({},null,{sort:{time:-1}});
    const start = index * 5;
    const end = (++index) * 5;
    res = res.slice(start, end);
    console.log(res);
    return res || [];
  }
  // 存储动态
  async saveItem (data) {
    let Newitem = new items(data);
    await Newitem.save();
    let res = await items.find({},null,{sort:{time:-1}});
    return true;
  }

  // 点赞
  async itemLike (data) {
    let { time } = data;
    let res = await items.findOne({ time });
    delete data.time;
    res.like = [ ...res.like, data ];
    await items.update({ time }, res, err => {
      err && console.log(err);
    });
    return true;
  }

  // 取消点赞
  async itemCancleLike (data) {
    let { time } = data;
    let res = await items.findOne({ time });
    delete data.time;
    delete data.messageContent;
    res.like = res.like.filter(i => i && i.accountNumber !== data.accountNumber);
    await items.update({ time }, res, err => {
      err && console.log(err);
    });
    return true;
  }

  // 发布评论
  async itemComment (data) {
    let { time } = data;
    let res = await items.findOne({ time });
    delete data.time;
    delete data.messageContent;
    res.comment = [ ...res.comment, data ];
    await items.update({ time }, res, err => {
      err && console.log(err);
    });
    return true;
  }

  // 查找信息
  async getOneItem (time) {
    let res = await items.findOne({time});
    return res;
  }

  // 获取我发布的动态
  async myRelease (accountNumber) {
    let res = await items.find({"author.accountNumber": accountNumber});
    return res;
  }

};
