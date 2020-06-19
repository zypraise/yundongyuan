<template>
	<ul class="register-mian">
		<li>
			<label><span class="red-text">*</span>用户名：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="userName" placeholder="姓名拼音或姓名拼音+数字" />
				</div>
			</section>
			<p class="is" v-html="isUserName"></p>
		</li>
		<li>
			<label><span class="red-text">*</span>姓名：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="name" placeholder="姓名" />
				</div>
			</section>
			<p class="is" v-html="isName"></p>
		</li>
		<li>
			<label><span class="red-text">*</span>登录密码：</label>
			<section>
				<div class="inp">
					<input type="password" v-model="passWord" placeholder="密码" />
				</div>
			</section>
			<p class="is" v-html="isPassWord"></p>
		</li>
		<li>
			<label><span class="red-text">*</span>重复密码：</label>
			<section>
				<div class="inp">
					<input type="password" v-model="repeatPassWord" placeholder="重复密码" />
				</div>
			</section>
			<p class="is" v-html="isRepeatPassWord"></p>
		</li>
		<li>
			<label><span class="red-text">*</span>性别：</label>
			<section>
				<div class="inp">
					<select v-model="sex">
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
				</div>
			</section>
		</li>
		<li>
			<label><span class="red-text">*</span>手机号：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="mobile" placeholder="手机号" />
				</div>
			</section>
			<p class="is" v-html="isMobile"></p>
		</li>
		<li>
			<label><span class="red-text">*</span>验证码：</label>
			<section>
				<div class="inp">
					<div class="get-code" v-on:click="getCode()">{{getCodeText}}</div>
					<input type="text" v-model="code" placeholder="验证码" />
				</div>
			</section>
			<p class="is" v-html="isCode"></p>
		</li>
		<li>
			<label>运动员等级：</label>
			<section>
				<div class="inp">
					<select v-model="SportGrade">
						<option value="0">国际级运动健将</option>
						<option value="1">运动健将</option>
						<option value="2">一级运动员</option>
						<option value="3">二级运动员</option>
						<option value="4">三级运动员</option>
						<option value="5">其他</option>
					</select>
				</div>
			</section>
		</li>
		<li>
			<label><span class="red-text">*</span>运动项目：</label>
			<section>
				<div class="inp">
					<select v-model="trainFirse">
						<option value="">-运动项目-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangList" v-if="item.SystemId.length == 3">{{item.Name}}</option>
					</select>
				</div>
			</section>
			<p class="is" v-html="isTrainFirse"></p>
		</li>
		<li>
			<label><span class="red-text">*</span>训练开始时间：</label>
			<section>
				<div class="inp">
					<select v-model="startTime">
						<option v-for="i in 81" :value="i + 1949">{{i + 1949}}</option>
					</select>
				</div>

			</section>
			<p class="is" v-html="isStartTime"></p>
		</li>
		<li style="margin: 0px -25px;"><button class="register-but" v-on:click="register()">注册</button><button class="register-but"
			 v-on:click="login()">已有账号</button></li>
	</ul>
</template>

