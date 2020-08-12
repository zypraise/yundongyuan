<template>
	<div>
		<div class="person-info-content">
			<div class="item">
				<label>手机号：</label>
				<div class="text">
					<input :value="mobiles" readonly="readonly" type="text" />
				</div>
			</div>
			<div class="item">
				<label>验证码：</label>
				<div class="text">
					<div class="get-code" v-on:click="getCode()">{{getCodeText}}</div>
					<input v-model="user.code" type="text" />
				</div>
			</div>
			<div class="item">
				<label>新手机号：</label>
				<div class="text">
					<input v-model="user.mobileNew" type="text" />
				</div>
			</div>
			<div class="item">
				<label>验证码：</label>
				<div class="text">
					<div class="get-code" v-on:click="getCodeNew()">{{getCodeTextNew}}</div>
					<input v-model="user.codeNew" type="text" />
				</div>
			</div>
		</div>

		<div style="text-align: center;margin-bottom: 50px;">
			<button class="person-but1" v-on:click="save()">绑定</button>
		</div>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {
				user: {
					mobile: '',
					mobileNew: '',
					code: '',
					codeNew: ''
				},
				isGetCode: false,
				isGetCodeNew: false,
				getCodeText: '获取验证码',
				getCodeTextNew: '获取验证码'
			}
		},
		watch: {},
		//计算属性
		computed: {
			mobiles:function(){
				var s = vm.user.mobile.substr(0,3) + '****' + vm.user.mobile.substr(7,4);
				return s;
			},
			valiDate: function() {}
		},
		methods: {
			start: function() {
				vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'));
			},
			save: function() {
				var _d = {
					PhoneNumber: vm.user.mobile,
					NewPhoneNumber: vm.user.mobileNew,
					VerifyCode: vm.user.code,
					NewVerifyCode: vm.user.codeNew
				}
				vm.$http.post(myPublic.publicUrl + '/API/Account/Verification', _d).then(function(result) {
					
						if (result.body.StateCode == 0) {
							window.myPublic.alertResult(result.body.Message);
							vm.user = {
								mobile: '',
								mobileNew: '',
								code: '',
								codeNew: ''
							};
						} else {
							window.myPublic.alertResult(result.body.Message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});





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
			 * 获取验证码
			 */
			getCodeNew: function() {
				if (vm.getCodeTextNew != '获取验证码')
					return;
				vm.isGetCodeNew = true;
				var i = 60;
				vm.getCodeTextNew = i + '重新发送';
				var _time = setInterval(function() {
					vm.getCodeTextNew = (--i) + '重新发送';
					if (i < 0) {
						clearInterval(_time);
						vm.getCodeTextNew = '获取验证码';
					}
				}, 1000);
			},
			getUserInfo: function(data) {
				vm.$http.get(myPublic.publicUrl + '/API/User/GetUserInfo', {
					headers: {
						token: data
					}
				}).then(function(result) {
					try {
						if (result.body.StateCode != 0) {
							vm.$router.push({
								path: '/login'
							});
						} else {
							window.localStorage.setItem('user', JSON.stringify(result.body.Data));
						}
					} catch (err) {
						vm.$router.push({
							path: '/login'
						});
					}
					
					var _u = JSON.parse(window.localStorage.getItem('user'));
					vm.user = {
								mobile: _u.PhoneNumber,
								mobileNew: '',
								code: '',
								codeNew: ''
							};
				}).catch(function(error) {
					console.log(error);
				});
			},
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			if (!window.localStorage.getItem('Sport_Access_Token')) {
				vm.$router.push({
					path: '/login'
				});
			}
			vm.start();
		}
	}
</script>

<style>

</style>
