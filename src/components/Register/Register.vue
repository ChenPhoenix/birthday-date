<template>
    <div>
        <Header></Header>
        <div id="content" class="reg-cont">
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>您的昵称：</span>

                <input type="text" v-model="nickname">
            </div>
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>您的性别：</span>
                    <input type="radio" id="xb1" value="1" v-model="sex">
                <label for="xb1">男</label>

                <input type="radio" id="xb2" value="2" v-model="sex">
                <label for="xb2">女</label>
            </div>
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>生日类型：</span>
                <input type="radio" id="sr2" value="2" v-model="type">
                <label for="sr2">公历（阳历）</label>
                <input type="radio" id="sr1" value="1" v-model="type">
                <label for="sr1">农历（阴历）</label>
            </div>
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>您的生日：</span>
                <div class="birthday-p">
                    <input type="text" readonly v-model="time">
                    <group>
                        <datetime :min-year="1900-1-1" :max-year="2200-12-31" class="birthday-c"  v-model="time"></datetime>
                    </group>
                </div>

            </div>
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>微信/QQ：</span>
                    <input type="text" v-model="Account">
            </div>
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>手机号码：</span>
                    <input id="number" type="text" v-model="number">
            </div>
            <div class="reg-row">
                <span class="reg-title"><em class="active">* </em>所在城市：</span>
                <div class="birthday-p">
                    <input type="text" v-model="cityname" placeholder="请选择地址">
                    <group  class="birthday-c">
                        <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" :hide-district="true"
                                   @on-shadow-change="onShadowChange" placeholder="请选择地址"></x-address>
                    </group>
                </div>

            </div>
            <div class="reg-row">
                <span class="reg-title"><em style="color:#fff;margin-right: 0.02rem;">* </em>自我介绍：</span>
            </div>
            <div class="reg-row-text">
                <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>

            </div>
        </div>
        <div id="popup">
            <div>
                <img style="width:1rem;height: 1rem" :src="zhaoimg" alt="">
                <p style="margin-top: 0.5rem">
                    {{message1}}<br>
                    {{message2}}<br>
                </p>
            </div>
        </div>

        <div id="footer" @click="postBirthday">
             <span class="register">提交信息</span>
        </div>
        <div id="zhao">
            <div>
                <img style="width:1rem;height: 1rem" :src="zhaoimg" alt="">
                <p style="margin-top: 0.5rem">
                    {{message1}}<br>
                    {{message2}}<br>
                </p>
            </div>
        </div>
    </div>

</template>

