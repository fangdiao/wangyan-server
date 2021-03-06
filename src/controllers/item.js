import ItemModel from '../data/item';
import UserModel from '../data/user';

const itemModel = new ItemModel();
const userModel = new UserModel();

export default class ItemController {

  // 填写信息
  async item (ctx, next) {
    let { body } = ctx.request;
    await itemModel.saveItem(body);
    ctx.body = {
      success: true
    };
    console.log('发布动态');
    await next();
  }

  // 获取信息

  async itemGet (ctx, next) {
    let { index } = ctx.request.body;
    const data = await itemModel.getItem(index);
    ctx.body = {
      success: true,
      data
    };
    console.log('首页获取信息');
    await next();
  }

  // 点赞

  async itemLike (ctx, next) {
    let { body } = ctx.request;
    await userModel.message(body.messageContent);
    await userModel.contact(body.time, body.accountNumber);
    await itemModel.itemLike(body);
    ctx.body = {
      success: true
    };
    console.log('点赞');
    await next();
  }

  // 取消点赞

  async itemCancleLike (ctx, next) {
    let { body } = ctx.request;
    await userModel.cancleContact(body.time, body.accountNumber);
    await itemModel.itemCancleLike(body);
    ctx.body = {
      success: true
    };
    console.log('取消点赞');
    await next();
  }

  // 评论

  async itemComment (ctx, next) {
    let { body } = ctx.request;
    await userModel.message(body.messageContent);
    await userModel.contact(body.time, body.accountNumber, body.messageContent);
    await itemModel.itemComment(body);
    ctx.body = {
      success: true
    };
    console.log('评论');
    await next();
  }

  // 获取与我相关

  async aboutMe (ctx, next) {
    let data = [];
    let { accountNumber } = ctx.request.body;
    const contact = await userModel.aboutMe(accountNumber);
    for (let i = 0; i < contact.length; i++) {
      const oneItem = await itemModel.getOneItem(contact[i]);
      data = [ ...data, oneItem ];
    }
    ctx.body = {
      success: true,
      data
    };
    console.log('获取与我相关的动态')
    await next();
  }
  // 获取我发布的动态
  async myRelease (ctx, next) {
    let { accountNumber } = ctx.request.body;
    const data = await itemModel.myRelease(accountNumber);
    ctx.body = {
      success: true,
      data
    };
    console.log('获取我发布的动态')
    await next();
  }

  // 删除动态

  async delete (ctx, next) {
    let { time } = ctx.request.body;
    await itemModel.delete(time);
    ctx.body = {
      success: true
    };
    console.log('删除我的动态');
    await next();
  }
};