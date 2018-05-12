import Router from "koa-router";
import UserController from '../controllers/user';
//引入数据存储
// var Wilddog = require("wilddog");
// var ref = new Wilddog("https://dffg-red.wilddogio.com/users");
//new 一个路由实例

// router.get("/", (ctx, next) => {
//   ctx.send(ctx, "index.html", { root: "static/" });
// });
const userController = new UserController();

export const routeFun = () => {
  let router = new Router({
    prefix: '/api'
  });

  // 用户登录
  router.post('/user/siginin', userController.siginIn);
  // 用户注册
  // router.post('/user/siginup',User.siginUp);
  // // 用户填写资料
  // router.post('/user/addmessage',User.addMessage);
  // // 用户修改资料
  // router.post('/user/changemessage',User.changeMessage);
  // // 关注用户
  // router.post('/user/follow/people',User.followPeople);
  // // 关注消息
  // router.post('/user/follow/message',User.followMessage);

  return router;
};