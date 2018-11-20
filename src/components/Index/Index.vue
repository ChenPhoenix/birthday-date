<template>
    <div>
        <Header></Header>
        <div class="index">
            <p class="index-con">
                一个人吃饭，旅行，到处走走停停<br>
                一个人看电影<br>
                一个人玩游戏<br>
                一个人做很多事<br>
            </p>
            <p class="index-con">
                不是不怕寂寞<br>
                而是没有合适的人可以交流<br>
                我希望能找到可以聊得来的人<br>
                ---但总以失败告终<br>
            </p>
            <p class="index-con">
                同生缘让我们相聚<br>
                我们如同亲人<br>
                兄弟姐妹<br>
                你...在哪<br>
            </p>
        </div>
        <!--<Footer></Footer>-->

        <div id="footer-index">
            <router-link to="/register">
                <span class="register">我也要登记</span>
            </router-link>
        </div>
    </div>

</template>

<script>
    import Header from '../Header'
    import Footer from '../Footer'
    export default {
        name: "Index",
        components:{
            Header,
            Footer
        },
    }
</script>

<style scoped>
    .index{
        width:100%;
        /*padding:0.35rem 0;*/
        box-sizing: border-box;
        width: 100%;
        /*height: 9rem;*/
        padding: 0.7rem 0;
    }
    .index-con{
        color:#FD5B08;
        font-size: 0.35rem;
        font-family: '华文行楷';
        text-align: left;
        width:5.5rem;
        padding:0.35rem 0;
        margin:auto;
    }
    #footer-index {
        width:100%;
        height:0.88rem;
        background: #FDA7B8;
        color:#fff;
        font-size:0.3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        /*position: fixed;*/
        /*bottom:0;*/
        /*left:0;*/
        /*z-index: 2;*/
    }
    .register{
        color:#fff;
    }



</style>