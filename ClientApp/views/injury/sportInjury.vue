<template>
	<div id="injury">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div class="injury-menu">
					<div class="title">运动员</div>
					<section>
						<ul class="injury-menu-list">
							<li>
								<img class="portrait" :src="img">
								<img class="right" src="../../assets/imgs/right.png" />
								<div class="injury-menu-text">
									<p>{{user.FullName}}</p>
									<p :title="user.TrainName">{{user.TrainName}}</p>
								</div>
							</li>
						</ul>

					</section>
				</div>
				<div class="injury-main">
					<div class="title">伤病记录</div>
					<div class="box">
						<!--<div class="item" v-for="(item,index) in doctorList">
							<div class="item-top">
								<span>{{item.Date}}</span>
							</div>
							<div class="item-val">{{item.Record}}</div>
						</div>-->
						<div style="background-color: #FFFFFF; margin: 20px 20px 0px 20px;position:  relative;z-index: 1;">
							<table>
								<tr>
									<th style="width: 120px;">时间</th>
									<th>伤病记录</th>
								</tr>
							</table>
						</div>
						<div style="position: absolute;left: 20px;right: 20px;top: 20px;bottom: 20px;overflow-y: auto;overflow-x: hidden;">
							<table>
								<tr></tr>
								<tr v-for="(item,index) in doctorList">
									<td style="width: 120px;">{{item.Date}}</td>
									<td style="text-align: left;">{{item.Record}}</td>
								</tr>
							</table>
							
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import '../../assets/styles/injury.css';

	export default {
		//变量
		data: function() {
			return {
				doctorList: [], //伤病记录
				img: '',
				user: {}

			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				if(window.localStorage.getItem('Sport_userPicture')) {
					vm.img = window.localStorage.getItem('Sport_userPicture');
				} else {
					vm.img = 'wwwroot/dist/images/person.png';
				}
				console.log(window.localStorage.getItem('Sport_userPicture'));
				console.log(vm.img);
				vm.user = JSON.parse(window.localStorage.getItem('user'));
				vm.getDoctor();
			},
			//查询伤病记录
			getDoctor: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllDoctorRecord', {
					params: {
						userid: '',
						pagesize: 9999,
						pageindex: 1
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.doctorList = result.body.Data;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
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