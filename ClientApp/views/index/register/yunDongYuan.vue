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
			<label>籍贯：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="nativePlace" placeholder="籍贯" />
				</div>
			</section>
		</li>
		<li>
			<label>民族：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="nation" placeholder="民族" />
				</div>
			</section>
		</li>
		<li>
			<label>血型：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="bloodType" placeholder="血型" />
				</div>
			</section>
		</li>
		<li>
			<label>身高：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="height" placeholder="身高" />
				</div>
			</section>
		</li>
		<li>
			<label>体重：</label>
			<section>
				<div class="inp">
					<input type="text" v-model="weight" placeholder="体重" />
				</div>
			</section>
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
			<label><span class="red-text">*</span>生日：</label>
			<section class="register-shengri">
				<div class="inp">
					<select v-model="year">
						<option v-for="i in 81" :value="i + 1949">{{i + 1949}}</option>
					</select>
				</div>
				<span>年</span>
				<div class="inp">
					<select v-model="month">
						<option v-for="i in 12" :value="i">{{i}}</option>
					</select>
				</div>
				<span>月</span>
				<div class="inp">
					<select v-model="day">
						<option v-for="i in dayLength" :value="i">{{i}}</option>
					</select>
				</div>
				<span>日</span>
				<div style="clear: both;"></div>
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
					<select v-model="trainFirse" v-on:change="trainChildList = ['']">
						<option value="">-运动项目-</option>
						<option :value="item.SystemId" v-for="(item,index) in zhuanxiangList">{{item.Name}}</option>
					</select>
				</div>
			</section>
		</li>

		<li v-for="(tCListItem,tCListIndex) in trainChildList" :style="{'margin-top':tCListIndex == 0 ? '0px' : '-20px'}">
			<label><span v-if="tCListIndex == 0"><span class="red-text">*</span>运动专项：</span></label>
			<section>
				<div class="inp">
					<select v-model="trainChildList[tCListIndex]">
						<option value="">-专项-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangChileList" v-if="item.SystemId.substr(0,3) == trainFirse">{{item.Name}}</option>
					</select>
				</div>
			</section>
			<img class="cuo" v-on:click="closeZhuanXiang(tCListIndex)" v-if="trainChildList[tCListIndex]" src="../../../assets/imgs/cuo.png" />
			<p v-if="tCListIndex == trainChildList.length - 1" class="is" v-html="isTrainChild"></p>
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
				trainChild: '', //专项子级
				trainChildList: [''],
				zhuanxiangList: [], //项目列表
				zhuanxiangChileList: [],
				userName: '',
				name: '',
				passWord: '',
				repeatPassWord: '',
				sex: '男',
				year: 0,
				month: 1,
				day: 1,
				mobile: '',
				code: '',
				nativePlace: '', //籍贯
				nation: '', //民族
				bloodType: '', //血型
				height: '', //身高
				weight: '', //体重
				SportGrade: 0, //运动等级
				startTime: '',
				isUserName: '',
				isName: '',
				isPassWord: '',
				isRepeatPassWord: '',
				isMobile: '',
				isCode: '',
				isTrainChild: '',
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
						vm.isMobile = '姓名不可为空';
					} else {
						vm.isMobile = '';
					}
					window.t = '';
				});
			},
			code: function(newVal, oldVal) {
				valiTime().then(() => {
					if (newVal == '') {
						vm.isCode = '姓名不可为空';
					} else {
						vm.isCode = '';
					}
					window.t = '';
				})
			},
			trainChildListJson: function(newVal, oldVal) {
				var _d = JSON.parse(newVal);
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (_d[_d.length - 1] != '') {
						window.t = '';
						vm.trainChildList.push('');
						return;
					} else {
						vm.trainChildList = Array.from(new Set(_d))
					}
					if (_d.length == 1) {
						vm.isTrainChild = '专项不得为空';
					} else {
						vm.isTrainChild = '';
					}
					window.t = '';
				}, 50);
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
			yearlength: function() {
				var _y = new Date().getFullYear();
				return _y - 1970;
			},
			trainChildListJson: function() {
				return JSON.stringify(vm.trainChildList);
			},
			dayLength: function() {
				if (vm.month == 1 || vm.month == 3 || vm.month == 5 || vm.month == 7 || vm.month == 8 || vm.month == 10 || vm.month ==
					12) {
					return 31;
				} else if (vm.month == 4 || vm.month == 6 || vm.month == 9 || vm.month == 11) {
					return 30;
				} else if ((vm.year % 4 == 0 && vm.year % 100 != 0) || vm.year % 400 == 0) {
					return 29;
				} else {
					return 28;
				}
			},
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
				//专项
				if (vm.trainChildList.length == 1) {
					vm.isTrainChild = '专项不得为空';
				}
				//开始时间
				if (vm.startTime == '') {
					vm.isStartTime = '训练开始时间不得为空';
				}
				if (parseInt(vm.startTime) > 9999 || parseInt(vm.startTime) < 1000) {
					vm.isStartTime = '训练开始时间格式不正确';
				}

				if (vm.isUserName || vm.isName || vm.isPassWord || vm.isRepeatPassWord || vm.isMobile || vm.isCode || vm.isTrainChild ||
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
				vm.year = new Date().getFullYear();
				vm.startTime = new Date().getFullYear();
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
			closeZhuanXiang: function(i) {
				vm.trainChildList.splice(i, 1);
			},
			//获取训练专项
			GetAllTrain: function() {

				vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllTrain', {
						params: {
							userName: ''
						}
					}).then(function(result) {
						if (result.body.StateCode == 0) {
							for (var i = 0; i < result.body.Data.length; i++) {
								if (result.body.Data[i].SystemId.length == 3) {
									vm.zhuanxiangList.push(result.body.Data[i]);
								} else {
									vm.zhuanxiangChileList.push(result.body.Data[i]);
								}
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			register: function() {
				if (!vm.valiDate) {
					return;
					console.log('111');
				}
				var _l = [];
				for (var i = 0; i < vm.trainChildList.length - 1; i++) {
					if (vm.trainChildList[i] != '') {
						_l.push(vm.trainChildList[i]);
					}
				}


				var _d = {
					Type: '运动员', //注册类型（运动员/教练）
					UserName: vm.userName, //用户名
					Sex: vm.sex, //性别
					FullName: vm.name, //姓名
					Birthday: vm.year + '-' + (vm.month < 10 ? '0' + vm.month : vm.month) + '-' + (vm.day < 10 ? '0' + vm.day : vm.day), //生日
					SportGrade: vm.SportGrade, //运动等级
					TrainId: _l, //运动小项
					PhoneNumber: vm.mobile, //手机号
					VerifyCode: vm.code, //验证码
					Start4Training: vm.startTime, //专训开始时间
					Password: vm.passWord, //密码
					ConfirmPassword: vm.repeatPassWord //确认密码(注册时该项为必填项、关联该字段不填)

				}
				if (vm.nativePlace) {
					_d.NativePlace = vm.nativePlace;
				}
				if (vm.nation) {
					_d.Nation = vm.nation;
				}
				if (vm.bloodType) {
					_d.BloodType = vm.bloodType;
				}
				if (vm.height) {
					_d.Height = vm.height;
				}
				if (vm.weight) {
					_d.Weight = vm.weight;
				}

				vm.$http.post(myPublic.publicUrl + '/API/Account/Register', _d).then(function(result) {
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
