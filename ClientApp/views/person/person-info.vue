<template>
	<div>
		<div v-if="zhuangtai" class="person-info-content">
			<div class="item">
				<label>头像：</label>
				<div class="text" style="position: relative;">
					<img v-if="personImg" :src="personImg">
					<img v-else src="../../assets/imgs/person.png">
					<input type="file" name="file" id="file" accept="image/gif, image/jpeg, image/png" />
				</div>
			</div>
			<div class="item">
				<label>姓名：</label>
				<div class="text">{{user.FullName}}&nbsp;</div>
			</div>
			<div class="item">
				<label>性别：</label>
				<div class="text">{{user.Sex}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>出生年月：</label>
				<div class="text">{{user.Birthday}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>运动等级：</label>
				<div class="text" v-if="user.SportGrade === ''">-</div>
				<div class="text" v-if="user.SportGrade === 0">国际级运动健将</div>
				<div class="text" v-if="user.SportGrade == 1">运动健将</div>
				<div class="text" v-if="user.SportGrade == 2">一级运动员</div>
				<div class="text" v-if="user.SportGrade == 3">二级运动员</div>
				<div class="text" v-if="user.SportGrade == 4">三级运动员</div>
				<div class="text" v-if="user.SportGrade == 5">其他</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>运动项目：</label>
				<div class="text">{{user.TrainName}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>教练：</label>
				<div class="text">{{user.DepartmentName}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>参与训练时间：</label>
				<div class="text">{{user.Start4Training}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>运动年限：</label>
				<div class="text">{{nianxian}}&nbsp;</div>
			</div>
		</div>
		<div v-else class="person-info-content">
			<div class="item">
				<label>头像：</label>
				<div class="text">
					<img src="../../assets/imgs/person.png">
				</div>
			</div>
			<div class="item">
				<label>姓名：</label>
				<div class="text">
					<input v-model="user.FullName" type="text" />
				</div>
			</div>
			<div style="color: #FF4000;margin: -9px auto 8px 120px;" v-if="isUserName">{{isUserName}}</div>
			<div class="item">
				<label>性别：</label>
				<div class="text">
					<select v-model="user.Sex">
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
				</div>
			</div>
			<div class="item">
				<label>生日：</label>
				<div class="text">
					<select style="float:left;width: 90px;" v-model="year">
						<option v-for="i in 81" :value="i + 1949">{{i + 1949}}</option>
					</select>
					<span style="float:left;width: 26px;text-align: center;">年</span>
					<select style="float:left;width: 90px;" v-model="month">
						<option v-for="i in 12" :value="i">{{i}}</option>
					</select>
					<span style="float:left;width: 26px;text-align: center;">月</span>
					<select style="float:left;width: 90px;" v-model="day">
						<option v-for="i in dayLength" :value="i">{{i}}</option>
					</select>
					<span style="display: inline-block;width: 26px;text-align: center;">日</span>
				</div>
			</div>
			<div class="item">
				<label>运动等级：</label>
				<div class="text">
					<select v-model="user.SportGrade">
						<option value="">-等级-</option>
						<option value="0">国际级运动健将</option>
						<option value="1">运动健将</option>
						<option value="2">一级运动员</option>
						<option value="3">二级运动员</option>
						<option value="4">三级运动员</option>
						<option value="5">其他</option>
					</select>
				</div>
			</div>
			<div class="item" v-for="(tCListItem,tCListIndex) in trainChild" :style="{'margin-top':tCListIndex == 0 ? '0px' : '-10px'}">
				<label v-if="tCListIndex == 0">运动项目：</label>
				<div class="text">
					<select style="float:left;width: 170px;margin-right:10px;" v-model="trainFirse[tCListIndex]" v-on:change="trainChild[tCListIndex] = ''">
						<option :value="''">-运动项目-</option>
						<option :value="item.SystemId" v-for="(item,index) in zhuanxiangList">{{item.Name}}</option>
					</select>
					<select style="display: inline-block;width: 170px;" v-model="trainChild[tCListIndex]">
						<option value="">-专项-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangChileList" v-if="item.SystemId.substr(0,3) == trainFirse[tCListIndex]">{{item.Name}}</option>
					</select>
				</div>
				<img class="cuo" v-on:click="closeZhuanXiang(tCListIndex)" v-if="trainChild[tCListIndex]" src="../../assets/imgs/cuo.png" />
				
			</div>
			<div style="color: #FF4000;margin: -9px auto 8px 120px;" v-if="isT">{{isT}}</div>
			<div class="item" v-for="(dCListItem,dCListIndex) in departmentChild" :style="{'margin-top':dCListIndex == 0 ? '0px' : '-10px'}">
				<label v-if="dCListIndex == 0">所属教练：</label>
				<div class="text">
					<select style="float:left;width: 110px;margin-right:10px;" v-model="departmentFirse[dCListIndex]" v-on:change="departmentChild[dCListIndex] = ''">
						<option value="">-专项-</option>
						<option :value="item.SystemId" v-for="(item,index) in departmentList" v-if="item.SystemId.length == 3">{{item.Name}}</option>
					</select>
					<select style="float:left;width: 110px;margin-right:10px;" v-model="departmentSecond[dCListIndex]" v-on:change="departmentChild[dCListIndex] = ''">
						<option value="">-教练组-</option>
						<option :value="item.SystemId" v-for="(item,index) in departmentList" v-if="item.SystemId.length == 6 && item.SystemId.substr(0,3) == departmentFirse[dCListIndex]">{{item.Name}}</option>
					</select>
					<select style="display: inline-block;width: 110px;" v-model="departmentChild[dCListIndex]">
						<option value="">-教练员-</option>
						<option :value="item.Id" v-for="(item,index) in departmentList" v-if="item.SystemId.length == 9 && item.SystemId.substr(0,6) == departmentSecond[dCListIndex]">{{item.Name}}</option>
					</select>
				</div>
				<img class="cuo" v-on:click="closeJiaoLian(dCListIndex)" v-if="departmentChild[dCListIndex]" src="../../assets/imgs/cuo.png" />
			</div>
			<div style="color: #FF4000;margin: -9px auto 8px 120px;" v-if="isD">{{isD}}</div>
			<div class="item">
				<label>专训开始时间：</label>
				<div class="text">
					<select v-model="user.Start4Training">
						<option value="">-开始时间-</option>
						<option v-for="i in 81" :value="i + 1949">{{i + 1949}}</option>
					</select>
				</div>
			</div>
		</div>
		<div v-if="zhuangtai && userType == '运动员'" style="text-align: center;">
			<button class="person-but1" style="margin:0px;" v-on:click="zhuangtai = false">编辑</button>
		</div>
		<div v-if="!zhuangtai" style="text-align: center;margin-bottom: 50px;">
			<button class="person-but1" v-on:click="save()">保存</button>
			<button class="person-but2" v-on:click="zhuangtai = true">取消</button>
		</div>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {
				isUserName:'',
				isT:'',
				isD:'',
				userType: '',
				trainFirse: [''], //专项父级
				trainChild: [''], //专项子级
				zhuanxiangList: [],
				zhuanxiangChileList: [],
				departmentFirse: [''], //教练员父级
				departmentSecond: [''],
				departmentChild: [''], //教练员子级
				departmentList: [],
				departmentChildList: [],
				zhuangtai: true, //true 显示，false 编辑
				year: 1991,
				month: 1,
				day: 1,
				personImg: '', //头像
				user: {
					FullName: '',
					Sex: '',
					Birthday: '',
					SportGrade: 0,
					TrainName: '',
					DepartmentName: '',
					Start4Training: 0
				}
			}
		},
		watch: {
			year: function(newVal, oldVal) {
				vm.user.Birthday = vm.year + '-' + (vm.month < 10 ? '0' + vm.month : vm.month) + '-' + (vm.day < 10 ? '0' + vm.day : vm.day);
			},
			month: function(newVal, oldVal) {
				vm.user.Birthday = vm.year + '-' + (vm.month < 10 ? '0' + vm.month : vm.month) + '-' + (vm.day < 10 ? '0' + vm.day : vm.day);

			},
			day: function(newVal, oldVal) {
				vm.user.Birthday = vm.year + '-' + (vm.month < 10 ? '0' + vm.month : vm.month) + '-' + (vm.day < 10 ? '0' + vm.day : vm.day);

			},
			zhuangtai: function(newVal, oldVal) {
				if(!newVal) {
					vm.GetAllDepartment();
					vm.GetAllTrain();
				}
			},
			departmentChildListsJson: function(newVal, oldVal) {
				vm.isD = '';
				var _d = JSON.parse(newVal);
				if(window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if(_d[_d.length - 1] != '') {
						window.t = '';
						vm.departmentChild.push('');
						vm.departmentFirse.push('');
						vm.departmentSecond.push('');
						return;
					}
					var _l = [];
					var _ll = [];
					var _lll = [];
					for(var i = 0; i < _d.length - 1; i++) {
						if(_d[i] != '') {
							_l.push(_d[i]);
							_ll.push(vm.departmentFirse[i]);
							_lll.push(vm.departmentSecond[i]);
						}
					}
					_l.push(_d[_d.length - 1]);
					_ll.push(vm.departmentFirse[_d.length - 1]);
					_lll.push(vm.departmentSecond[_d.length - 1]);
					if(JSON.stringify(_l) != JSON.stringify(_d)) {
						window.t = '';
						vm.departmentChild = _l;
						vm.departmentFirse = _ll;
						vm.departmentSecond = _lll;
						return;
					}
					var temp = []; //一个新的临时数组
					for(var i = 0; i < _d.length; i++) {
						if(temp.indexOf(_d[i]) == -1) {
							temp.push(_d[i]);
						}
					}
					if(JSON.stringify(temp) != JSON.stringify(_d)) {
						window.t = '';
						vm.departmentChild = temp;
						return;
					}
					window.t = '';
				}, 500);
			},
			trainChildListJson: function(newVal, oldVal) {
				vm.isT = '';
				var _d = JSON.parse(newVal);
				if(window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if(_d[_d.length - 1] != '') {
						window.t = '';
						vm.trainChild.push('');
						vm.trainFirse.push('')
						return;
					}
					var _l = [];
					var _ll = [];
					for(var i = 0; i < _d.length - 1; i++) {
						if(_d[i] != '') {
							_l.push(_d[i]);
							_ll.push(vm.trainFirse[i]);
						}
					}
					_l.push(_d[_d.length - 1]);
					_ll.push(vm.trainFirse[_d.length - 1]);
					if(JSON.stringify(_l) != JSON.stringify(_d)) {
						window.t = '';
						vm.trainChild = _l;
						vm.trainFirse = _ll;
						return;
					}
					var temp = []; //一个新的临时数组
					for(var i = 0; i < _d.length; i++) {
						if(temp.indexOf(_d[i]) == -1) {
							temp.push(_d[i]);
						} else {
							temp.push('');
						}
					}
					if(JSON.stringify(temp) != JSON.stringify(_d)) {
						window.t = '';
						vm.trainChild = temp;
						return;
					}
					window.t = '';
				}, 500);
			},
		},
		//计算属性
		computed: {
			valiDate: function() {
				//用户名
				if(vm.user.FullName == '') {
					vm.isUserName = '用户名不得为空';
				}else{
					vm.isUserName = '';
				}
				//姓名
				var t = vm.trainChild.join(',');
				if(t == '') {
					vm.isT = '运动项目不得为空';
				}
				var d = vm.departmentChild.join(',');
				//密码
				if(d == '') {
					vm.isD = '教练不得为空';
				}
				if(vm.isUserName || vm.isT || vm.isD) {
					return false;
				} else {
					return true;
				}
			},
			trainChildListJson: function() {
				return JSON.stringify(vm.trainChild);
			},
			departmentChildListsJson: function() {
				return JSON.stringify(vm.departmentChild);
			},

			yearlength: function() {
				var _y = new Date().getFullYear();
				return _y - 1970;
			},
			nianxian: function() {
				return myPublic.dateForFormat(null, 'yyyy') - vm.user.Start4Training;
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
		},
		methods: {
			start: function() {
				vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'), false);
				vm.userType = window.localStorage.getItem('Sport_userType');
				if(window.localStorage.getItem('Sport_userPicture')) {
					vm.personImg = window.localStorage.getItem('Sport_userPicture');
				}
				vm.imgInp();
			},
			closeZhuanXiang:function(i){
				vm.trainFirse.splice(i,1);
				vm.trainChild.splice(i,1);
			},
			closeJiaoLian:function(i){
				vm.departmentFirse.splice(i,1);
				vm.departmentSecond.splice(i,1);
				vm.departmentChild.splice(i,1);
			},
			imgInp: function() {
				document.getElementById('file').onchange = function() {

					var fileInput = document.getElementById('file');
					var formData = new FormData(); //创建formData对象
					formData.append('file', fileInput.files[0]);
					var httpDemo = new XMLHttpRequest(); //创建httprequest对象
					httpDemo.open('post', 'http://www.sport.uare.vip/API/User/SetUserHead', true); //初始化请求  post方式  接口  异步
					httpDemo.onreadystatechange = function(e) {
						if(httpDemo.readyState == 4 && httpDemo.status == 200) {
							var res = JSON.parse(httpDemo.responseText)
							if(res.StateCode == 0) {
								var reader = new FileReader();
								reader.readAsDataURL(fileInput.files[0]);
								reader.onload = function(e) {
									vm.personImg = e.target.result;
									window.localStorage.setItem('Sport_userPicture', e.target.result);
									window.bus.$emit('personImg', e.target.result);
								}
							} else {
								window.myPublic.alertResult(res.Message);
							}
						}
					}

					httpDemo.send(formData); //发送请求
				}
			},
			save: function() {
				if(!vm.valiDate) {
					return;
					console.log('111');
				}
				
				var t = vm.trainChild.join(',');
				var d = vm.departmentChild.join(',');
				vm.$http.post(myPublic.publicUrl + '/API/User/SaveUserInfo', {
						FullName: vm.user.FullName,
						Sex: vm.user.Sex,
						Birthday: vm.user.Birthday,
						SportGrade: vm.user.SportGrade,
						TrainId: t.substr(0, t.length - 1),
						DepartmentId: d.substr(0, d.length - 1),
						Start4Training: vm.user.Start4Training,
					}).then(function(result) {
						if(result.body.StateCode == 0) {
							vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'), true);

						} else if(result.body.StateCode == 0) {
							vm.$router.push({
								path: '/login'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			getUserInfo: function(data, is) {
				vm.$http.get(myPublic.publicUrl + '/API/User/GetUserInfo', {
					headers: {
						token: data
					}
				}).then(function(result) {
					try {
						if(result.body.StateCode != 0) {
							vm.$router.push({
								path: '/login'
							});
						} else {
							window.localStorage.setItem('user', JSON.stringify(result.body.Data));
						}
					} catch(err) {
						vm.$router.push({
							path: '/login'
						});
					}
					vm.user = JSON.parse(window.localStorage.getItem('user'));
					vm.year = vm.user.Birthday.split('-')[0];
					vm.month = parseInt(vm.user.Birthday.split('-')[1]);
					vm.day = parseInt(vm.user.Birthday.split('-')[2]);
					if(is) {
						vm.zhuangtai = true;
						window.bus.$emit('person', 1);
					}

				}).catch(function(error) {
					console.log(error);
				});
			},
			//获取教练员
			GetAllDepartment: function() {

				vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllDepartment', {}).then(function(result) {
						if(result.body.StateCode == 0) {
							vm.departmentList = result.body.Data;
							var f = [];
							var s = [];
							var t = [];
							var _list = vm.user.DepartmentId.split(','); //运动项数组
							vm.departmentFirse = []; //教练员父级
							vm.departmentSecond = [];
							vm.departmentChild = vm.user.DepartmentId.split(','); //教练员子级
							
							for(var i = 0;i<vm.departmentChild.length;i++){
								if(vm.departmentChild[i] == ''){
									vm.departmentFirse.push('');
									vm.departmentSecond.push('');
									break;									
								}
								for(var j = 0;j<result.body.Data.length;j++){
									if(vm.departmentChild[i] == result.body.Data[j].Id){
										vm.departmentFirse.push(result.body.Data[j].SystemId.substr(0,3));
										vm.departmentSecond.push(result.body.Data[j].SystemId.substr(0,6));
										break;
									}
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
						if(result.body.StateCode == 0) {
							vm.trainChild = [];
							vm.trainFirse = [];
							
							var _list = vm.user.TrainId.split(','); //运动项数组
							for(var i = 0; i < result.body.Data.length; i++) {
								if(result.body.Data[i].SystemId.length == 3) {
									vm.zhuanxiangList.push(result.body.Data[i]);
								} else {
									vm.zhuanxiangChileList.push(result.body.Data[i]);
								}
							}
							for(var j = 0;j<_list.length;j++){
								if(_list[j]){
									for(var i = 0;i<vm.zhuanxiangChileList.length;i++){
										if(vm.zhuanxiangChileList[i].Id == _list[j]){
											vm.trainFirse.push(vm.zhuanxiangChileList[i].SystemId.substr(0,3));
											vm.trainChild.push(vm.zhuanxiangChileList[i].Id);
											break;
										}
									}
								}
							}
							debugger
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			if(!window.localStorage.getItem('Sport_Access_Token')) {
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