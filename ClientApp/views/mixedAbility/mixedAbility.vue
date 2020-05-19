<template>
	<div id="mixedAbility">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div class="injury-menu">
					<div class="title">运动员</div>
					<section>
						<ul class="injury-menu-list">
							<li v-for="(item,index) in sportList" v-on:click="sportIndex = index">
								<img class="portrait" src="../../assets/imgs/person.png">
								<img v-if="sportIndex == index" class="right" src="../../assets/imgs/right.png" />
								<div class="injury-menu-text">
									<p>{{item.FullName}}</p>
									<p>{{item.FullName}}</p>
								</div>
							</li>
						</ul>
						
					</section>
				</div>
				<div class="injury-main">
					<div class="title">综合能力</div>
					<div class="box">
						
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
	import '../../assets/styles/mixedAbility.css';
	export default {
		//变量
		data: function() {
			return {
				sportList: [], //运动员列表
				sportIndex: 0
			}
		},
		watch: {
			sportIndex: function(newVal, oldVal) {
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu:topMenu
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.getSport();
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
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>