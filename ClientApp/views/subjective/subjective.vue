<template>
	<div id="subjective">
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
					<button class="daochu" v-on:click="getList()">查询</button>
				</div>
				<div style="clear: both;"></div>
				<section class="ti-cheng-fen" v-if="isshow && childNum == 1">
					<subjective-index v-bind:shuaxin="shuaxin" v-bind:sortlist='sortlist' v-bind:body-list="bodyList"></subjective-index>
				</section>
				
				<section class="ti-cheng-fen" v-if="isshow && childNum == 2">
					<subjective-count v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList" v-bind:again-biao="againBiao"></subjective-count>
				</section>
				
				<section class="ti-cheng-fen" v-if="isshow && childNum == 3">
					<subjective-lei-da v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList" v-bind:again-biao="againBiao"></subjective-lei-da>
				</section>
				
				<section class="ti-cheng-fen" v-if="isshow && childNum == 4">
					<subjective-train v-bind:shuaxin="shuaxin" v-bind:again-biao="againBiao"></subjective-train>
				</section>
				<section class="ping-fen" v-if="isshow" :style="{'display':(showPingFen?'none':'block')}">
					<ping-fen v-bind:show-ping-fen="showPingFen"></ping-fen>
				</section>

			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import {
		getSortText
	} from '../../components/sort.js';
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import pingFen from '../../components/pingFen.vue';
	import subjectiveIndex from '../subjective/subjective-index.vue';
	import subjectiveCount from '../subjective/subjective-count.vue';
	import subjectiveTrain from '../subjective/subjective-train.vue';
	import subjectiveLeiDa from '../subjective/subjective-leida.vue';
	import '../../assets/styles/subjective.css';

	export default {
		//变量
		data: function() {
			return {
				sortlist:[
					{
						type:'DateSign',
						is:true,
						sort:false
					},
					{
						type:'SportName',
						is:false,
						sort:false
					}
				],
				againBiao:true,
				getOnr:{},
				showPingFen: true,
				shuaxin:true,
				isshow:false,
				bodyList:[],
				childNum:1
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			pingFen: pingFen,
			subjectiveIndex: subjectiveIndex,
			subjectiveCount: subjectiveCount,
			subjectiveTrain: subjectiveTrain,
			subjectiveLeiDa:subjectiveLeiDa,
			topMenu: topMenu
		},
		watch: {
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddDayDate(null, -14), 'yyyy-MM-dd')
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd')
				vm.isshow = true;
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
				window.bus.$on('childNum', function(val) {
					vm.childNum = val;
				});
				window.bus.$on('sortlist', function(val){
					vm.sortlist = val;
					vm.getList();
				});
				vm.setTimeInp();
				vm.getList();
			},
			getList:function(){
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllUserSubjective', {
					params: {
						trainId: '',
						trainSecId: '',
						sex: '',
						sportuserid: JSON.parse(window.localStorage.getItem('user')).Id,
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value,
						sort:getSortText(vm.sortlist),
						pagesize: 9999,
						pageindex: 1
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.bodyList = result.body.Data?result.body.Data:[];
						vm.shuaxin = !vm.shuaxin;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
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
			window.bus.$off('childNum');
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