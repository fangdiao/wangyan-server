import mongoose from 'mongoose';
import UserModel from '../data/user';

const users = mongoose.model('users');
const userModel = new UserModel();

export default class UserController {
  // 登录
  async siginIn (ctx, next) {
    let { name } = ctx.request.body;
    const data = await userModel.findUser(name);
    ctx.body = {
      success: true,
      data
    };
    await next();
  }
};