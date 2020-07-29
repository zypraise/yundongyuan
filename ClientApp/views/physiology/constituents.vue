<template>
	<div id="physiology">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-bottom:20px;margin-right:20px;float:right;">
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
						<section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<span>-</span>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='endtime' readonly='readonly' type='text'>
						<section id="endtime-section" style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<button class="daochu" v-on:click="getPhyConstituents()">查询</button>
				</div>
				<div style="clear: both;"></div>
				<section class="shengli-main">
					<div class="body-item">
						<div class="title">
							<div style="float: right;"><img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;" v-on:click="showPingFen = false" /></div>
							<ul class="title-tab">
								<li class="item" :class="{'current':childNum == 3}" v-on:click="childNum = 3">数据表</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">折线图</li>
							</ul>
						</div>
						<section>
							<div class="table-box">
								<child-component-second v-bind:again-biao="againBiao" v-bind:show-ping-fen="showPingFen" v-bind:phy-constituents-list="phyConstituentsList" v-if="childNum == 2"></child-component-second>
								<child-component-third v-bind:phy-constituents-list="phyConstituentsList" v-bind:sortlist='sortlist' v-if="childNum == 3"></child-component-third>
							</div>
						</section>
					</div>
				</section>
				<section class="ping-fen" :style="{'display':(showPingFen?'none':'block')}">
					<sheng-li></sheng-li>
				</section>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import shengLi from '../../components/shengli.vue';
	import childComponent2 from '../physiology/childNum2.vue';
	import childComponent3 from '../physiology/childNum3.vue';
	import '../../assets/styles/physiology.css';

	export default {
		//变量
		data: function() {
			return {
				sortlist:[
					{
						type:'Testdate',
						is:true,
						sort:true
					},
					{
						type:'SportName',
						is:false,
						sort:false
					}
				],
				againBiao:true,
				getOnr:{},
				childNum: 0,
				showPingFen: true,
				phyConstituentsList: []
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			shengLi: shengLi,
			childComponentSecond: childComponent2,
			childComponentThird: childComponent3,
			topMenu: topMenu
		},
		watch: {
		},
		//计算属性
		computed: {
		},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -4), 'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
				window.bus.$on('sortlist', function(val){
					vm.sortlist = val;
					vm.getPhyConstituents();
				});
					vm.setTimeInp();
					vm.getPhyConstituents()
					vm.childNum = 3;
			},
			//查询生理生化
			getPhyConstituents: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllPeriodicTest', {
					params: {
						trainId: '',
						trainSecId: '',
						sex: '',
						sportuserid: JSON.parse(window.localStorage.getItem('user')).Id,
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value,
						sort:'',
						pagesize: 9999,
						pageindex: 1
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						vm.phyConstituentsList = result.body.Data?result.body.Data:[];
						vm.againBiao = !vm.againBiao;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date2 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null, 'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 < _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date1 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {
			window.bus.$off('pingfen');
			window.bus.$off('sortlist');
			
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function(){
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function(){
					vm.againBiao = !vm.againBiao;
				},200);
			}
		}
	}
</script>