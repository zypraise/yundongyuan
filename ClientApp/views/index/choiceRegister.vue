<template>
	<div id="index-choice-register">
		<header-component></header-component>
		<section class="choice">
			<p class="choice-header">选择教练</p>
			<ul class="choice-mian">
				<li v-for="(tCListItem, roleIndex) in role" :style="{'margin-top':roleIndex == 0 ? '0px' : '-20px'}">
					<label><span v-if="roleIndex == 0"><span class="red-text">*</span>教练员：</span></label>
					<section>
						<div class="inp">
							<select v-model="role[roleIndex]">
								<option value="">-教练-</option>
								<option v-for="item in roleList" :value="item.Id">{{item.Name}}</option>
							</select>
						</div>
					</section>
					<img class="cuo" v-on:click="closeZhuanXiang(roleIndex)" v-if="role[roleIndex]" src="../../assets/imgs/cuo.png" />
					<p v-if="roleIndex == role.length - 1" class="is" v-html="isRole"></p>
				</li>
				<li style="margin: 0px -25px;"><button class="choice-but" v-on:click="next()">确认教练</button><button class="back-but"
					 v-on:click="back()">跳过</button></li>
			</ul>
		</section>
	</div>
</template>

<script>
	var vm;
	import header from '../../components/header.vue';
	export default {
		//变量
		data: function() {
			return {
				role: [''],
				roleList: [],
				isRole: ''
			}
		},
		//公共模板
		components: {
			headerComponent: header
		},
		watch: {
			roleJson: function(newVal, oldVal) {
				var _d = JSON.parse(newVal);
				if (window.t) {
					clearTimeout(window.t);
				}
				window.t = '';
				window.t = setTimeout(function() {
					if (_d[_d.length - 1] != '') {
						window.t = '';
						vm.role.push('');
						return;
					} else {
						vm.role = Array.from(new Set(_d))
					}
					if (_d.length == 1) {
						vm.isRole = '专项不得为空';
					} else {
						vm.isRole = '';
					}
					window.t = '';
				}, 50);
			},
		},
		//计算属性
		computed: {
			roleJson: function() {
				return JSON.stringify(vm.role);
			},
		},
		methods: {
			start: function() {
				vm.getAllCoach();
			},
			closeZhuanXiang: function(i) {

				vm.role.splice(i, 1);
			},
			getAllCoach: function() {

				vm.$http.post(myPublic.publicUrl + '/API/Account/GetAllCoach').then(function(result) {
						if (result.body.StateCode == 0) {
							vm.roleList = result.body.Data;
							vm.$forceUpdate();
						} else {
							vm.$router.push({
								path: '/login'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			next: function() {
				var _l = Object.assign([], vm.role);
				_l.splice(_l.length -1, 1);
				vm.$http.post(myPublic.publicUrl + '/API/Account/SelectSportsCoach',_l).then(function(result) {
						if (result.body.StateCode == 0 || result.body.Data) {
							vm.$router.push({
								path: '/subjective'
							});
						} else {
							vm.$router.push({
								path: '/login'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				
				
				vm.$router.push({
					path: '/subjective'
				});
			},
			back: function() {
				vm.$router.push({
					path: '/subjective'
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
