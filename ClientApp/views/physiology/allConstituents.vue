<template>
	<div id="physiology">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-bottom:20px;margin-right:20px;float:right;">
					<select v-if="userType != '运动员'" class="sport-list" v-model="trainFirse">
						<!-- <option v-if="userType == '超级管理员'" value="">-全部大项-</option> -->
						<option value="">-全部大项-</option>
						<option :value="index" v-for="(item,index) in zhuanxiangList" v-if="item.SystemId.length == 3">{{item.Name}}</option>
					</select>
					<select v-if="userType != '运动员'" class="sport-list" v-model="trainId">
						<option value="">-全部小项-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangLists" v-if="item.SystemId.length == 6 && trainFirse !== '' && item.SystemId.substr(0,3) == zhuanxiangList[trainFirse].SystemId">{{item.Name}}</option>
					</select>
					<select v-if="userType != '运动员' && userType != '分队教练'" class="sport-list" v-model="sex">
						<option value="">-全部性别-</option>
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
					<select v-if="userType != '运动员'" class="sport-list" v-on:change="getList()" v-model="sportIndex">
						<option value="">-全部运动员-</option>
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

					<button class="daochu" v-on:click="getList()">查询</button>
					<!-- <button class="daochu" v-on:click="daochu = true">导出</button> -->
				</div>
				<div style="clear: both;"></div>
				<section class="shengli-main">
					<div class="body-item">
						<div class="title">
							<div style="float: right;" v-if="childNum == 2 || childNum == 3"><img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
								 v-on:click="showPingFen = false" /></div>
							<ul class="title-tab">
                <li class="item" :class="{'current':childNum == 1}" v-on:click="childNum = 1">尿十项</li>
                <li class="item" :class="{'current':childNum == 3}" v-on:click="childNum = 3">生理生化</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">柱状图</li>
							</ul>
						</div>
						<section>
							<div class="table-box">
                <child-component-first v-bind:urine-list="urineList" v-bind:sortlist='sortUrine' v-if="childNum == 1"></child-component-first>
								<child-component-second v-bind:userId="userId" v-bind:again-biao="againBiao" v-bind:show-ping-fen="showPingFen"
								 v-bind:phy-constituents-list="phyConstituentsList" v-if="childNum == 2"></child-component-second>
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
		<div class="mask" v-if="daochu">
			<div class="daochu-mask">
				<div class="title">
					<img class="close-img" src="../../assets/imgs/close.png" v-on:click="daochu = false">
					<span>选择导出项</span>
					<input v-if="daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox"
					 name="alldaochu" v-model="allDaoChu">
					<input v-if="daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox"
					 name="alldaochunext" v-model="allDaoChuNext">
					<span>全选/全不选</span>
				</div>
				<div v-if="daochuNum == 1" class="daochu-table">
					<div style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;"
						 :value="item.FullName" type="checkbox" name="user" v-model="userXuanZe" />{{item.FullName}}</div>
				</div>
				<div v-if="daochuNum == 1" class="but-box"><button v-on:click="daochuNum = 2">下一步</button><button v-on:click="daochu = false">取消</button></div>

				<div v-if="daochuNum == 2" class="daochu-table">
					<table>
						<tr>
							<td><input value="Leukocyte" type="checkbox" name="daochu" v-model="daochuList" />白细胞</td>
							<td><input value="Erythrocyte" type="checkbox" name="daochu" v-model="daochuList" />红细胞</td>
						</tr>
						<tr>
							<td><input value="Hemoglobin" type="checkbox" name="daochu" v-model="daochuList" />血红蛋白</td>
							<td><input value="Hematocrit" type="checkbox" name="daochu" v-model="daochuList" />血球压积</td>
						</tr>
						<tr>
							<td><input value="Lymphocyte" type="checkbox" name="daochu" v-model="daochuList" />淋巴细胞</td>
							<td><input value="Neutrophils" type="checkbox" name="daochu" v-model="daochuList" />中性粒细胞</td>
						</tr>
						<tr>
							<td><input value="BloodUrea" type="checkbox" name="daochu" v-model="daochuList" />血尿素</td>
							<td><input value="CreatineKinase" type="checkbox" name="daochu" v-model="daochuList" />肌酸激酶</td>
						</tr>
						<tr>
							<td><input value="Cortisol" type="checkbox" name="daochu" v-model="daochuList" />皮质醇</td>
							<td><input value="Testosterone" type="checkbox" name="daochu" v-model="daochuList" />睾酮</td>
						</tr>
						<tr>
							<td><input value="TestosteroneOrCortisol" type="checkbox" name="daochu" v-model="daochuList" />睾酮/皮质醇</td>
							<td><input value="EvaluationContent" type="checkbox" name="daochu" v-model="daochuList" />评价</td>
						</tr>
					</table>
				</div>
				<div style="height: 0px;overflow: hidden;">
					<table id="daochu">
						<tr>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;">测试时间</th>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;">运动员</th>
							<th>运动项目</th>
							<th>参赛主项</th>
							<th>年龄</th>
							<th>性别</th>
							<th v-if="daochuList.indexOf('Leukocyte')>=0">白细胞</th>
							<th v-if="daochuList.indexOf('Erythrocyte')>=0">红细胞</th>
							<th v-if="daochuList.indexOf('Hemoglobin')>=0">血红蛋白</th>
							<th v-if="daochuList.indexOf('Hematocrit')>=0">血球压积</th>
							<th v-if="daochuList.indexOf('Lymphocyte')>=0">淋巴细胞</th>
							<th v-if="daochuList.indexOf('Neutrophils')>=0">中性粒细胞</th>
							<th v-if="daochuList.indexOf('BloodUrea')>=0">血尿素</th>
							<th v-if="daochuList.indexOf('CreatineKinase')>=0">肌酸激酶</th>
							<th v-if="daochuList.indexOf('Cortisol')>=0">皮质醇</th>
							<th v-if="daochuList.indexOf('Testosterone')>=0">睾酮</th>
							<th v-if="daochuList.indexOf('TestosteroneOrCortisol')>=0">睾酮/皮质醇</th>
							<th v-if="daochuList.indexOf('EvaluationContent')>=0">评价</th>
						</tr>
						<tr v-for="item in phyConstituentsList" v-if="userXuanZe.indexOf(item.SportName) >= 0">
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.Testdate}}</th>

							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
							<td>{{item.TrainName}}</td>
							<td>{{item.TrainSecName}}</span></td>
							<td>{{item.Age?item.Age:'-'}}</td>
							<td>{{item.Sex}}</td>

							<td v-if="daochuList.indexOf('Leukocyte')>=0">{{item.Leukocyte}}</td>
							<td v-if="daochuList.indexOf('Erythrocyte')>=0">{{item.Erythrocyte}}</td>
							<td v-if="daochuList.indexOf('Hemoglobin')>=0">{{item.Hemoglobin}}</td>
							<td v-if="daochuList.indexOf('Hematocrit')>=0">{{item.Hematocrit}}</td>
							<td v-if="daochuList.indexOf('Lymphocyte')>=0">{{item.Lymphocyte}}</td>
							<td v-if="daochuList.indexOf('Neutrophils')>=0">{{item.Neutrophils}}</td>
							<td v-if="daochuList.indexOf('BloodUrea')>=0">{{item.BloodUrea}}</td>
							<td v-if="daochuList.indexOf('CreatineKinase')>=0">{{item.CreatineKinase}}</td>
							<td v-if="daochuList.indexOf('Cortisol')>=0">{{item.Cortisol}}</td>
							<td v-if="daochuList.indexOf('Testosterone')>=0">{{item.Testosterone}}</td>
							<td v-if="daochuList.indexOf('TestosteroneOrCortisol')>=0">{{item.Testosterone > 0?(item.Testosterone/item.Cortisol).toFixed(2):0}}</td>
							<td v-if="daochuList.indexOf('EvaluationContent')>=0">{{item.EvaluationContent?item.EvaluationContent:'-'}}</td>

						</tr>
					</table>
				</div>
				<div v-if="daochuNum == 2" class="but-box">
					<button v-on:click="mytableExcel('daochu')">确认</button><button v-on:click="daochuNum = 1">上一步</button></div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
	import {
		getSortText
	} from '../../components/sort.js';
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
				sortlist:[
					{
						type:'Testdate',
						is:true,
						sort:false
					},
					{
						type:'SportName',
						is:false,
						sort:false
					},
					{
						type:'Leukocyte',
						is:false,
						sort:false
					},
					{
						type:'Erythrocyte',
						is:false,
						sort:false
					},
					{
						type:'Hemoglobin',
						is:false,
						sort:false
					},
					{
						type:'Hematocrit',
						is:false,
						sort:false
					},
					{
						type:'Lymphocyte',
						is:false,
						sort:false
					},
					{
						type:'Neutrophils',
						is:false,
						sort:false
					},
					{
						type:'BloodUrea',
						is:false,
						sort:false
					},
					{
						type:'CreatineKinase',
						is:false,
						sort:false
					},
					{
						type:'Cortisol',
						is:false,
						sort:false
					},
					{
						type:'Testosterone',
						is:false,
						sort:false
					}
				],
        sortUrine: [
          {
            type:'Testdate',
            is:true,
            sort:false
          },
          {
            type:'SportName',
            is:false,
            sort:false
          },
          {
            type: 'Usg',
            is:false,
            sort:false
          },
          {
            type: 'PH',
            is:false,
            sort:false
          },
          {
            type: 'PRO',
            is:false,
            sort:false
          },
          {
            type: 'NIT',
            is:false,
            sort:false
          },
          {
            type: 'BLO',
            is:false,
            sort:false
          },
          {
            type: 'WBC',
            is:false,
            sort:false
          },
          {
            type: 'GLU',
            is:false,
            sort:false
          },
          {
            type: 'BIL',
            is:false,
            sort:false
          },
          {
            type: 'KET',
            is:false,
            sort:false
          },
          {
            type: 'URO',
            is:false,
            sort:false
          }
        ],
				againBiao: true,
				getOnr: {},
				allDaoChu: ['1'],
				allDaoChuNext: [],
				daochuNum: 1,
				userXuanZe: [],
				childNum: 1,
				daochu: false,
				daochuList: [],
				showPingFen: true,
				phyConstituentsList: [],
        urineList: [],//尿十项列表
				userType: '',

				sex: '',
				trainId: '', //小项
				trainFirse: '', //专项父级
				zhuanxiangList: [], //项目列表
				zhuanxiangLists: [], //项目列表


				sportList: [],
				sportIndex: ''
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
      childNum:function(){
        vm.getList()
      },
			trainFirse: function(newVal, oldVal) {
				vm.trainId = '';
				vm.sportIndex = '';
				vm.getSport();
			},
			trainId: function(newVal, oldVal) {
				vm.sportIndex = '';
				vm.getSport();
			},
			sex: function(newVal, oldVal) {
				vm.sportIndex = '';
				vm.getSport();
			},
			allDaoChu: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.getSport()
				} else {
					vm.userXuanZe = [];
				}
			},
			allDaoChuNext: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.daochuList = [
						"Leukocyte",
						"Erythrocyte",
						"Hemoglobin",
						"Hematocrit",
						"Lymphocyte",
						"Neutrophils",
						"BloodUrea",
						"CreatineKinase",
						"Cortisol",
						"Testosterone",
						"TestosteroneOrCortisol",
						"EvaluationContent"
					];
				} else {
					vm.daochuList = [];
				}
			}

		},
		//计算属性
		computed: {
			userId: function() {
				return (vm.sportIndex === '' ? '' : vm.sportList[vm.sportIndex].UserId);
			}
		},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -1),
					'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
        window.bus.$on('sortlist', function(val){
          vm.sortlist = val;
          vm.getList();
        });
        window.bus.$on('sortUrine', function(val){
          vm.sortUrine = val;
          vm.getList();
        });
				vm.userType = window.localStorage.getItem('Sport_userType');
				if (vm.userType == '分队教练') {
					vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
				}
				vm.GetAllTrain().then(() => {
					vm.setTimeInp();
					vm.getSport().then(() => {
            vm.getList()
					});
					// vm.getSportItem();
				});
			},
      getList: function() {
			  if(vm.childNum == 1){
			    vm.getUrineList()
        }
			  if(vm.childNum == 3){
			    vm.getPhyConstituents()
        }
      },
			mytableExcel: function(id) {
				myPublic.tableExcel(id);
			},
			//查询生理生化
			getPhyConstituents: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sportIndex === '' ? '' : vm.sportList[vm.sportIndex].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value + '&sort=' + getSortText(vm.sortlist) +
					'&pagesize=9999&pageindex=1';
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllPeriodicTest?' + _d, {}).then(function(result) {
					if (result.body.StateCode == 0) {
						vm.phyConstituentsList = result.body.Data ? result.body.Data : [];
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
      //查询尿十项
      getUrineList () {
			  debugger
        var _d = '';
        _d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
        _d += '&trainSecId=' + vm.trainId;
        _d += '&sex=' + vm.sex;
        _d += '&sportuserid=' + (vm.sportIndex === '' ? '' : vm.sportList[vm.sportIndex].UserId);
        _d += '&starttime=' + document.getElementById('starttime').value;
        _d += '&endtime=' + document.getElementById('endtime').value;
        _d += '&sort=' + getSortText(vm.sortUrine)
        _d += '&pagesize=9999&pageindex=1';

        vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllUrinalysis?' + _d, {}).then(function(result) {
          if (result.body.StateCode == 0) {
            vm.urineList = result.body.Data ? result.body.Data : [];
          } else {
            vm.$router.push({
              path: '/login'
            });
          }
        }).catch(function(error) {
          console.log(error);
        });
      },
			//获取训练专项
			GetAllTrain: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllTrain', {
							params: {
								userName: ''
							}
						}).then(function(result) {
							if (result.body.StateCode == 0) {
								var _z = [];
								var _id = JSON.parse(window.localStorage.getItem('user')).TrainId.split(',');
								if (!(_id[0] === '' && _id.length == 1)) {
									for (var i = 0; i < result.body.Data.length; i++) {
										if (_id.includes(result.body.Data[i].Id)) {
											_z.push(result.body.Data[i]);
											if (_z.length >= _id.length) {
												break;
											}
										}
									}
								} else {
									_z = [...result.body.Data];
								}
								vm.zhuanxiangList = _z;
								vm.zhuanxiangLists = [...result.body.Data];
								vm.$nextTick(function() {
									// if(vm.userType == '超级管理员'){
									// 	vm.trainFirse = '';
									// }else{
									// 	for(var i = 0; i < _z.length; i++) {
									// 		if(_z[i].SystemId.length == 3) {
									// 			vm.trainFirse = i;
									// 			break;
									// 		}
									// 	}
									// }
									resolve()
								});

							}
						})
						.catch(function(error) {
							console.log(error);
							reject()
						});
				});

			},
			//获取远动员列表
			getSport: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?' + 'trainFId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[
							vm.trainFirse].Id : "") + '&trainId=' + vm.trainId + '&sex=' + vm.sex, {})
						.then(function(
							result) {

							if (result.body.StateCode == 0) {
								vm.sportList = result.body.Data;
								for (var i = 0; i < result.body.Data.length; i++) {
									vm.userXuanZe.push(result.body.Data[i].FullName);
								}
								// if (result.body.Data && result.body.Data.length > 0) {
								// 	vm.sportIndex = 0;
								// }
							} else {
								vm.$router.push({
									path: '/login'
								});
							}
							resolve();

						}).catch(function(error) {
							console.log(error);
						});
				});
			},
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_date2 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null, 'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 <
						_date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_isDate) {
						document.getElementById('endtime').value = _thisDate;
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_date1 == '' || isDate) {
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
      window.bus.$off('sortUrine');
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.againBiao = !vm.againBiao;
				}, 200);
			}
		}
	}
</script>
