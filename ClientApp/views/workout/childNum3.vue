<template>
	<section style="height: 100%;min-width: 1172px;">

		<div class="injury-menu">
			<div class="title">运动员</div>
			<section>
				<ul class="injury-menu-list">
					<li v-for="(item,index) in sportList" :style="{'background-color':sportIndex == index?'#fafafa':'#FFFFFF'}" v-on:click="sportIndex = index">
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
					<button class="workout-inp-but1" v-on:click="save()">保存</button><button class="workout-inp-but2" v-on:click="closeChild(1)">取消</button>
				</section>
			</div>
		</div>
	</section>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {
				url:'',
				trainList: [],//训练项目
				sportList:[],//运动员
				sportIndex: 0
			}
		},
		watch: {
			sportIndex: function(newVal, oldVal) {
				vm.getSportValue(newVal);
			},
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('staminaTime').value = myPublic.dateForFormat(null,'yyyy-MM-dd');
				vm.url = myPublic.publicUrl;
				vm.getSport();
			},
			//查询体能测试项目
			getSportItem: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetTrainName', {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						var _l = result.body.Data;
						for(var i = 0; i < _l.length; i++) {
							_l[i].Value = ""; //项目值
							_l[i].TestDate = ""; //评测时间
						}
						vm.trainList = _l;
						
				vm.getSportValue(0);
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
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetNewTrainResult?sportuserid='+vm.sportList[i].UserId+'&date='+document.getElementById('staminaTime').value, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						for(var i = 0; i < vm.trainList.length; i++) {
								vm.trainList[i].Value = result.body.Data[i]?result.body.Data[i].Value:''; //项目值
						}
					} else if(result.body.StateCode == 100){
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
				vm.$http.get(myPublic.publicUrl + '/API/Account/GetMySportsman', {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.sportList = result.body.Data;
						if(result.body.Data && result.body.Data.length > 0) {
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
				for(var i = 0; i < vm.trainList.length; i++) {
					_list.push({
						TrainId: vm.trainList[i].TrainId, //项目id
						Value: vm.trainList[i].Value, //项目值
						TestDate: document.getElementById('staminaTime').value //评测时间
					});
				}
				vm.$http.post(myPublic.publicUrl + '/API/Test/SaveTrainResult?sportuserid='+vm.sportList[vm.sportIndex].UserId, _list, {
						headers: {
							token: window.localStorage.getItem('Sport_Access_Token')
						}
					}).then(function(result) {
						if(result.body.StateCode == 0) {
							myPublic.alertResult(result.body.Message);
							vm.closeChild(1);
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
		mounted: function() {
			vm.start();
		}
	}
</script>