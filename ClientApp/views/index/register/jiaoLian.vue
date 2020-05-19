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
				<label>运动员等级：</label>
				<section>
					<div class="inp">
						<select v-model="SportGrade">
							<option value="">-等级-</option>
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
			<li v-for="(tCListItem,tCListIndex) in trainChildList" :style="{'margin-top':tCListIndex == 0 ? '0px' : '-20px'}">
				<label><span v-if="tCListIndex == 0"><span class="red-text">*</span>运动项目：</span></label>
				<section class="register-zhuanxiang">
					<div class="inp" style="margin-right: 10px;">
						<select v-model="trainFirse[tCListIndex]" v-on:change="trainChildList[tCListIndex] = ''">
							<option :value="','">-运动项目-</option>
							<option :value="item.Id+','+item.SystemId" v-for="(item,index) in zhuanxiangList">{{item.Name}}</option>
						</select>
					</div>
					<div class="inp">
						<select v-model="trainChildList[tCListIndex]">
							<option value="">-专项-</option>
							<option :value="item.Id" v-for="(item,index) in zhuanxiangChileList" v-if="item.SystemId.substr(0,3) == trainFirse[tCListIndex].split(',')[1]">{{item.Name}}</option>
						</select>
					</div>
					<div style="clear: both;"></div>
				</section>
				<img class="cuo" v-on:click="closeZhuanXiang(tCListIndex)" v-if="trainChildList[tCListIndex]" src="../../../assets/imgs/cuo.png" />
				<p v-if="tCListIndex == trainChildList.length - 1" class="is" v-html="isTrainChild"></p>
			</li>

			<li v-for="(dCListItem,dCListIndex) in departmentChildLists" :style="{'margin-top':dCListIndex == 0 ? '0px' : '-20px'}">
				<label v-if="dCListIndex == 0"><span class="red-text">*</span>所属教练：</label>
				<section class="register-jiaolian">
					<div class="inp" style="margin-right: 10px;">
						<select v-model="departmentFirse[dCListIndex]" v-on:change="departmentSecond[dCListIndex] = '';departmentChildLists[dCListIndex] = ''">
							<option value="">-专项-</option>
							<option :value="item.SystemId" v-for="(item,index) in departmentList">{{item.Name}}</option>
						</select>
					</div>
					<div class="inp" style="margin-right: 10px;">
						<select v-model="departmentSecond[dCListIndex]" v-on:change="departmentChildLists[dCListIndex] = ''">
							<option value="">-教练组-</option>
							<option :value="item.SystemId" v-for="(item,index) in departmentChildList" v-if="item.SystemId.substr(0,3) == departmentFirse[dCListIndex]&&item.SystemId>999&&item.SystemId<1000000">{{item.Name}}</option>
						</select>
					</div>
					<div class="inp">
						<select v-model="departmentChildLists[dCListIndex]">
							<option value="">-教练员-</option>
							<option :value="item.Id" v-for="(item,index) in departmentChildList" v-if="item.SystemId.substr(0,6) == departmentSecond[dCListIndex]&&item.SystemId>999999">{{item.Name}}</option>
						</select>
					</div>
					<div style="clear: both;"></div>
				</section>
				<img class="cuo" v-on:click="closeJiaoLian(dCListIndex)" v-if="departmentChildLists[dCListIndex]" src="../../../assets/imgs/cuo.png" />
				<p v-if="dCListIndex == departmentChildLists.length - 1" class="is" v-html="isDepartmentChild"></p>
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
	export default {
		props: [],
		data: function() {
			return {
				trainFirse: [','], //专项父级
				trainChild: '', //专项子级
				trainChildList: [''],
				zhuanxiangList: [],
				zhuanxiangChileList: [],
				departmentFirse: [''], //教练员父级
				departmentSecond: [''],
				departmentChild: '', //教练员子级
				departmentChildLists: [''],
				departmentList: [],
				departmentChildList: [],
				userName: '',
				name: '',
				passWord: '',
				repeatPassWord: '',
				sex: '男',
				year: 0,
				month: 1,
				day: 1,
				SportGrade: 0, //运动等级
				startTime: '',
				isUserName: '',
				isName: '',
				isPassWord: '',
				isRepeatPassWord: '',
				isTrainChild: '',
				isDepartmentChild: '',
				isStartTime: ''
			}
		},
		watch: {
			userName: function(newVal, oldVal) {
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (newVal != '') {
						//						var reg = new RegExp("^(1[34578][0-9]{9})$"); //正则表达式
						//						if(!reg.test(newVal)) { //正则验证不通过，格式不对
						//							vm.isUserName = '手机号格式不正确';
						//							return;
						//						}
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
				}, 500);
			},
			name: function(newVal, oldVal) {
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (newVal == '') {
						vm.isName = '姓名不可为空';
					} else {
						vm.isName = '';
					}
					window.t = '';
				}, 500);
			},
			passWord: function(newVal, oldVal) {
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
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
				}, 500);
			},
			repeatPassWord: function(newVal, oldVal) {
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (newVal == '') {
						vm.isRepeatPassWord = '密码不可为空';
					} else {
						vm.isRepeatPassWord = '';
					}
					window.t = '';
				}, 500);
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
						vm.trainFirse.push(',')
						return;
					}
					var _l = [];
					var _ll = [];
					for (var i = 0; i < _d.length - 1; i++) {
						if (_d[i] != '') {
							_l.push(_d[i]);
							_ll.push(vm.trainFirse[i]);
						}
					}
					_l.push(_d[_d.length - 1]);
					_ll.push(vm.trainFirse[_d.length - 1]);
					if (JSON.stringify(_l) != JSON.stringify(_d)) {
						window.t = '';
						vm.trainChildList = _l;
						vm.trainFirse = _ll;
						return;
					}
					var temp = []; //一个新的临时数组
					for (var i = 0; i < _d.length; i++) {
						if (temp.indexOf(_d[i]) == -1) {
							temp.push(_d[i]);
						} else {
							temp.push('');
						}
					}
					if (JSON.stringify(temp) != JSON.stringify(_d)) {
						window.t = '';
						vm.trainChildList = temp;
						return;
					}
					if (_d.length == 1) {
						vm.isTrainChild = '专项不得为空';
					} else {
						vm.isTrainChild = '';
					}
					window.t = '';
				}, 500);
			},
			departmentChildListsJson: function(newVal, oldVal) {
				var _d = JSON.parse(newVal);
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (_d[_d.length - 1] != '') {
						window.t = '';
						vm.departmentChildLists.push('');
						vm.departmentFirse.push('');
						vm.departmentSecond.push('');
						return;
					}
					var _l = [];
					var _ll = [];
					var _lll = [];
					for (var i = 0; i < _d.length - 1; i++) {
						if (_d[i] != '') {
							_l.push(_d[i]);
							_ll.push(vm.departmentFirse[i]);
							_lll.push(vm.departmentSecond[i]);
						}
					}
					_l.push(_d[_d.length - 1]);
					_ll.push(vm.departmentFirse[_d.length - 1]);
					_lll.push(vm.departmentSecond[_d.length - 1]);
					if (JSON.stringify(_l) != JSON.stringify(_d)) {
						window.t = '';
						vm.departmentChildLists = _l;
						vm.departmentFirse = _ll;
						vm.departmentSecond = _lll;
						return;
					}
					var temp = []; //一个新的临时数组
					for (var i = 0; i < _d.length; i++) {
						if (temp.indexOf(_d[i]) == -1) {
							temp.push(_d[i]);
						}
					}
					if (JSON.stringify(temp) != JSON.stringify(_d)) {
						window.t = '';
						vm.departmentChildLists = temp;
						return;
					}
					if (_d.length == 1) {
						vm.isDepartmentChild = '教练不得为空';
					} else {
						vm.isDepartmentChild = '';
					}
					window.t = '';
				}, 500);
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
			departmentChildListsJson: function() {
				return JSON.stringify(vm.departmentChildLists);
			},
			dayLength: function() {
				if(vm.month == 1 || vm.month == 3 || vm.month == 5 || vm.month == 7 || vm.month == 8 || vm.month == 10 || vm.month == 12) {
					return 31;
				} else if(vm.month == 4 || vm.month == 6 || vm.month == 9 || vm.month == 11) {
					return 30;
				} else if((vm.year % 4 == 0 && vm.year % 100 != 0) || vm.year % 400 == 0) {
					return 29;
				} else {
					return 28;
				}
			},
			valiDate: function() {
				//用户名
				if(vm.userName == '') {
					vm.isUserName = '用户名不得为空';
				}
				//姓名
				if(vm.name == '') {
					vm.isName = '姓名不得为空';
				}
				//密码
				if(vm.passWord == '') {
					vm.isPassWord = '密码不得为空';
				}
				//重复密码
				if(vm.repeatPassWord == '') {
					vm.isRepeatPassWord = '重复密码不得为空';
				}
				if(vm.passWord && vm.repeatPassWord && vm.passWord != vm.repeatPassWord) {
					vm.isRepeatPassWord = '两次密码不一致';
				}
		
				//专项
				if(vm.trainChildList.length == 1) {
					vm.isTrainChild = '专项不得为空';
				}
				//教练
				if(vm.departmentChildLists.length == 1) {
					vm.isDepartmentChild = '教练不得为空';
				}
				//开始时间
				if(vm.startTime == '') {
					vm.isStartTime = '训练开始时间不得为空';
				}
				if(parseInt(vm.startTime) > 9999 || parseInt(vm.startTime) < 1000) {
					vm.isStartTime = '训练开始时间格式不正确';
				}
		
				if(vm.isUserName || vm.isName || vm.isPassWord || vm.isRepeatPassWord || vm.isTrainChild || vm.isDepartmentChild || vm.isStartTime) {
					return false;
				} else {
					return true;
				}
		
			},
		},
		methods: {
			start: function() {
				vm.GetAllDepartment();
				vm.GetAllTrain();
				var _d = new Date();
				vm.startTime = _d.getFullYear();
				vm.year = new Date().getFullYear();
				vm.startTime = new Date().getFullYear();
			},
			closeJiaoLian: function(i) {
				vm.departmentChildLists.splice(i, 1);
				vm.departmentFirse.splice(i, 1);
				vm.departmentSecond.splice(i, 1);
			},
			closeZhuanXiang: function(i) {
				vm.trainChildList.splice(i, 1);
				vm.trainFirse.splice(i, 1);
			},
			//获取教练员
			GetAllDepartment: function() {

				vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllDepartment', {}).then(function(result) {
						if (result.body.StateCode == 0) {
							for (var i = 0; i < result.body.Data.length; i++) {
								if (result.body.Data[i].SystemId.length == 3) {
									vm.departmentList.push(result.body.Data[i]);
								} else {
									vm.departmentChildList.push(result.body.Data[i]);
								}
							}
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
				var _s = [];
				for (var i = 0; i < vm.departmentChildLists.length - 1; i++) {
					if (vm.departmentChildLists[i] != '') {
						_s.push(vm.departmentChildLists[i]);
					}
				}
				vm.$http.post(myPublic.publicUrl + '/API/Account/Register', {
						UserName: vm.userName,
						Sex: vm.sex,
						FullName: vm.name,
						Birthday: vm.year + '-' + (vm.month < 10 ? '0' + vm.month : vm.month) + '-' + (vm.day < 10 ? '0' + vm.day : vm.day),
						SportGrade: vm.SportGrade,
						TrainId: _l, //训练项目
						SysDepartmentId: _s, //教练员
						Start4Training: vm.startTime,
						Password: vm.passWord,
						ConfirmPassword: vm.repeatPassWord
					}).then(function(result) {
						if (result.body.StateCode == 100) {
							vm.isPassWord = result.body.ErrorMessges.Password ? result.body.ErrorMessges.Password : '';
						} else if (result.body.StateCode == 0) {
							vm.$router.push({
								path: '/login'
							});
							//							window.localStorage.setItem('Sport_userType',result.body.Data.RoleName)
							//							window.localStorage.setItem('Sport_Access_Token', result.body.Data.Token_Type + ' ' + result.body.Data.Access_Token);
							//							vm.getUserInfo(result.body.Data);
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
