<template>
	<div id="stamina">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-right:20px;margin-bottom:20px; float:right;">
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
						<section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<span>-</span>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='endtime' readonly='readonly' type='text'>
						<section id="endtime-section" style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<button class="daochu" v-on:click="isGetList = !isGetList;">查询</button>
				</div>
				<div style="clear: both;"></div>
				
				<section v-if="childNum == 1">
					<jichu :is-get-list="isGetList" :plist-type="plistType"></jichu>
				</section>
				<section v-if="childNum == 2">
					<zhuanxiang :is-get-list="isGetList"></zhuanxiang>
				</section>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	// import pingFen from '../../components/pingFen.vue';
	import jichu from '../stamina/childNum1.vue';
	import zhuanxiang from '../stamina/childNum2.vue';
	import '../../assets/styles/stamina.css';

	export default {
		//变量
		data: function() {
			return {
				isGetList:true,
				childNum:0,
				showPingFen: true,
				plistType:1
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			jichu: jichu,
			// pingFen: pingFen,
			zhuanxiang: zhuanxiang,
			topMenu: topMenu
		},
		watch: {},
		beforeRouteEnter(to, from, next) {
			if(from.fullPath == '/staminaAdd'){
				window.localStorage.setItem('workoutFrom','0')
			}else{
				window.localStorage.setItem('workoutFrom','1')
			}
		    next();
		  },
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -2), 'yyyy-MM-dd')
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd')
				vm.setTimeInp();
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
				window.bus.$on('stamina', function(val) {
					vm.childNum = val.split(',')[0];
					vm.plistType = val.split(',')[1];
					vm.isGetList = !vm.isGetList;
				});
				if(window.localStorage.getItem('workoutFrom') == '0'){
					vm.childNum = 2;
				}else{
					vm.childNum = 1;
				}
			},
			setTimeInp:function(){
				document.getElementById('starttime-section').addEventListener('blur',function(){
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0]*10000 + _date1.split('-')[1]*100 + _date1.split('-')[2]*1 <= _date2.split('-')[0]*10000 + _date2.split('-')[1]*100 + _date2.split('-')[2]*1;
					if(_date2 == '' || isDate){
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
				});
				document.getElementById('endtime-section').addEventListener('blur',function(){
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null,'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 < _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						return;
					}
					var isDate = _date1.split('-')[0]*10000 + _date1.split('-')[1]*100 + _date1.split('-')[2]*1 <= _date2.split('-')[0]*10000 + _date2.split('-')[1]*100 + _date2.split('-')[2]*1;
					if(_date1 == '' || isDate){
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
			window.bus.$off('stamina');
		},
		mounted: function() {
			vm.start();
		}
	}
</script>