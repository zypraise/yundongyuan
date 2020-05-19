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
							<li v-for="(item,index) in sportList" :style="{'background-color':sportIndex == index?'#fafafa':'#FFFFFF'}" v-on:click="sportIndex = index">
								<img v-if="item.Img" class="portrait" :src="url + item.Img">
								<img v-else class="portrait" src="../../assets/imgs/person.png">
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
					<div class="title">
						<div class="injury-add">
							<!--<img v-on:click="showMask = true" src="../../assets/imgs/add.png" />
							<span>添加记录</span>-->
						</div>
						<span>伤病记录</span>
					</div>
					<div class="box">
						<!--<div class="item" v-for="(item,index) in doctorList">
							<div class="item-top">
								<img v-on:click="del()" style="cursor: pointer;width: 26px;float: right;margin: 10px 0px;" src="../../assets/imgs/del.png" />
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
		<div class="mask" v-if="showMask">
			<div class="injury-mask-box">
				<div class="top">伤病记录</div>
				<div class="main">
					<textarea v-model="doctorText"></textarea>
				</div>
				<div class="but-box">
					<button v-on:click="save()">确认</button>
					<button v-on:click="showMask = false">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';

	export default {
		//变量
		data: function() {
			return {
				url:'',
				sportList: [], //运动员列表
				doctorList: [], //伤病记录
				showMask: false, //显示添加伤病记录
				doctorText:'',
				sportIndex: 0
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {
			sportIndex: function(newVal, oldVal) {
				vm.getDoctor();
			},
			//关闭窗口清空信息
			showMask:function(newVal,oldVal){
				if(!newVal){
					vm.doctorText = '';
				}
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.url = myPublic.publicUrl;
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
							vm.getDoctor();
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
			//查询伤病记录
			getDoctor: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllDoctorRecord', {
					params: {
						userid: vm.sportList[vm.sportIndex].UserId,
						pagesize:9999,
						pageindex:1
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
			},
			save:function(){
				
			},
			del:function(){}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>