<template>
    <div class="chat-room">
        <div class="online-avatar-container">
            <div class="online-avatar-item" v-for="(user, key) in currentRoom.onlineUsers.users"
                 :key="key"
                 :style="realignAvatar(key)">
                <img :src="user.avatar" />
            </div>
        </div>
        <div class="chat-room-container">
            <div class="chat-room-content" ref="myscroll">
                <div class="message-box" v-for="(message, key) in currentRoom.messages"
                     :key="key"
                     :id="'message-box'+ key">
                    <div class="message-item">
                        <span class="user-name">{{message && message.senderNickname}}:</span>
                        <span :class="message.senderUserId == currentRoom.currentUser.id ? 'user-message self' : 'user-message' ">
                            {{message && message.content}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="chat-room-action">
                <div class="message-input-box">
                    <input class="message-input" :value="newMessageContent"
                           placeholder="说点什么..."
                           @input="onInputMessage"/>
                    <div class="message-btn" @click="sendMessage(MessageType.CHAT, newMessageContent)">↑</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatRoom",
        data() {
            return {
                currentRoom: null,
                propDisplay: {
                    showPropType: 0,
                    play: false,
                    timer: null
                },
                newMessageContent: "",
                // 道具类型
                Prop: {
                    HEART: 0,//桃心
                    ROCKET: 1//火箭
                },
                // 消息类型
                MessageType: {
                    CHAT: 0,//文字聊天
                    PROP: 1//道具
                }
            }
        },
        beforeMount() {
            // this.roomToken = {
            //     roomId: room.roomId,
            //     roomName: room.name,
            //     userId: (Math.random() * 1000).toString(),
            //     nickname: this.nickname,
            //     avatar: this.selectedAvatar.imgUrl
            // };
            // this.$router.push({
            //     path: '/chatRoom',
            //     query: this.roomToken
            // })


            // 初始化room
            let roomToken = this.$route.query;
            this.currentRoom = {
              roomId: roomToken.roomId, //房间ID
              roomName: roomToken.roomName, //房间名
              onlineUsers: {
                count: 0,
                users: []
              },
              messages: [],
              currentUser: {
                id: roomToken.userId,   //用户id
                nickname: roomToken.nickname,   //用户名
                avatar: roomToken.avatar    //用户头像
              }
            };
            // 连接goEasy
            this.connectGoEasy();
            // 监听用户上下线
            this.listenUsersOnlineOffline();
            // 监听新消息
            this.listenNewMessage();
        },
        destroyed() {
            this.quitRoom();
        },
        methods: {
            // 连接goEasy
            connectGoEasy(){
                let self = this;
                let userData = {
                    avatar: this.currentRoom.currentUser.avatar,
                    nickname: this.currentRoom.currentUser.nickname
                }
                this.goEasy.connect({
                    id : this.currentRoom.currentUser.id,
                    data : userData,
                    onSuccess: function(){
                        console.log("GoEasy connect successfully.");
                        // 加载在线用户列表
                        self.loadOnlineUsers();
                        // 加载最后10条消息历史
                        self.loadHistory();
                    },
                    onFailed: function(error){
                        console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
                    },
                    onProgress: function(attempts){
                        console.log("GoEasy is connecting", attempts);
                    }
                });
            },
            // 监听用户上下线
            listenUsersOnlineOffline(){
                let self = this;
                let roomId = this.currentRoom.roomId;
                this.pubSub.subscribePresence({
                    channel: roomId,
                    onPresence: function (presenceEvents) {
                        self.currentRoom.onlineUsers.count = presenceEvents.clientAmount;
                        presenceEvents.events.forEach(function (event) {
                            let userData = event.data;
                            if (event.action === "join" || event.action === "online") {
                                //进入房间
                                let userId = event.id;
                                let avatar = userData.avatar;
                                let nickname = userData.nickname;
                                let user = {
                                    id: userId,
                                    avatar:avatar,
                                    nickname: nickname
                                };
                                //添加新用户
                                self.currentRoom.onlineUsers.users.push(user);
                                //添加进入房间的消息
                                let message = {
                                    content: " 进入房间",
                                    senderUserId: userId,
                                    senderNickname: nickname,
                                    type: self.MessageType.CHAT
                                };
                                self.currentRoom.messages.push(message);
                            } else {
                                //退出房间
                                self.currentRoom.onlineUsers.users.forEach((user, index) => {
                                    if (event.id === user.id) {
                                        // 删除当前聊天室列表中离线的用户
                                        let offlineUser = self.currentRoom.onlineUsers.users.splice(index, 1);
                                        let message = {
                                            content: " 退出房间",
                                            senderUserId: offlineUser[0].id,
                                            senderNickname: offlineUser[0].nickname,
                                            type: self.MessageType.CHAT
                                        };
                                        self.currentRoom.messages.push(message);
                                    }
                                });
                            }
                            self.$nextTick(() => {
                                self.$refs.myscroll.scrollTo(0, self.$refs.myscroll.scrollHeight)
                            })
                        });
                    },
                    onSuccess: function () {
                        console.log("用户上下线监听成功")
                    },
                    onFailed: function (error) {
                        if (error.code === 401) {
                            console.log("监听用户上下线失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
                        } else {
                            console.log("监听用户上下线失败, code:" + error.code + ",content:" + error.content);
                        }
                    }
                })
            },
            // 监听新消息
            listenNewMessage(){
                // 监听当前聊天室的消息
                let self = this;
                let roomId = this.currentRoom.roomId;
                this.pubSub.subscribe({
                    channel: roomId,
                    onMessage : function (message) {
                        let messageContent = "";
                        let content = JSON.parse(message.content);
                        //聊天消息
                        if(content.type === self.MessageType.CHAT) {
                            messageContent = content.content;
                        }
                        //道具消息
                        if(content.type === self.MessageType.PROP) {
                            if (content.content === self.Prop.ROCKET) {
                                messageContent = "送出了一枚大火箭";
                            }
                            if (content.content === self.Prop.HEART) {
                                messageContent = "送出了一个大大的比心";
                            }
                        }
                        //添加消息
                        let newMessage = {
                            content: messageContent,
                            senderUserId: content.senderUserId,
                            senderNickname: content.senderNickname,
                            type: self.MessageType.CHAT
                        };
                        self.currentRoom.messages.push(newMessage);
                        if (content.type === self.MessageType.PROP) {
                            self.propAnimation(parseInt(content.content))
                        }
                        self.$nextTick(() => {
                            self.$refs.myscroll.scrollTo(0, self.$refs.myscroll.scrollHeight)
                        })
                    },
                    onSuccess : function () {
                        console.log("监听新消息成功")
                    },
                    onFailed : function(error) {
                        console.log("订阅消息失败, code:"+error.code+ ",错误信息:"+error.content);
                    }
                })
            },      
            // 加载在线用户列表
            loadOnlineUsers(){
                let self = this;
                let roomId = this.currentRoom.roomId;
                this.pubSub.hereNow({
                    channels : [roomId],
                    includeUsers : true,
                    distinct : true,
                    onSuccess:function (result) {
                        let users = [];
                        let currentRoomOnlineUsers = result.content.channels[roomId];
                        currentRoomOnlineUsers.users.forEach(function(onlineUser) {
                            let userData = onlineUser.data;
                            let user = {
                                id: onlineUser.id,
                                nickname: userData.nickname,
                                avatar: userData.avatar
                            };
                            users.push(user);
                        });
                        self.currentRoom.onlineUsers = {
                            users: users,
                            count: currentRoomOnlineUsers.clientAmount
                        };
                    },
                    onFailed: function (error) {
                        //获取失败
                        if(error.code === 401){
                            console.log("获取在线用户失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
                        }else{
                            console.log("获取在线用户失败, code:" + error.code + ",错误信息:" + error.content);
                        }
                    }
                })
            },
            // 加载最后10条消息历史
            loadHistory(){
                let self = this;
                let roomId = this.currentRoom.roomId;
                this.pubSub.history({
                    channel: roomId, //必需项
                    limit: 10, //可选项，返回的消息条数
                    onSuccess:function(response) {
                        let messages = [];
                        response.content.messages.map(message => {
                            let historyMessage = JSON.parse(message.content);
                            //道具消息
                            if (historyMessage.type === self.MessageType.PROP) {
                                if (historyMessage.content === self.Prop.ROCKET) {
                                    historyMessage.content = "送出了一枚大火箭";
                                }
                                if (historyMessage.content === self.Prop.HEART) {
                                    historyMessage.content = "送出了一个大大的比心";
                                }
                            }
                            messages.push(historyMessage);
                        });
                        self.currentRoom.messages = messages;
                    },
                    onFailed: function (error) {
                        //获取失败
                        if(error.code === 401){
                            console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
                        }else{
                            console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
                        }
                    }
                });
            },
            realignAvatar(key) {//排列头像
                let len = this.currentRoom.onlineUsers.users.length-1;
                if(key!== len) {
                    let p = (len - key+1)*0.1 +'rem';
                    return {
                        transform:'translateX('+ p +')',
                        zIndex : 100-key
                    }
                }
            },
            onInputMessage(event) {//双向绑定消息 兼容
                this.newMessageContent = event.target.value;
            },
            sendMessage(messageType, content) {
                //发送消息
                if (content === "" && messageType === this.MessageType.CHAT){
                    return;
                }
                let message = {
                    senderNickname: this.currentRoom.currentUser.nickname,
                    senderUserId: this.currentRoom.currentUser.id,
                    type: messageType,
                    content: content
                };
                this.pubSub.publish({
                    channel : this.currentRoom.roomId,
                    message : JSON.stringify(message),
                    onSuccess : function () {
                        console.log("发送成功");
                    },
                    onFailed : function (error) {
                        console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
                    }
                });
                this.newMessageContent = "";
            },
            propAnimation(type) {//道具动画
                //动画的实现，可以不用关心
                if (this.propDisplay.timer) {
                    return;
                }
                this.propDisplay.showPropType = type;
                this.propDisplay.play = true;
                this.propDisplay.timer = setTimeout(() => {
                    this.propDisplay.play = false;
                    this.propDisplay.timer = null;
                }, 2000)
            },
            quitRoom () {
                let self = this;
                this.goEasy.disconnect({
                    onSuccess(){
                        self.$router.push({
                            name: "login"
                        });
                        console.log("GoEasy disconnect successfully");
                    },
                    onFailed(error){
                        console.log("GoEasy disconnect failed"+JSON.stringify(error));
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .chat-room {
        width: 100%;
        flex-direction: column;
        height: 100%;;
        position: relative;
    }

    .header{
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.24rem;
        color: #D02129;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        background: #fff;
    }
    .quit-btn{
        position: absolute;
        right: 0.1rem;
        color: #999;
    }

    .online-avatar-container {
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        justify-content: flex-end;
        box-shadow: 0.05rem 0.15rem 0.25rem #fff;
        z-index: 40;
        padding: 0 0.1rem;
        position: fixed;
        top:0.9rem;
        right: 0;
        width: 100%;
        background: #fff;
    }

    .online-avatar-item {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.2rem;
        text-align: center;
        line-height: 0.4rem;
        background: rgba(51, 51, 51, 0.3);
        color: #fff;
        font-size: 0.14rem;
    }

    .online-count {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.4rem;
        text-align: center;
        background: rgba(51, 51, 51, 0.3);
        color: #fff;
        font-size: 0.14rem;
    }

    .online-avatar-item img {
        width: 0.4rem;
        height: 0.4rem;
    }

    .chat-room-container {
        flex-direction: column;
        padding: 1.3rem 0.2rem 0.66rem 0.2rem ;
        overflow: hidden;
        width:100%;
        height: 100%;
    }

    .chat-room-content {
        width: 100%;
        overflow: auto;
        height: 100%;
    }

    .message-box {
        margin-top: 0.08rem;
        display: flex;
    }

    .message-item {
        box-sizing: border-box;
        height: 0.36rem;
        background-color: rgba(196, 196, 196, 0.2);
        font-size: 0.14rem;
        border-radius: 0.5rem;
        padding: 0.09rem 0.15rem;
        font-family: Microsoft YaHei UI;
    }

    .user-name {
        color: #D02129;
        font-family: Microsoft YaHei UI;
    }

    .user-message {
        color: #333;
        font-family: Microsoft YaHei UI;
    }

    .chat-room-action {
        height: 0.66rem;
        line-height: 0.46rem;
        padding:0.1rem 0.14rem;
        display: flex;
        background: #ffffff;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
    }
    .message-input-box{
        flex-grow: 1;
        display: flex;
        position: relative;
    }

    .message-input {
        background-color: rgba(51, 51, 51, 0.1);
        border-radius: 0.5rem;
        box-sizing: border-box;
        font-size: 0.14rem;
        padding: 0.13rem 0.2rem;
        flex: 1;
        border: 0;
        outline: none;
    }

    .message-btn {
        position: absolute;
        width: 0.36rem;
        height: 0.36rem;
        background: #D02129;
        right: 0.05rem;
        top: 0.05rem;
        border-radius: 0.36rem;
        text-align: center;
        line-height: 0.36rem;
        color: #fff;
        font-weight: bold;
        font-size: 0.16rem;
    }

    .heart {
        width: 0.4rem;
        height: 0.46rem;
    }

    .rocket {
        width: 0.2rem;
        height: 0.46rem;
    }

    .self {
        color: #D02129;
    }

    .show-animation {
        width: 0.4rem;
        height: 1.6rem;
        position: fixed;
        z-index: 44;
        left: 50%;
        bottom: 0.4rem;
        margin: 0 -0.2rem;
        justify-content: flex-end;
        animation: myanimation 2s linear;
        display: flex;
        flex-direction: column;
    }

    .prop-hearts {
        display: flex;
        flex-direction: column;
    }

    .prop-heart {
        height: 0.4rem;
        width: 0.4rem;
    }

    .prop-rocket {
        height: 0.8rem;
        width: 0.4rem;
    }

    @keyframes myanimation {
        from {
            bottom: 0.4rem;
        }
        to {
            bottom: 3rem;
        }
    }
</style>