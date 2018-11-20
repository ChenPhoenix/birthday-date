# birthday-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# birthday-date
# 项目上线时，请求接口中的api要去掉，
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
                            })
# 本地测试时，请求接口中的api要保留
 this.axios({
                                method:'post',
                                url:'/api/insert.php',
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
                            })
