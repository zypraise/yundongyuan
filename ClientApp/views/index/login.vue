<template>
	<div id="index-login">
		<section class="login">
			<img class="login-type" v-if="loginType" v-on:click="loginType = false" src="../../assets/imgs/pc-login.png" />
			<img class="login-type" v-else v-on:click="loginType = true" src="../../assets/imgs/phone-login.png" />
			<div class="header">登录账号</div>
			<!-- PC 登录 -->
			<div class="inp" v-if="loginType">
				<div>
					<input type="text" v-model="userName" v-on:keyup.enter="login()" placeholder="用户名" />
				</div>
				<div>
					<input type="password" v-model="passWord" v-on:keyup.enter="login()" placeholder="密码" />
				</div>
				<section class="message">{{isMessage.UserName}}</section>
				<section class="message">{{isMessage.Password}}</section>
				<!-- <p>
					<input type="checkbox" value="yes" v-model="jiyi" v-on:change="jiyiChange()" /><span>记住用户</span>
				</p> -->
				<button v-on:click="login()">登录</button>
				<p>
					<span class="login-register" v-on:click="register()">注册</span><span class="login-register" v-on:click="forget()">忘记密码</span>
				</p>
			</div>

			<!-- 手机号登录 -->
			<div class="inp" v-else>
				<div>
					<input type="text" v-model="mobile" v-on:keyup.enter="loginByMobile()" placeholder="手机号" />
				</div>
				<div>
					<div class="get-code" v-on:click="getCode()">{{getCodeText}}</div>
					<input type="text" v-model="code" v-on:keyup.enter="loginByMobile()" maxlength="6" placeholder="验证码" />
				</div>
				<button v-on:click="loginByMobile()">登录</button>
				<p>
					<span class="login-register" v-on:click="register()">注册</span>
				</p>
			</div>

		</section>
	</div>
</template>
<script>
	var vm;
	export default {
		//变量
		data: function() {
			return {
				loginType: true,
				isMessage: {},
				jiyi: [], //记住密码
				userName: '',
				passWord: '',
				mobile: '',
				code: '',
				isGetCode: false,
				getCodeText: '获取验证码'
			}
		},
		//公共模板
		components: {},
		watch: {

		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				if (window.localStorage.getItem('Sport_jiyi')) {
					vm.jiyi = ['yes'];
					vm.userName = window.localStorage.getItem('Sport_jiyi');
					vm.passWord = window.localStorage.getItem('Sport_jiyiPass');
				} else {
					vm.jiyi = [];
				}
			},
			/**
			 * 获取验证码
			 */
			getCode: function() {
				if (vm.getCodeText != '获取验证码')
					return;
				vm.isGetCode = true;
				var i = 60;
				vm.getCodeText = i + '重新发送';
				var _time = setInterval(function() {
					vm.getCodeText = (--i) + '重新发送';
					if (i < 0) {
						clearInterval(_time);
						vm.getCodeText = '获取验证码';
					}
				}, 1000);
			},
			/**
			 * 忘记密码
			 */
			forget: function() {
				vm.$router.push({
					path: '/register'
				});
			},
			/**
			 * 记住用户
			 */
			jiyiChange: function() {
				console.log(vm.jiyi);
				if (vm.jiyi.length > 0) {
					window.localStorage.setItem('Sport_jiyi', vm.userName);
					window.localStorage.setItem('Sport_jiyiPass', vm.passWord);
				} else {
					window.localStorage.removeItem('Sport_jiyi', vm.userName);
					window.localStorage.removeItem('Sport_jiyiPass', vm.passWord);
				}
			},
			/**
			 * 登录
			 */
			login: function() {
				vm.$http.post(myPublic.publicUrl + '/API/Account/Login', {
						'UserName': vm.userName,
						'Password': vm.passWord
					}).then(function(result) {
						if (result.body.Message == "登录成功") {
							window.localStorage.setItem('Sport_Access_Token', result.body.Data.Token_Type + ' ' + result.body.Data.Access_Token);
							window.localStorage.setItem('Sport_userType', result.body.Data.RoleName);
							window.localStorage.setItem('Sport_userPicture', window.myPublic.publicUrl + result.body.Data.Picture ? result
								.body.Data.Picture : '/web/wwwroot/dist/images/person.png');
							vm.getUserInfo(result.body.Data);
						} else {
							vm.isMessage = result.body.ErrorMessges;
							window.myPublic.alertResult(result.body.Message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			/**
			 * 手机号登录
			 */
			loginByMobile: function() {
				if (!vm.isGetCode)
					myPublic.alertResult('请先发送验证码');
					
			},
			/**
			 * 获取用户权限
			 * @param {Object} data
			 */
			getUserInfo: function(data) {
				vm.$http.get(myPublic.publicUrl + '/API/User/GetUserInfo', {
						headers: {
							token: data.Token_Type + ' ' + data.Access_Token
						}
					}).then(function(result) {
						window.localStorage.setItem('user', JSON.stringify(result.body.Data));
						if (result.body.StateCode == 0) {
							if (window.localStorage.getItem('Sport_userType') == '运动员') {
								// if(result.body.Data.CoachId){
								vm.$router.push({
									path: '/subjective'
								});
								// }else{
									// vm.$router.push({
									// 	path: '/choiceRegister'
									// });
								// }
							} else {
								vm.$router.push({
									path: '/allSubjective'
								});
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			/**
			 * 忘记密码
			 */
			forget: function() {
				vm.$router.push({
					path: '/forget'
				});
			},
			/**
			 * 注册
			 */
			register: function() {
				vm.$router.push({
					path: '/register'
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>
