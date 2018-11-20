<template>
    <div id="list">
        <Header></Header>
        <div id="search-id">
            <div class="search-box">
                <div class="search-left">
                    <img class="search-img" src="../../../static/images/search.png" alt="">
                    <div class="birthday-time">
                        <input type="text" readonly placeholder="请选择您的生日日期" v-model="value">
                        <group>
                            <datetime :min-year="1900-1-1" :max-year="2200-12-31" class="birthday-c" v-model="value"></datetime>
                        </group>
                    </div>
                </div>
                <button class="search-btn" @click="getBirthday" >搜索一下</button>
            </div>
            <div class="line"></div>
        </div>
        <div id="popup">
            <div>
                <img style="width:auto;height: 1rem" src="../../../static/images/no-search.png" alt="">
                <p style="margin-top: 0.5rem">
                    抱歉<br>
                    {{message1}}<br>
                    <router-link to="/register">
                        <span class="register">{{message2}}</span>
                    </router-link>

                </p>
            </div>
        </div>
        <ul id="lists" class="list-ul">
            <li class="list-li" v-for="data in this.datas">

                <template v-if="data.tsex==1">
                    <div class="list-left">
                        <img  class="list-head" src="../../../static/images/girl.png" alt="">
                        <div class="list-font">
                            <p>{{data.tjieshao}}</p>
                            <p>{{data.tcity}}</p>
                        </div>
                    </div>

                    <div class="list-right">
                        <img class="list-head-icon" src="../../../static/images/girl-icon.png" alt="">
                        <p>{{data.tshengri}}</p>
                    </div>
                </template>
                <template v-if="data.tsex==2">
                    <div class="list-left">
                        <img  class="list-head" src="../../../static/images/boy.png" alt="">
                        <div class="list-font">
                            <p>{{data.tjieshao}}</p>
                            <p>{{data.tcity}}</p>
                        </div>
                    </div>

                    <div class="list-right">
                        <img class="list-head-icon" src="../../../static/images/boy-icon.png" alt="">
                        <p>{{data.tshengri}}</p>
                    </div>
                </template>
                <!--{data.tsex==1?``: ``}-->
            <!--<li class="list-li">-->

            </li>
            <!--<li class="list-li">-->
                <!--<div class="list-left">-->
                    <!--<img  class="list-head" src="../../../static/images/boy.png" alt="">-->
                    <!--<div class="list-font">-->
                        <!--<p>fadsf</p>-->
                        <!--<p>fdasf</p>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="list-right">-->
                    <!--<img class="list-head-icon" src="../../../static/images/boy-icon.png" alt="">-->
                    <!--<p>城市</p>-->
                <!--</div>-->
            <!--</li>-->
        </ul>
        <div id="footer-index">
            <router-link to="/register">
                <span class="register">我也要登记</span>
            </router-link>
        </div>
        <div id="zhao">
            <div>
                <img style="width:auto;height: 1rem" src="../../../static/images/no-search.png" alt="">
                <p style="margin-top: 0.5rem">
                    抱歉<br>
                    {{message1}}<br>
                    {{message2}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header'
    import { Group, Cell } from 'vux';
    import { Picker } from 'vux';
    export default {
        name: "List",
        components:{
            Header,
            Group,
            Cell,
            Picker
        },
        data:function(){
            return {
                datas:[],
                value:'1987-6-16',
                NowTime: Date.parse(new Date()),
                message1:'',
                message2:'',


            }
        },
        computed: {
            // 计算属性的 getter
            changeValue: function () {
                // `this` 指向 vm 实例
                return this.value
            }
        },
        methods:{

            getBirthday:function () {
                var btday=this.value;
                var btdaytime=(Date.parse(btday) / 1000).toString();//生日时间
                var Newtime=(this.NowTime / 1000).toString();//当前时间
                var tokenJoin=btdaytime+Newtime+'skdhfohdofhvodfihoidf';

                if(this.value!==''){
                    this.axios.get('/birthdayapi/select.php?',{
                        params:{
                            token:this.$md5( tokenJoin),
                            time:Newtime,
                            searchTime:btdaytime,
                            // photo:'15364926613',
                        },
                    }).then((res) =>{
                        this.datas=res.data[0];
                        if(this.datas.length==0){
                        //     setTimeout(()=>{
                        //         document.getElementById('popup').style.display='none';
                        //         // this.$router.push({path:'/register'});
                        // },2000);
                            this.message1='生日库中暂时没有匹配数据';
                            this.message2='请立即登记';
                            this.zhaoimg='../../../static/images/succeed.png';
                            document.getElementById('popup').style.display='block';
                            document.getElementById('footer-index').style.display='flex';
                            document.getElementById('lists').style.display='none';
                        }else{
                            document.getElementById('popup').style.display='none';
                            document.getElementById('lists').style.display='block';
                            document.getElementById('footer-index').style.display='none';
                        }

                    })
                }else{
                    setTimeout(()=>{
                        document.getElementById('popup').style.display='none';
                        document.getElementById('lists').style.display='block';
                        document.getElementById('footer-index').style.display='none';
                    },2000);
                    this.message1='未选择搜索日期';
                    this.message2='请选择的日期';
                    this.zhaoimg='../../../static/images/fail.png';
                    // console.log(res);
                    document.getElementById('popup').style.display='block';
                    document.getElementById('lists').style.display='none';
                    document.getElementById('footer-index').style.display='none';
                }

            },

        },

    }
</script>

<style scoped>
    #search-id{
        width:100%;
        height:auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*position: fixed;*/
        flex-direction: column;
        /*top:4.58rem;*/

        background: #fff;
        left: 0;
        z-index: 2;
        padding-top: 0.5rem;
        box-sizing: border-box;
    }
    #zhao{
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(80, 79, 79, 0.7);
        z-index: 10;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size:0.3rem;

    }
    #popup{
        width: 100%;
        justify-content: center;
        align-items: center;
        color: #000;
        font-size:0.3rem;
        line-height: 1.6;
        /*height: 8.5rem;*/
        display: none;
        padding-top: 1rem;
        box-sizing: border-box;
    }

    #list{
        /*padding:0.35rem 0;*/
        box-sizing: border-box;
    }
    .search-box{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-box .search-img{
        width: 0.5rem;
        margin-left: 0.2rem;
    }
    .birthday-time{
        width:2.9rem;
        height: 0.55rem;
        position: relative;
    }
    .birthday-time input{
        margin-left:0;
        width: 100%;
        border: 0;
        height: 100%;
    }
    .birthday-time > div{
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        top: 0;
    }
    .search-btn{
        outline: none;
        background: #FDA7B8;
        border:0;
        color:#fff;
        font-size:0.24rem;
        width:1.6rem;
        height: 0.58rem;
    }
    .search-left{
        border-top:1px solid #000;
        border-left:1px solid #000;
        border-bottom:1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .line{
        width:90%;
        height: 2px;
        background: #f1f1f1;
        margin:0.4rem auto;
    }
    .list-ul{
        width:80%;
        margin:auto;
        /*min-height: 8.5rem;*/
        /*margin-top: 1.6rem;*/
    }
    .list-li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ccc;
        margin-bottom: 0.2rem;
        padding: 0.2rem;
        box-sizing: border-box;
        height: 1.28rem;
    }
    .list-left{
        display: flex;
    }
    .list-head{
        width: 0.95rem;
        height: 0.95rem;
        margin-right: 0.5rem;
    }
    .list-head-icon{
        width:0.35rem;
        height: 0.35rem;
    }
    .list-font{
        font-size: 0.2rem;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .list-right{
        height: 0.95rem;
        font-size: 0.2rem;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    #footer-index {
        display: flex;
        width:100%;
        height:0.88rem;
        background: #FDA7B8;
        color:#fff;
        font-size:0.3rem;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        bottom:0;
        left:0;
        z-index: 2;
    }
    .register{
        color:#fff;
    }

</style>