<script>
	var vm;

	function valiTime() {
		return new Promise((resolve, reject) => {
			if (window.t) {
				clearTimeout(window.t);
			}
			window.t = '';
			window.t = setTimeout(function() {
				resolve()
			}, 500)
		})
	}
	export default {
		props: [],
		data: function() {
			return {
				trainFirse: '', //专项父级
				zhuanxiangList: [], //项目列表
				userName: '',
				name: '',
				passWord: '',
				repeatPassWord: '',
				sex: '男',
				mobile: '',
				code: '',
				SportGrade: 0, //运动等级
				startTime: '',
				isUserName: '',
				isName: '',
				isPassWord: '',
				isRepeatPassWord: '',
				isMobile: '',
				isCode: '',
				isTrainFirse: '',
				isStartTime: '',
				isGetCode: false,
				getCodeText: '获取验证码'
			}
		},
		watch: {
			userName: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal != '') {
						vm.$http.get(myPublic.publicUrl + '/API/Account/UserNameExists', {
								params: {
									userName: newVal
								}
							}).then(function(result) {
								if (result.body.Data) {
									vm.isUserName = '用户名已被占用';
								} else {
									vm.isUserName = '';
								}
							})
							.catch(function(error) {
								console.log(error);
							});
					} else {
						vm.isUserName = '用户名不可为空'
					}
					window.t = '';
				})
			},
			name: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal == '') {
						vm.isName = '姓名不可为空';
					} else {
						vm.isName = '';
					}
					window.t = '';
				})
			},
			passWord: function(newVal, oldVal) {
				valiTime().then(() => {
					var reg = /[a-z]/; //正则表达式
					if (newVal == '') {
						vm.isPassWord = '密码不可为空';
					} else if (newVal.length < 6 || newVal.length > 20) {
						vm.isPassWord = '密码长度为6至20位之间';
					} else if (!reg.test(newVal)) { //正则验证不通过，格式不对
						vm.isPassWord = '密码至少包含1位小写字母';
					} else {
						vm.isPassWord = '';

					}
					window.t = '';
				});
			},
			repeatPassWord: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal == '') {
						vm.isRepeatPassWord = '密码不可为空';
					} else {
						vm.isRepeatPassWord = '';
					}
					window.t = '';
				});
			},
			mobile: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal == '') {
						vm.isMobile = '手机号不可为空';
					} else {
						vm.isMobile = '';
					}
					window.t = '';
				});
			},
			code: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal == '') {
						vm.isCode = '验证码不可为空';
					} else {
						vm.isCode = '';
					}
					window.t = '';
				})
			},
			trainFirse: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal == '') {
						vm.isTrainFirse = '运动项目不可为空';
					} else {
						vm.isTrainFirse = '';
					}
					window.t = '';
				})
			},
			startTime: function(newVal, oldVal) {
				if (newVal == '') {
					vm.isStartTime = '训练开始时间不得为空';
					return;
				} else {
					vm.isStartTime = '';
				}
				if (!isNaN(newVal)) {
					if (oldVal == 0) {
						vm.startTime = parseInt(newVal);
					}
					if (parseInt(newVal) > 9999 || parseInt(newVal) < 1000) {
						vm.isStartTime = '训练开始时间格式不正确';
					} else {
						vm.isStartTime = '';
					}
				} else {
					vm.startTime = oldVal;
				}
			}
		},
		//计算属性
		computed: {
			valiDate: function() {
				//用户名
				if (vm.userName == '') {
					vm.isUserName = '用户名不得为空';
				}
				//姓名
				if (vm.name == '') {
					vm.isName = '姓名不得为空';
				}
				//密码
				if (vm.passWord == '') {
					vm.isPassWord = '密码不得为空';
				}
				//重复密码
				if (vm.repeatPassWord == '') {
					vm.isRepeatPassWord = '重复密码不得为空';
				}
				if (vm.passWord && vm.repeatPassWord && vm.passWord != vm.repeatPassWord) {
					vm.isRepeatPassWord = '两次密码不一致';
				}

				//姓名
				if (vm.mobile == '') {
					vm.isMobile = '手机号不得为空';
				}
				//姓名
				if (vm.code == '') {
					vm.isCode = '验证码不得为空';
				}
				//开始时间
				if (vm.startTime == '') {
					vm.isStartTime = '训练开始时间不得为空';
				}
				if (parseInt(vm.startTime) > 9999 || parseInt(vm.startTime) < 1000) {
					vm.isStartTime = '训练开始时间格式不正确';
				}

				if (vm.isUserName || vm.isName || vm.isPassWord || vm.isRepeatPassWord || vm.isMobile || vm.isCode || vm.isTrainFirse ||
					vm.isStartTime) {
					return false;
				} else {
					return true;
				}

			},
		},
		methods: {
			start: function() {
				vm.GetAllTrain();
				vm.startTime = new Date().getFullYear();
			},
			/**
			 * 获取验证码
			 */
			getCode: function() {
				if (vm.mobile == '') {
					vm.isMobile = '验证码不得为空';
					return;
				} else {
					vm.isMobile = '';
				}
				if (vm.getCodeText != '获取验证码' || vm.mobile == '')
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

				vm.$http.post(myPublic.publicUrl + '/API/Account/SendCode2Phone', {
						PhoneNumber: vm.mobile
					}).then(function(result) {
						if (result.body.StateCode == 100) {} else if (result.body.StateCode == 0) {
							vm.$router.push({
								path: '/login'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//获取训练专项
			GetAllTrain: function() {

				vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllTrain', {
						params: {
							userName: ''
						}
					}).then(function(result) {
						if (result.body.StateCode == 0) {
							vm.zhuanxiangList = result.body.Data;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			register: function() {
				if (!vm.valiDate) {
					return;
				}
				vm.$http.post(myPublic.publicUrl + '/API/Account/Register', {
						Type: '教练',
						UserName: vm.userName,
						Sex: vm.sex,
						FullName: vm.name,
						SportGrade: vm.SportGrade, //运动等级
						TrainId: [vm.trainFirse], //训练项目
						PhoneNumber: vm.mobile,
						VerifyCode: vm.code,
						Start4Training: vm.startTime, //专训开始时间
						Password: vm.passWord,
						ConfirmPassword: vm.repeatPassWord,
					}).then(function(result) {
						if (result.body.StateCode == 0) {
							myPublic.alertResult('注册成功')
							vm.$router.push({
								path: '/login'
							});
						} else {
							myPublic.alertResult(result.body.Message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getUserInfo: function(data) {
				vm.$http.get(myPublic.publicUrl + '/API/User/GetUserInfo', {
						headers: {
							token: data.Token_Type + ' ' + data.Access_Token
						}
					}).then(function(result) {
						window.localStorage.setItem('user', JSON.stringify(result.body.Data));
						if (result.body.StateCode == 0) {
							vm.$router.push({
								path: '/person'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			login: function() {
				vm.$router.push({
					path: '/login'
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

<style>
</style>
