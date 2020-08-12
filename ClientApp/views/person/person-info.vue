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
			<div v-if="userType == '运动员'" class="item">
				<label>籍贯：</label>
				<div class="text">{{user.NativePlace}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>民族：</label>
				<div class="text">{{user.Nation}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>血型：</label>
				<div class="text">{{user.BloodType}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>身高：</label>
				<div class="text">{{user.Height}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>体重：</label>
				<div class="text">{{user.Weight}}&nbsp;</div>
			</div>

			<div class="item">
				<label>性别：</label>
				<div class="text">{{user.Sex}}&nbsp;</div>
			</div>
			<!-- <div class="item">
				<label>手机号：</label>
				<div class="text">{{}}&nbsp;</div>
			</div> -->
			<div v-if="userType == '运动员'" class="item">
				<label>出生年月：</label>
				<div class="text">{{user.Birthday}}&nbsp;</div>
			</div>
			<div class="item" v-if="userType == '运动员'">
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
				<div class="text" v-for="item in user.TrainSecName.split(',')">{{item}}&nbsp;</div>
			</div>
			<div v-else class="item">
				<label>运动项目：</label>
				<div class="text">{{user.TrainName}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>教练：</label>
				<div class="text">{{user.CoachId}}&nbsp;</div>
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





		<!-- 编辑 -->
		<div v-else class="person-info-content">
			<div class="item">
				<label>头像：</label>
				<div class="text" style="position: relative;">
					<img v-if="personImg" :src="personImg">
					<img v-else src="../../assets/imgs/person.png">
				</div>
			</div>
			<div class="item">
				<label><span class="red-text">*</span>姓名：</label>
				<div class="text">
					<input v-model="user.FullName" type="text" />
				</div>
			</div>
			<div style="color: #FF4000;margin: -9px auto 8px 120px;" v-if="isUserName">{{isUserName}}</div>

			<div class="item">
				<label>籍贯：</label>
				<div class="text">
					<input v-model="user.NativePlace" type="text" />
				</div>
			</div>
			<div class="item">
				<label>民族：</label>
				<div class="text">
					<input v-model="user.Nation" type="text" />
				</div>
			</div>
			<div class="item">
				<label>血型：</label>
				<div class="text">
					<input v-model="user.BloodType" type="text" />
				</div>
			</div>
			<div class="item">
				<label>身高：</label>
				<div class="text">
					<input v-model="user.Height" type="text" />
				</div>
			</div>
			<div class="item">
				<label>体重：</label>
				<div class="text">
					<input v-model="user.Weight" type="text" />
				</div>
			</div>


			<div class="item">
				<label><span class="red-text">*</span>性别：</label>
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
			<div class="item">
				<label>运功项目：</label>
				<div class="text">
					<select v-model="trainFirse">
						<option :value="item.SystemId" v-for="(item,index) in zhuanxiangList">{{item.Name}}</option>
					</select>
				</div>
			</div>
			<div class="item">
				<label>运动专项</label>
				<div style="margin-bottom: 16px;" class="text" v-for="(item,i) in trainChilds">
					<img v-if="trainChilds[i] !== ''" class="cuoo" src="../../assets/imgs/cuo.png" @click="closeZhuanXiang(i)" />
					<select v-model="trainChilds[i]">
						<option :value="citem.Id" v-for="(citem,index) in zhuanxiangChileList" v-if="(!trainChilds.includes(citem.Id) || citem.Id == trainChilds[i]) && citem.SystemId.substr(0,3) == trainFirse">{{citem.Name}}</option>
					</select>
				</div>
			</div>
			<div class="item">
				<label>教练：</label>
				<div style="margin-bottom: 16px;" class="text" v-for="(item,index) in role">
					<img v-if="role[index] !== ''" class="cuoo" src="../../assets/imgs/cuo.png" @click="closerole(index)" />
					<select v-model="role[index]">
						<option :value="iitem.Id" v-for="(iitem,i) in roleList">{{iitem.Name}}</option>
					</select>
				</div>
			</div>

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
			<button class="person-but1" style="margin:0px 0px 30px 0px;" v-on:click="bianji()">编辑</button>
		</div>
		<div v-if="!zhuangtai" style="text-align: center;margin-bottom: 50px;">
			<button class="person-but1" v-on:click="save()">保存</button>
			<button class="person-but2" v-on:click="quxiao()">取消</button>
		</div>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {
				roleList: [], //教练列表
				role: [''], //教练列表
				isUserName: '',
				isT: '',
				isD: '',
				userType: '',
				zhuangtai: true, //true 显示，false 编辑
				personImg: '', //头像
				zhuanxiangList: [],
				zhuanxiangChileList: [],
				trainFirse: '', //运动主项
				trainChild: [], //我的专项
				trainChilds: [], //我的专项 编辑
				year: '',
				month: '',
				day: '',
				user: {
					FullName: '',
					nativePlace: '',
					nation: '',
					bloodType: '',
					height: '',
					weight: '',
					Sex: '',
					Birthday: '',
					SportGrade: 0,
					TrainName: '',
					TrainSecName: '',
					CoachId: '',
					Start4Training: 0
				}
			}
		},
		watch: {
			role: function(newVal, oldVal) {
				if (newVal[newVal.length - 1] !== '') {
					vm.role.push('');
				}
			},
			trainFirse: function(newVal, oldVal) {
				vm.trainChilds = [''];
			},
			trainChildJson: function(newVal, oldVal) {
				if (!newVal) {
					return;
				}
				var _d = JSON.parse(newVal);
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (_d[_d.length - 1] !== '') {
						window.t = '';
						vm.trainChilds.push('');
						return;
					}
					window.t = '';
				}, 50);
			}
		},
		//计算属性
		computed: {
			nianxian: function() {
				return myPublic.dateForFormat(null, 'yyyy') - vm.user.Start4Training;
			},
			dayLengths: function() {
				return vm.month;
			},
			valiDate: function() {
				//用户名
				if (vm.user.FullName == '') {
					vm.isUserName = '用户名不得为空';
				} else {
					vm.isUserName = '';
				}
				//姓名
				// var t = vm.trainChild.join(',');
				// if(t == '') {
				// 	vm.isT = '运动项目不得为空';
				// }
				// var d = vm.departmentChild.join(',');
				//密码
				// if(d == '') {
				// 	vm.isD = '教练不得为空';
				// }
				if (vm.isUserName || vm.isT || vm.isD) {
					return false;
				} else {
					return true;
				}
			},
			trainChildJson: function() {
				return JSON.stringify(vm.trainChilds);
			},
			dayLength: function() {
				if (vm.month == 1 || vm.month == 3 || vm.month == 5 || vm.month == 7 || vm.month == 8 || vm.month == 10 || vm.month ==
					12) {
					return 31;
				} else if (vm.month == 4 || vm.month == 6 || vm.month == 9 || vm.month == 11) {
					if (vm.day > 30) {
						vm.day = 30;
					}
					return 30;
				} else if ((vm.year % 4 == 0 && vm.year % 100 != 0) || vm.year % 400 == 0) {
					if (vm.day > 29) {
						vm.day = 29;
					}
					return 29;
				} else {
					if (vm.day > 28) {
						vm.day = 28;
					}
					return 28;
				}
			},
		},
		methods: {
			start: function() {
				vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'), false);
				vm.userType = window.localStorage.getItem('Sport_userType');
				if (window.localStorage.getItem('Sport_userPicture')) {
					vm.personImg = window.localStorage.getItem('Sport_userPicture');
				}
				vm.imgInp();
			},
			//			changeRole:function(){
			//				vm.role.includes()
			//			},
			bianji: function() {
				vm.GetAllDepartment().then(() => {
					vm.GetAllTrain().then(() => {
						vm.$nextTick(function() {
							vm.zhuangtai = false;
							vm.$nextTick(function() {
								vm.role = vm.user.CoachName.split(',');
								vm.role.push('');
								vm.trainChilds = myPublic.copys(vm.trainChild);
							});
						});
					});
				});
			},
			closeZhuanXiang: function(i) {
				if (vm.trainChilds.length > 1) {
					vm.trainChilds.splice(i, 1);
				}
			},
			closerole: function(i) {
				if (vm.role.length > 1) {
					vm.role.splice(i, 1);
				}
			},
			closeJiaoLian: function(i) {},
			imgInp: function() {
				document.getElementById('file').onchange = function() {

					var fileInput = document.getElementById('file');
					var formData = new FormData(); //创建formData对象
					formData.append('file', fileInput.files[0]);
					var httpDemo = new XMLHttpRequest(); //创建httprequest对象
					httpDemo.open('post', 'http://localhost/API/User/SetUserHead', true); //初始化请求  post方式  接口  异步
					httpDemo.onreadystatechange = function(e) {
						if (httpDemo.readyState == 4 && httpDemo.status == 200) {
							var res = JSON.parse(httpDemo.responseText)
							if (res.StateCode == 0) {
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
				var a = myPublic.copys(vm.role);
				a.splice(a.length - 1, 1);
				var b = myPublic.copys(vm.trainChilds);
				b.splice(b.length - 1, 1);


				var _role = a.join(',')
				var _TrainId = b.join(',')



				vm.$http.post(myPublic.publicUrl + '/API/User/SaveUserInfo', {
						"Id": vm.user.Id,
						"FullName": vm.user.FullName,
						"Sex": vm.user.Sex,
						"Birthday": vm.year + '-' + (vm.month < 10 ? '0' + vm.month : vm.month) + '-' + (vm.day < 10 ? '0' + vm.day :
							vm.day), //生日
						"NativePlace": vm.user.NativePlace,
						"Nation": vm.user.Nation,
						"BloodType": vm.user.BloodType,
						"Height": vm.user.Height,
						"Weight": vm.user.Weight,
						"SportGrade": vm.user.SportGrade,
						"TrainId": _TrainId,
						"CoachId": _role,
						"Start4Training": vm.user.Start4Training,
						"Train4year": 0
					}).then(function(result) {
						if (result.body.StateCode == 0) {
							vm.quxiao();
						} else {}
					})
					.catch(function(error) {
						console.log(error);
					});


			},
			quxiao: function() {
				vm.zhuangtai = true;
				vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'), false);
				vm.userType = window.localStorage.getItem('Sport_userType');
				if (window.localStorage.getItem('Sport_userPicture')) {
					vm.personImg = window.localStorage.getItem('Sport_userPicture');
				}
			},
			getUserInfo: function(data, is) {
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
					vm.user = result.body.Data;
					vm.year = vm.user.Birthday.split('-')[0];
					vm.month = parseInt(vm.user.Birthday.split('-')[1]);
					vm.day = parseInt(vm.user.Birthday.split('-')[2]);
					var _TrainId = result.body.Data.TrainId.split(',');
					var _l = [];
					for (var i = 0; i < _TrainId.length; i++) {
						if (_TrainId[i]) {
							_l.push(_TrainId[i]);
						}
					}
					vm.trainChild = _l;
					if (is) {
						vm.zhuangtai = true;
						window.bus.$emit('person', 1);
					}

				}).catch(function(error) {
					console.log(error);
				});
			},
			//获取教练员
			GetAllDepartment: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.post(myPublic.publicUrl + '/API/Account/GetAllCoach').then(function(result) {
							if (result.body.StateCode == 0) {
								vm.roleList = result.body.Data;
								vm.$forceUpdate();
							} else {
								vm.$router.push({
									path: '/login'
								});
							}
							resolve();
						})
						.catch(function(error) {
							console.log(error);
						});
				})
			},
			//获取训练专项
			GetAllTrain: function() {
				return new Promise(function(resolve, reject) {

					vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllTrain', {
							params: {
								userName: ''
							}
						}).then(function(result) {
							if (result.body.StateCode == 0) {
								var _SystemId = ''; //id
								for (var i = 0; i < result.body.Data.length; i++) {
									if (result.body.Data[i].SystemId.length == 3) {
										vm.zhuanxiangList.push(result.body.Data[i]);
									} else {
										if (_SystemId == '' && vm.user.TrainId.split(',')[0] == result.body.Data[i].Id) {
											_SystemId = result.body.Data[i].SystemId.substr(0, 3);
										}
										vm.zhuanxiangChileList.push(result.body.Data[i]);
									}
								}
								vm.trainFirse = _SystemId;



							}
							resolve();
						})
						.catch(function(error) {
							console.log(error);
							resolve();
						});

				})
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
