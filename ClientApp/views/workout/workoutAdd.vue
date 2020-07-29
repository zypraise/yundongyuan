<template>
	<div id="workout">
		<header-component></header-component>
		<section class="content">
			<top-menu style="min-width: 1172px;"></top-menu>
			<div class="index-content">
				<div style="clear: both;"></div>
				<section style="height: 100%;min-width: 1172px;">

					<div class="injury-menu">
						<div class="title">运动员</div>
						<section>
							<ul class="injury-menu-list">
								<li v-for="(item,index) in sportList" :style="{'background-color':sportIndex == index?'#fafafa':'#FFFFFF'}"
								 v-on:click="sportIndex = index">
									<img v-if="item.Img" class="portrait" :src="url + item.Img">
									<img v-else class="portrait" src="../../assets/imgs/person.png">
									<img v-if="sportIndex == index" class="right" src="../../assets/imgs/right.png" />
									<div class="injury-menu-text">
										<p>{{item.FullName}}</p>
										<p>{{item.TrainName}}</p>
									</div>
								</li>
							</ul>

						</section>
					</div>
					<div class="injury-main">
						<div class="title">体能训练</div>
						<div class="box">
							<div class="workout-inp">
								<div class="top">
									<span>时间</span>
									<section class='mydate-box'>
										<input class='form_datetime' onclick='myDate.getFocus(this)' id='staminaTime' readonly='readonly' type='text'>
										<section style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()" v-on:blur="getSportValue(sportIndex)"></section>
									</section>
								</div>
								<div class="workout-inp-main">
									<div v-for="(item,index) in trainList" class="item">
										<label>{{item.Name}}</label>
										<input type="text" v-model="trainList[index].Value" />
									</div>
									<div style="clear: both;"></div>
								</div>
							</div>
							<section style="text-align: center;">
								<button class="workout-inp-but1" v-on:click="save()">保存</button><button class="workout-inp-but2" v-on:click="closeChild(1)">返回</button>
							</section>
						</div>
					</div>
				</section>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import '../../assets/styles/workout.css';
	export default {
		//变量
		data: function() {
			return {
				url: '',
				trainList: [], //训练项目
				sportList: [], //运动员
				sportIndex: 0,
				sex: ''
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {
			sportIndex: function(newVal, oldVal) {
				var a = vm.sportList[newVal];
				
				vm.getSportItem();
			},
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('staminaTime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				vm.url = myPublic.publicUrl;
				if (vm.userType == '分队教练' || vm.userType == '运动员') {
					vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
				}
				vm.getSport();
			},
			//查询体能测试项目
			getSportItem: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetTrainName?sportuserid=' + vm.sportList[vm.sportIndex].UserId, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						var _l = result.body.Data;
						for (var i = 0; i < _l.length; i++) {
							_l[i].Value = ""; //项目值
							_l[i].TestDate = ""; //评测时间
						}
						vm.trainList = _l;

						vm.getSportValue();
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			getSportValue: function(i) {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetNewTrainResult?sportuserid=' + vm.sportList[vm.sportIndex].UserId +
					'&date=' +
					document.getElementById('staminaTime').value, {
						headers: {
							token: window.localStorage.getItem('Sport_Access_Token')
						}
					}).then(function(result) {
					if (result.body.StateCode == 0) {
						for (var i = 0; i < vm.trainList.length; i++) {
							vm.trainList[i].Value = result.body.Data[i] ? result.body.Data[i].Value : ''; //项目值
						}
					} else if (result.body.StateCode == 100) {
						myPublic.alertResult('还未配置体能项目');
						return;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//查询运动员
			getSport: function() {
				var _l = JSON.parse(window.localStorage.getItem('user')).TrainId.split(',')
				if(_l[_l.length -1] == ''){
					_l.splice(_l.length -1,1);
				}
				var _trainFId = '';
				if(!(_l == 0 || _l > 1)){
					_trainFId = _l[0];
				}
				
				
				vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?'+'trainFId=' + _trainFId + '&trainId=' + '' + '&sex=' + vm.sex, {})
					.then(function(
						result) {
						if (result.body.StateCode == 0) {
							vm.sportList = result.body.Data;
							if (result.body.Data && result.body.Data.length > 0) {
								vm.sportIndex = 0;
							}
							vm.getSportItem();
						} else {
							vm.$router.push({
								path: '/login'
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
			},
			//保存体能训练
			save: function() {
				var _list = [];
				for (var i = 0; i < vm.trainList.length; i++) {
					_list.push({
						TrainId: vm.trainList[i].TrainId, //项目id
						Value: vm.trainList[i].Value, //项目值
						TestDate: document.getElementById('staminaTime').value //评测时间
					});
				}
				vm.$http.post(myPublic.publicUrl + '/API/Test/SaveTrainResult?sportuserid=' + vm.sportList[vm.sportIndex].UserId,
						_list, {
							headers: {
								token: window.localStorage.getItem('Sport_Access_Token')
							}
						}).then(function(result) {
						if (result.body.StateCode == 0) {
							myPublic.alertResult(result.body.Message);
							// vm.closeChild(1);
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			closeChild: function(num) {
				vm.$router.back(-1);
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {},
		mounted: function() {
			vm.start();
		}
	}
</script>
