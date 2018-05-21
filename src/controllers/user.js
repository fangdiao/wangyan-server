import UserModel from '../data/user';
import ItemModel from '../data/item';

const userModel = new UserModel();
const itemModel = new ItemModel();

export default class UserController {
  // 登录
  async siginIn (ctx, next) {
    let { accountNumber, password } = ctx.request.body;
    const data = await userModel.findUser(accountNumber, password);
    if (data) {
      ctx.body = {
        success: true,
        data
      };
    } else {
      ctx.body = {
        success: false
      };
    }
    console.log(`用户${accountNumber}登录成功`);
    await next();
  }

  // 注册
  async siginUp (ctx, next) {
    let { accountNumber, password } = ctx.request.body;
    const data = await userModel.findUser(accountNumber);
    if (data) {
      ctx.body = {
        success: false
      };
    } else {
      await userModel.saveUser({ accountNumber, password });
      ctx.body = {
        success: true
      };
    }
    console.log(`用户${accountNumber}注册成功`);
    await next();
  }

  // 填写信息
  async info (ctx, next) {
    let { body } = ctx.request;
    await userModel.saveInfo(body);
    ctx.body = {
      success: true
    };
    console.log(`用户${body.accountNumber}填写信息成功`);
    await next();
  }

  // 添加好友信息

  async addFriendMessage (ctx, next) {
    let { body } = ctx.request;
    await userModel.addFriendMessage(body);
    ctx.body = {
      success: true
    };
    console.log(`用户添加好友信息`);
    await next();
  }

  // 添加好友
  async addFriend (ctx, next) {
    let { body } = ctx.request;
    const data = await userModel.addFriend(body);
    ctx.body = {
      success: true,
      data
    };
    console.log(`用户添加好友`);

    await next();
  }

  // 获取我的消息

  async getMessage (ctx, next) {
    let { accountNumber } = ctx.request.body;
    const data = await userModel.getMessage(accountNumber);
    ctx.body = {
      success: true,
      data
    };
    console.log(`获取用户信息`);

    await next();
  }

  // 删除好友
  async deleteFriend (ctx, next) {
    let { body } = ctx.request;
    await userModel.deleteFriend(body);
    ctx.body = {
      success: true
    };
    console.log(`用户删除好友`);
    await next();
  }
  // 获取用户详情
  async getDetail (ctx, next) {
    let { accountNumber } = ctx.request.query;
    const release = await itemModel.myRelease(accountNumber);
    let data = await userModel.getDetail(accountNumber);
    ctx.body = {
      success: true,
      data,
      release
    };
    console.log(`获取用户详情`);
    await next();
  }
};