[![4uLP10.png](https://z3.ax1x.com/2021/09/17/4uLP10.png)](https://imgtu.com/i/4uLP10)
# lite在线直播平台前端
一个基于 Elementui 和 vue2 构建的小型在线直播平台前端，支持：
- rtmp、hls直播
- 一起看（视频转直播流）
- 视频点播（flv、mp4）
- 直播回放
- 登陆注册
- 直播间排行榜、礼物排行榜、直播间聊天、送礼物、动态
- 后台用户管理、开播申请、开播管理、角色管理、动态管理、权限管理、礼物管理、举报管理、一起看管理、点播管理等

后端地址：[https://gitee.com/memorykk/lite-live-streaming-platform](https://gitee.com/memorykk/lite-live-streaming-platform)
# install
```shell
git clone
npm install
npm install --save goeasy
```
1. 修改 vue.config.js 中的 devServer.target 为后端服务器地址；
2. 若需要聊天区，需要修改 main.js 中的 goEasy.appkey 为自己的 common key；
3. 访问地址：[http://localhost:3000](http://localhost:3000)
# run
```shell
npm run dev
```
# build
```shell
npm run build:prod
```
# dependency
- [ckplayer播放器](https://gitee.com/niandeng/ckplayer/)
- [GoEasy聊天](https://gitee.com/goeasy-io/GoEasyDemo-Vue-LiveChatRoom)

# contributer
[![4uLV74.png](https://z3.ax1x.com/2021/09/17/4uLV74.png)](https://imgtu.com/i/4uLV74)