<template>
    <div id="header">
        <div class="head-content">
            <router-link to="/">
             <img class="bg" src="../../static/images/bg.jpg" alt=""></router-link>
            <h1 class="title1">同生缘BIRTHDAY</h1>
            <div class="title2">
                <img class="title2-img"  src="../../static/images/num.png" alt="">
                <p>截止目前，已录入<span class="total">{{num}}</span>条生日信息</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data:function(){
            return {
                num:'',
            }
        },
        created:function () {
            this.axios.get('/birthdayapi/select.php?',{
                params:{
                    token:'4a7d3e6dca5a2051636b37f1bbb20fa0',
                    time:'1542190225',
                    searchTime:'1542153600',
                },
            }).then((res) =>{
                this.num=parseInt(res.data[2][0].num)+1000;
            })
        }
    }
</script>

<style scoped>
    #header{
        width:100%;
        height:auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*position: fixed;*/
        /*top:0;*/
        /*left: 0;*/
        /*z-index: 2;*/
    }
    .bg{
        width:100%;
    }
    .head-content{
        position:relative;
        width:100%;
        height:auto;
    }
    .title1{
        width:100%;
        position:absolute;
        z-index:3;
        top:0.8rem;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.3rem;
        color:#fff;
    }
    .title2{
        width:100%;
        position:absolute;
        z-index:3;
        bottom:0.8rem;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:0.2rem;
        color:#FD5B08;
    }
    .title2-img{
        width:0.3rem;
        height: auto;
    }
    .total{
        color:#fff;
    }

</style>