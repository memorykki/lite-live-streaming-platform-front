<template>
    <div id="video"></div>
</template>

<script>

export default {

    data() {
        return{
            roompath: '',
            videoObject: {
                width: "100%", // 宽度，也可以支持百分比(不过父元素宽度要有)
                height: "100%", // 高度，也可以支持百分比
                container: "#liveVideo", //“#”代表容器的ID，“.”或“”代表容器的class
                variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
                autoplay: true, //自动播放
                live: true,
                video: "" //视频地址(必填)
            }

        }
    },
    name: 'Player',
    mounted() {
        
    }
}
</script>