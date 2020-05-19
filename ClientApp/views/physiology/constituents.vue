<template>
	<div id="physiology">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-bottom:20px;margin-right:20px;float:right;">
					<select v-if="userType == '教练'" class="sport-list" v-model="sportIndex">
						<option v-for="(item,index) in sportList" :value="index">{{item.FullName}}</option>
					</select>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
						<section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<span>-</span>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='endtime' readonly='readonly' type='text'>
						<section id="endtime-section" style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<button v-if="userType == '教练'" class="daochu" v-on:click="daochu = true">导出</button>
				</div>
				<div style="clear: both;"></div>
				<section class="shengli-main" :style="{'width':(showPingFen?'100%':'60%')}">
					<div class="body-item">
						<div class="title">
							<ul class="title-tab">
								<li class="item" :class="{'current':childNum == 3}" v-on:click="childNum = 3">数据表</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">折线图</li>
								<li class="item" :class="{'current':childNum == 1}" v-on:click="childNum = 1">睾酮/皮质醇</li>
							</ul>
							<div>生理生化<img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;" v-on:click="showPingFen = !showPingFen" /></div>
						</div>
						<section>
							<div class="table-box">
								<child-component-first v-bind:again-biao="againBiao" v-bind:show-ping-fen="showPingFen" v-bind:phy-constituents-list="phyConstituentsList" v-if="childNum == 1"></child-component-first>
								<child-component-second v-bind:again-biao="againBiao" v-bind:show-ping-fen="showPingFen" v-bind:phy-constituents-list="phyConstituentsList" v-if="childNum == 2"></child-component-second>
								<child-component-third v-bind:phy-constituents-list="phyConstituentsList" v-if="childNum == 3"></child-component-third>
							</div>
						</section>
					</div>
				</section>
				<section class="ping-fen" :style="{'margin-right':(showPingFen?'-40%':'0%')}">
					<sheng-li v-bind:show-ping-fen="showPingFen"></sheng-li>
				</section>
			</div>
		</section>
		<div class="mask" v-if="daochu">
			<div class="daochu-mask">
				<div class="title">
					<img class="close-img" src="../../assets/imgs/close.png" v-on:click="daochu = false">
					<span>选择导出项</span>
					<input v-if="daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox" name="alldaochu" v-model="allDaoChu">
					<input v-if="daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox" name="alldaochunext" v-model="allDaoChuNext">
					<span>全选/全不选</span>
				</div>
				<div v-if="daochuNum == 1" class="daochu-table">
					<div style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;" :value="item.UserId" type="checkbox" name="user" v-model="userXuanZe" />{{item.FullName}}</div>
				</div>
				<div v-if="daochuNum == 1" class="but-box"><button v-on:click="daochuNum = 2">下一步</button><button v-on:click="daochu = false">取消</button></div>

				<div v-if="daochuNum == 2" class="daochu-table">
					<table>
						<tr>
							<td><input value="Leukocyte,白细胞" type="checkbox" name="daochu" v-model="daochuList" />白细胞</td>
							<td><input value="Erythrocyte,红细胞" type="checkbox" name="daochu" v-model="daochuList" />红细胞</td>
						</tr>
						<tr>
							<td><input value="Hemoglobin,血红蛋白" type="checkbox" name="daochu" v-model="daochuList" />血红蛋白</td>
							<td><input value="Neutrophils,中性粒细胞" type="checkbox" name="daochu" v-model="daochuList" />中性粒细胞</td>
						</tr>
						<tr>
							<td><input value="Lymphocyte,淋巴细胞" type="checkbox" name="daochu" v-model="daochuList" />淋巴细胞</td>
							<td><input value="Hematocrit,血球积压" type="checkbox" name="daochu" v-model="daochuList" />红细胞积压</td>
						</tr>
						<tr>
							<td><input value="BloodUrea,血尿素" type="checkbox" name="daochu" v-model="daochuList" />血尿素</td>
							<td><input value="CreatineKinase,肌酸激酶" type="checkbox" name="daochu" v-model="daochuList" />肌酸激酶</td>
						</tr>
						<tr>
							<td><input value="Cortisol,皮质醇" type="checkbox" name="daochu" v-model="daochuList" />皮质醇</td>
							<td><input value="Testosterone,睾酮" type="checkbox" name="daochu" v-model="daochuList" />睾酮</td>
						</tr>
					</table>
				</div>
				<div v-if="daochuNum == 2" class="but-box">
					<a :href="daochuUrl">确认</a><button v-on:click="daochuNum = 1">上一步</button></div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import shengLi from '../../components/shengli.vue';
	import childComponent1 from '../physiology/childNum1.vue';
	import childComponent2 from '../physiology/childNum2.vue';
	import childComponent3 from '../physiology/childNum3.vue';
	import '../../assets/styles/physiology.css';

	export default {
		//变量
		data: function() {
			return {
				againBiao:true,
				getOnr:{},
				allDaoChu:['1'],
				allDaoChuNext:[],
				daochuNum: 1,
				userXuanZe: [],
				childNum: 3,
				daochu: false,
				daochuList: [],
				showPingFen: true,
				phyConstituentsList: [],
				userType: '',
				sportList: [],
				sportIndex: 0
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			shengLi: shengLi,
			childComponentFirst: childComponent1,
			childComponentSecond: childComponent2,
			childComponentThird: childComponent3,
			topMenu: topMenu
		},
		watch: {
			sportIndex: function(newVal, oldVal) {
				window.sportIndex = newVal;
				vm.getPhyConstituents();
			},
			allDaoChu:function(newVal,oldVal){
				if(newVal.length>0){
					vm.getSport()
				}else{
					vm.userXuanZe = [];
				}
			},
			allDaoChuNext: function(newVal, oldVal) {
				if(newVal.length > 0) {
					vm.daochuList = [
						"Leukocyte,白细胞",
						"Erythrocyte,红细胞",
						"Hemoglobin,血红蛋白",
						"Lymphocyte,淋巴细胞",
						"Hematocrit,血球积压",
						"BloodUrea,血尿素",
						"CreatineKinase,肌酸激酶",
						"Cortisol,皮质醇",
						"Testosterone,睾酮"
					];
				} else {
					vm.daochuList = [];
				}
			}

		},
		//计算属性
		computed: {
			daochuUrl: function() {
				var _nameList = [];
				var _valueList = [];
				for(var i = 0; i < vm.daochuList.length; i++) {
					if(vm.daochuList[i]) {
						if(i != 0) {
							_nameList += ',';
							_valueList += ',';
						}
						_nameList += vm.daochuList[i].split(',')[0];
						_valueList += vm.daochuList[i].split(',')[1];
					}
				}
				var data = '';
				data += "starttime=" + document.getElementById('starttime').value;
				data += "&endtime=" + document.getElementById('endtime').value;
				data += "&userid=" + vm.userXuanZe.join(',');
				data += "&projectValue=" + _nameList;
				data += "&projectName=" + _valueList;
				return myPublic.publicUrl + '/API/Excelreport/PeriodicTestExport?' + data;
			}
		},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -4), 'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
				if(window.localStorage.getItem('Sport_userType') == '教练') {
					//教练
					vm.userType = '教练';
					vm.getSport();
				} else {
					//运动员
					vm.userType = '运动员';
					vm.getPhyConstituents();
				}
				vm.setTimeInp();
			},
			//查询生理生化
			getPhyConstituents: function() {
				var userId = '';
				if(vm.userType == '教练') {
					userId = vm.sportList[vm.sportIndex].UserId;
				}
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllPeriodicTest', {
					params: {
						sportuserid: userId,
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value,
						pagesize: 999,
						pageindex: 1
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.phyConstituentsList = result.body.Data;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//获取远动员列表
			getSport: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Account/GetMySportsman', {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.sportList = result.body.Data;
						for(var i = 0; i < result.body.Data.length; i++) {
							vm.userXuanZe.push(result.body.Data[i].UserId);
						}
						if(result.body.Data && result.body.Data.length > 0) {
							vm.sportIndex = window.sportIndex ? window.sportIndex : 0;
							vm.getPhyConstituents();
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
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date2 == '' || isDate) {
						vm.getPhyConstituents();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
					vm.getPhyConstituents();
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null, 'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 < _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						vm.getPhyConstituents();
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date1 == '' || isDate) {
						vm.getPhyConstituents();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
					vm.getPhyConstituents();
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {
			window.bus.$off('pingfen');
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