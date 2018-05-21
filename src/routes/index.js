import Router from "koa-router";
import UserController from '../controllers/user';
import ItemController from '../controllers/item';
import multer from 'koa-multer';

const userController = new UserController();
const itemController = new ItemController();

const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, '../static')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
const upload = multer({ storage });

export const routeFun = () => {
  let router = new Router({
    prefix: '/api'
  });

  // 用户登录
  router.post('/user/siginin', userController.siginIn);
  // 用户注册
  router.post('/user/siginup', userController.siginUp);
  // 用户填写信息
  router.post('/user/info', userController.info);
  // 添加消息
  router.post('/user/addfriendmessage', userController.addFriendMessage);
  // router.post('/user/addmessage', userController.addMessage);
  // 添加好友 同意或拒绝
  router.post('/user/addfriend', userController.addFriend);
  // 获取我的消息
  router.post('/user/getmessage', userController.getMessage);
  //获取用户详情
  router.get('/user/detail', userController.getDetail);
  // 删除好友
  router.post('/user/deletefriend', userController.deleteFriend);

  // 与我相关
  router.post('/item/aboutme', itemController.aboutMe);
  // 删除动态
  router.post('/item/delete', itemController.delete);
  // 获取我发布的动态
  router.post('/item/myrelease', itemController.myRelease);
  // 发布动态
  router.post('/item/release', itemController.item);
  // 获取数据
  router.post('/item/get', itemController.itemGet);
  // 点赞
  router.post('/item/like', itemController.itemLike);
  // 取消点赞
  router.post('/item/canclelike', itemController.itemCancleLike);
  // 发布评论
  router.post('/item/comment', itemController.itemComment);
  // 上传文件
  router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = {
      avatar: ctx.req.file.filename
    }
    await next();
  });
  return router;
};
