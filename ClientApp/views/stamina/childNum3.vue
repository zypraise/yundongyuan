<template>
	<section style="height: 100%;">

		<div class="injury-menu">
			<div class="title">运动员</div>
			<section>
				<ul class="injury-menu-list">
					<li>
						<img class="portrait" v-if="picture" :src="picture">
    					<img class="portrait" v-else  src="../../assets/imgs/person.png">
						<img class="right" src="../../assets/imgs/right.png" />
						<div class="injury-menu-text">
							<p>{{user.FullName}}</p>
							<p>{{user.TrainName}}</p>
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
							<section style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()" v-on:blur="getSportValue()"></section>
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
				user: '',
				picture:'',
				trainList: []
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.user = JSON.parse(window.localStorage.getItem('user'));
				vm.picture = window.localStorage.getItem('Sport_userPicture');
				document.getElementById('staminaTime').value = myPublic.dateForFormat(null,'yyyy-MM-dd')
				vm.getSport();
			},
			//查询体能测试项目
			getSport: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetTrainName', {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.trainList = result.body.Data;
						for(var i = 0; i < result.body.Data.length; i++) {
							vm.trainList[i].Value = ""; //项目值
							vm.trainList[i].TestDate = ""; //评测时间
						}
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
			getSportValue: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetNewTrainResult?sportuserid='+'&date='+document.getElementById('staminaTime').value, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						for(var i = 0; i < vm.trainList.length; i++) {
							vm.trainList[i].Value = result.body.Data[i]?result.body.Data[i].Value:''; //项目值
						}
						vm.$forceUpdate();
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
				vm.$http.post(myPublic.publicUrl + '/API/Test/SaveTrainResult?sportuserid=', _list, {
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
				window.bus.$emit('stamina', num)
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