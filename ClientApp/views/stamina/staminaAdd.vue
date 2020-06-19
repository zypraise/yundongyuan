<template>
	<div id="stamina">
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
	import '../../assets/styles/stamina.css';
	export default {
		//变量
		data: function() {
			return {
				url: '',
				user:'',
				trainList: [], //训练项目
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.user = JSON.parse(window.localStorage.getItem('user'));
				document.getElementById('staminaTime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				vm.url = myPublic.publicUrl;
				vm.getSportItem();
			},
			//查询体能测试项目
			getSportItem: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrainNames?sex=' + '', {
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
			getSportValue: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetNewTrainResult?sportuserid=' + vm.user.Id +
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
				vm.$http.post(myPublic.publicUrl + '/API/Test/SaveTrainResult?sportuserid=' + vm.user.Id,
						_list, {
							headers: {
								token: window.localStorage.getItem('Sport_Access_Token')
							}
						}).then(function(result) {
						if (result.body.StateCode == 0) {
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
		beforeDestroy: function() {},
		mounted: function() {
			vm.start();
		}
	}
</script>