<script>
    import Header from '../Header'
    import Footer from '../Footer'
    import { Group, Cell,XAddress, Picker, ChinaAddressV4Data } from 'vux'
    export default {
        name: "Register",
        components:{
            Header,
            Footer,
            Group,
            Cell,
            Picker,
            XAddress

        },
        data:function(){
            return {
                nickname:'',
                sex:'',
                type:'',
                time: '1987-6-16',
                Account:'',
                number:'',
                cityname:[''],
                content:'',
                NowTime: Date.parse(new Date()),
                message1:'',
                message2:'',
                zhaoimg:'',
                value:[],
                title:'',
                addressData: ChinaAddressV4Data,
                showAddress: false
            }
        },
        methods:{
            // doShowAddress () {
            //     this.showAddress = true
            //     setTimeout(() => {
            //         this.showAddress = false
            //     }, 2000)
            // },
            onShadowChange (ids, names) {
                // console.log(ids, names)
                this.cityname=names[0]+" , "+names[1];
            },

            logHide (str) {
                // console.log('on-hide', str)
            },
            logShow (str) {
                // console.log('on-show')
            },
            postBirthday:function () {
                //表单验证
                var telReg = !!this.number.match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
                var nickname=!!this.nickname.match(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/);
                var Account=!!this.Account.match(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/);
                //如果手机号码不能通过验证
                if(this.number!==''&&telReg == false){
                    setTimeout(()=>{
                        document.getElementById('popup').style.display='none';
                        document.getElementById('content').style.display='block';

                    },2000);
                    this.message1='手机号格式不正确';
                    this.message2='请重新录入';
                    this.zhaoimg='../../../static/images/fail.png';
                    document.getElementById('popup').style.display='block';
                    document.getElementById('content').style.display='none';
                    return false;
                }
                if(this.nickname!==''&&nickname == false){
                    setTimeout(()=>{
                        document.getElementById('popup').style.display='none';
                        document.getElementById('content').style.display='block';
                    },2000);
                    this.message1='昵称输入不正确';
                    this.message2='只含有汉字、数字、字母、下划线';
                    document.getElementById('popup').style.display='block';
                    document.getElementById('content').style.display='none';
                    return false;
                }
                if(this.nickname!==''&&this.sex!==''&&this.type!==''&&this.time!==''&&this.Account!==''&&this.number!==''&&this.cityname!==''){
                    //判断是否重复
                    this.axios.get('/birthdayapi/select.php?',{
                        params:{
                            token:'918ae098a5046d7687b85e50330ea251',
                            time:'1542248054',
                            searchTime:'1542240000',
                            phone:this.number,
                        },
                    }).then((res) =>{
                        if(res.data[0].num>0){
                            setTimeout(()=>{
                                document.getElementById('popup').style.display='none';
                                document.getElementById('content').style.display='block';
                            },2000);
                            this.message1='您的手机号已被登记';
                            this.message2='请更换手机号登记';
                            this.zhaoimg='../../../static/images/fail.png';
                            document.getElementById('popup').style.display='block';
                            document.getElementById('content').style.display='none';
                        }else{
                            //将信息添加到后台
                            this.axios({
                                method:'post',
                                url:'/birthdayapi/insert.php',
                                data:this.qs.stringify(
                                    {    //这里是发送给后台的数据
                                        nickname:this.nickname,
                                        sex:this.sex,
                                        type:this.type,
                                        time:Date.parse(this.time)/1000,//生日时间
                                        Account:this.Account,
                                        number:this.number,
                                        city:this.cityname,
                                        content:this.content,
                                        NowTime:this.NowTime/1000,
                                        token:this.$md5((Date.parse(this.time)/1000).toString()+(this.NowTime/1000).toString()+'jsdhgsdhfgohsdoifghofdh')
                                    }
                                )
                            }).then((res,reject)=>{
                                setTimeout(()=>{
                                    document.getElementById('popup').style.display='none';
                                    document.getElementById('content').style.display='block';
                                    this.$router.push({path:'/list'});
                                },2000);
                                // console.log(res);
                                this.message1='您的信息已被记录';
                                this.message2='如有相同信息会尽快通知您';
                                this.zhaoimg='../../../static/images/succeed.png';
                                document.getElementById('popup').style.display='block';
                                document.getElementById('content').style.display='none';

                            })
                        }
                    })

                }else{
                    setTimeout(()=>{
                        document.getElementById('popup').style.display='none';
                        document.getElementById('content').style.display='block';
                    },2000);
                    this.message1='信息不完善';
                    this.message2='请完善您的信息';
                    this.zhaoimg='../../../static/images/fail.png';
                    document.getElementById('popup').style.display='block';
                    document.getElementById('content').style.display='none';
                }

            }
        },

    }
</script>

<style scoped>
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
        height: 8.5rem;
        display: none;
        padding-top: 2.5rem;
        box-sizing: border-box;
    }
    #footer {
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
    .reg-cont{
        display: flex;
        flex-direction: column;
        justify-content: left;
        text-align: left;
        width: 85%;
        margin:auto;
        box-sizing: border-box;
        padding: 1rem 0;
        /*height: 9rem;*/
    }
    .reg-title{
        font-size:0.3rem;
        color:#5e5d5d;
    }
    .reg-row{
        width:100%;
        height: 0.74rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .birthday-p{
        position: relative;
    }
    .birthday-p > div{
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        top: 0;
    }
    .reg-row-text{
        width:100%;
        height: 1rem;
    }
    .reg-row-text textarea{
        width:100%;
        height: 100%;
    }

</style>