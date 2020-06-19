<template>
	<div id="index-forget">
		<header-component></header-component>
		<section class="forget">
			<p class="forget-header">忘记密码</p>
			<ul class="forget-mian">
				<li>
					<label><span class="red-text">*</span>手机号：</label>
					<section>
						<div class="inp">
							<input type="text" v-model="mobile" placeholder="注册手机号" />
						</div>
					</section>
					<p class="is" v-html="isMobile"></p>
				</li>
				<li>
					<label><span class="red-text">*</span>验证码：</label>
					<section>
						<div class="inp">
							<div class="get-code" v-on:click="getCode()">{{getCodeText}}</div>
							<input type="text" v-model="code" maxlength="6" placeholder="验证码" />
						</div>
					</section>
					<p class="is" v-html="isCode"></p>
				</li>

				<li>
					<label><span class="red-text">*</span>密码：</label>
					<section>
						<div class="inp">
							<input type="password" v-model="password" placeholder="密码" />
						</div>
					</section>
					<p class="is" v-html="isPassword"></p>
				</li>

				<li>
					<label><span class="red-text">*</span>确认密码：</label>
					<section>
						<div class="inp">
							<input type="password" v-model="newpassword" placeholder="确认密码" />
						</div>
					</section>
					<p class="is" v-html="isNewpassword"></p>
				</li>

				<li style="margin: 0px -25px;"><button class="forget-but" v-on:click="forget()">找回密码</button><button class="back-but"
					 v-on:click="back()">返回</button></li>
			</ul>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	export default {
		//变量
		data: function() {
			return {
				mobile: '',
				code: '',
				password: '',
				newpassword: '',

				isMobile: '',
				isCode: '',
				isPassword: '',
				isNewpassword: '',

				isGetCode: false,
				getCodeText: '获取验证码'
			}
		},
		//公共模板
		components: {
			headerComponent: header
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {},
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
			 * 找回密码
			 */
			forget: function() {
				var _d = {
					PhoneNumber: vm.mobile, //手机号
					VerifyCode: vm.code, //验证码
					Password: vm.password, //新密码
					ConfirmPassword: vm.newpassword //确认新密码
				};
				vm.$http.post(myPublic.publicUrl + '/API/Account/ReSetPasswordByPhoneCode', _d).then(function(result) {
						if (result.body.StateCode == 0) {
							window.myPublic.alertResult(result.body.Message);
							vm.$router.back(-1);
						} else {
							window.myPublic.alertResult(result.body.Message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			/**
			 * 去登陆
			 */
			back: function() {
				vm.$router.back(-1);
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
