<template>
	<div>
		<div class="edit-mask" v-if="isEdit">
			<div class="is-edit">
				<div class="header">选择<img v-on:click="isEdit = false" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 2px;cursor: pointer;"
					 src="../../assets/imgs/close.png" /></div>
				<div class="body">
					<div class="item" :class="{'current':item.is}" v-for="(item,index) in xuanze" v-on:click="setXuanze(index)">
						<div class="code"><img v-if="item.is" src="../../assets/imgs/code.png" /></div>
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>
		<section class="shengli-main" :style="{'width':(showPingFen?'100%':'40%')}">
			<div class="body-item">
				<div class="title">
					<ul class="title-tab">
						<li class="item current">基础体能数据</li>
						<li class="item" v-on:click="backWorkout(2)">专项体能数据</li>
					</ul>
					<div><span>体能训练记录指标</span><img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
						 v-on:click="showPingFen = !showPingFen" /></div>
				</div>
				<section>
					<div class="table-box" style="height: auto;min-height: 500px;">

						<select v-model="listType" style="border: 1px solid #bcbcbc; height: 38px; width: 220px; border-radius: 4px;margin-bottom: 20px;">
							<option value="1">基础体能</option>
							<option value="2">板块体能</option>
							<option value="3">稳定和均衡</option>
						</select>
						<img v-if="listType == 1" src="../../assets/imgs/edit.png" style="width: 26px;height: 26px;vertical-align: top;margin: 6px 10px;cursor: pointer;float: right;"
						 v-on:click="isEdit = !isEdit" />
						<table style="margin-bottom: 50px;">
							<thead>
								<tr>
									<th style="min-width: 100px;">时间</th>
									<th>运动员</th>
									<th v-for="(item,index) in staminaName">{{item}}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in staminaList">
									<td>{{item.TestDate}}</td>
									<td>{{list[index].SportName}}</td>
									<td v-for="val in item.valueList">{{val}}</td>
								</tr>
							</tbody>
						</table>
						<div v-if="sport !== ''" id="biao1" style="margin-bottom: 50px;width: 100%;height: 500px;overflow: hidden;"></div>
						<div v-if="sport !== '' && (listType == 1 || listType == 3)" id="biao2" style="width: 100%;height: 500px;overflow: hidden;"></div>


					</div>
				</section>
			</div>
		</section>
		<section class="ping-fen" :style="{'width':'60%','margin-right':(showPingFen?'-60%':'0%')}">
			<ti-neng v-if="listType == 1" v-bind:show-ping-fen="showPingFen"></ti-neng>
			<ban-kuai v-if="listType == 2" v-bind:show-ping-fen="showPingFen"></ban-kuai>
			<qu-gan v-if="listType == 3" v-bind:show-ping-fen="showPingFen"></qu-gan>
		</section>
	</div>
</template>

<script>
	var vm;
	import tineng from '../../components/tineng.vue';
	import qugan from '../../components/qugan.vue';
	import bankuai from '../../components/bankuai.vue';
	export default {
		props: ["isGetList", "zhuanxiangList", "trainFirse", "trainId", "sportList", "sportIndex", "sex"],
		data: function() {
			return {
				listType: 1,
				isEdit: false,
				getOnr: {},
				list: [],
				staminaList: [],
				staminaName: [],
				staminaDate: [],
				LeiDaSeries: [],
				xuanze: [{
						is: true,
						name: 'BMI'
					},
					{
						is: true,
						name: '坐位体前屈'
					},
					{
						is: true,
						name: '30m冲刺'
					},
					{
						is: true,
						name: '垂直纵跳'
					},
					{
						is: true,
						name: '深蹲相对力量'
					},
					{
						is: true,
						name: '卧推相对力量'
					},
					{
						is: true,
						name: '引体向上次'
					},
					{
						is: true,
						name: '腹肌耐力'
					},
					{
						is: true,
						name: '背肌耐力'
					},
					{
						is: true,
						name: '3000m'
					},
					{
						is: false,
						name: '2000m测功仪'
					}
				],
				jichuLeiDaHide: {}, //基础雷达高水平
				jichuLeiDaAll: {}, //基础雷达平均水平
				wendingLeiDaHide: {}, //稳定雷达平均水平
				wendingLeiDaAll: {}, //稳定雷达平均水平

				indicator: [],
				sport: undefined,
				showPingFen: true
			}
		},
		//公共模板
		components: {
			tiNeng: tineng,
			quGan: qugan,
			banKuai: bankuai
		},
		watch: {
			isGetList: function(newVal, oldVal) {
				vm.start()
			},
			listType: function(newVal, oldVal) {
				if (newVal != 1) {
					vm.isEdit = false;
				}
				vm.start()
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				// myPublic.tableHeader('.table-box');
				vm.sport = vm.sportIndex;
				vm.getinfo();

			},
			setXuanze: function(index) {
				vm.xuanze[index].is = !vm.xuanze[index].is;
				vm.getinfo();
			},
			getinfo: function() {
				if (vm.listType == 1) {
					vm.getLeiDaHide().then(() => {
						vm.getLeiDaAll().then(() => {
							vm.getList();
						});
					});
				}
				if (vm.listType == 2) {
					vm.getList();
				}
				if (vm.listType == 3) {
					vm.getLeiDaHide().then(() => {
						vm.getLeiDaAll().then(() => {
							vm.getList();
						});
					});
				}
			},
			getLeiDaHide: function() {
				return new Promise(function(resolve, reject) {
					if (vm.listType == 1) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/BasicPhysicalTop?sex=' + vm.sex, {}).then(function(result) {
								if (result.body.StateCode == 0) {
									var _j = {};
									if (vm.xuanze[0].is) {
										_j.BMIScore = result.body.Data.BMIScore;
									}
									if (vm.xuanze[1].is) {
										_j.SitForwardScore = result.body.Data.SitForwardScore;
									}
									if (vm.xuanze[2].is) {
										_j.ThirtyMeterDashScore = result.body.Data.ThirtyMeterDashScore;
									}
									if (vm.xuanze[3].is) {
										_j.VerticalJumpScore = result.body.Data.VerticalJumpScore;
									}
									if (vm.xuanze[4].is) {
										_j.RelativeSquatMaxStrengthScore = result.body.Data.RelativeSquatMaxStrengthScore;
									}
									if (vm.xuanze[5].is) {
										_j.RelativeLyingPushMaxStrengthScore = result.body.Data.RelativeLyingPushMaxStrengthScore;
									}
									if (vm.xuanze[6].is) {
										_j.PullUpScore = result.body.Data.PullUpScore;
									}
									if (vm.xuanze[7].is) {
										_j.AbdominalEnduranceScore = result.body.Data.AbdominalEnduranceScore;
									}
									if (vm.xuanze[8].is) {
										_j.BackMuscleEnduranceScore = result.body.Data.BackMuscleEnduranceScore;
									}
									if (vm.xuanze[9].is) {
										_j.ThreeKmScore = result.body.Data.ThreeKmScore;
									}
									if (vm.xuanze[10].is) {
										_j.TwoKmDynamometer = result.body.Data.TwoKmDynamometerScore;
									}
									vm.jichuLeiDaHide = _j;
									resolve();
								}
							})
							.catch(function(error) {
								if (error.status == 500) {
									var _j = {};
									if (vm.xuanze[0].is) {
										_j.BMIScore = 0;
									}
									if (vm.xuanze[1].is) {
										_j.SitForwardScore = 0;
									}
									if (vm.xuanze[2].is) {
										_j.ThirtyMeterDashScore = 0;
									}
									if (vm.xuanze[3].is) {
										_j.VerticalJumpScore = 0;
									}
									if (vm.xuanze[4].is) {
										_j.RelativeSquatMaxStrengthScore = 0;
									}
									if (vm.xuanze[5].is) {
										_j.RelativeLyingPushMaxStrengthScore = 0;
									}
									if (vm.xuanze[6].is) {
										_j.PullUpScore = 0;
									}
									if (vm.xuanze[7].is) {
										_j.AbdominalEnduranceScore = 0;
									}
									if (vm.xuanze[8].is) {
										_j.BackMuscleEnduranceScore = 0;
									}
									if (vm.xuanze[9].is) {
										_j.ThreeKmScore = 0;
									}
									if (vm.xuanze[10].is) {
										_j.TwoKmDynamometer = 0;
									}
									vm.jichuLeiDaHide = _j;
									resolve();
								}
							});
					}
					if (vm.listType == 3) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/TrunkTop?sex' + vm.sex, {}).then(function(result) {
								if (result.body.StateCode == 0) {
									vm.wendingLeiDaHide = result.body.Data;
									resolve();
								}
							})
							.catch(function(error) {
								if (error.status == 500) {
									vm.wendingLeiDaHide = {
										Left45Score: 0,
										Left90Score: 0,
										Left135Score: 0,
										LowerLimbRatioScore: 0,
										LowerLimbScore: 0,
										OneHundredEightyScore: 0,
										Right45Score: 0,
										Right90Score: 0,
										Right135Score: 0,
										UpperLimbRatioScore: 0,
										UpperLimbScore: 0,
										ZeroScore: 0
									}
									resolve();
								}
								console.log(error);
							});
					}
				});
			},
			getLeiDaAll: function() {
				return new Promise(function(resolve, reject) {
					if (vm.listType == 1) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/BasicPhysicalAverage?trainId=' + vm.trainId + '&sex=' + vm.sex, {})
							.then(function(result) {
								if (result.body.StateCode == 0) {
									var _j = {};
									if (vm.xuanze[0].is) {
										_j.BMIScore = result.body.Data.BMIScore;
									}
									if (vm.xuanze[1].is) {
										_j.SitForwardScore = result.body.Data.SitForwardScore;
									}
									if (vm.xuanze[2].is) {
										_j.ThirtyMeterDashScore = result.body.Data.ThirtyMeterDashScore;
									}
									if (vm.xuanze[3].is) {
										_j.VerticalJumpScore = result.body.Data.VerticalJumpScore;
									}
									if (vm.xuanze[4].is) {
										_j.RelativeSquatMaxStrengthScore = result.body.Data.RelativeSquatMaxStrengthScore;
									}
									if (vm.xuanze[5].is) {
										_j.RelativeLyingPushMaxStrengthScore = result.body.Data.RelativeLyingPushMaxStrengthScore;
									}
									if (vm.xuanze[6].is) {
										_j.PullUpScore = result.body.Data.PullUpScore;
									}
									if (vm.xuanze[7].is) {
										_j.AbdominalEnduranceScore = result.body.Data.AbdominalEnduranceScore;
									}
									if (vm.xuanze[8].is) {
										_j.BackMuscleEnduranceScore = result.body.Data.BackMuscleEnduranceScore;
									}
									if (vm.xuanze[9].is) {
										_j.ThreeKmScore = result.body.Data.ThreeKmScore;
									}
									if (vm.xuanze[10].is) {
										_j.TwoKmDynamometer = result.body.Data.TwoKmDynamometerScore;
									}
									vm.jichuLeiDaAll = _j;
									resolve();
								}
							})
							.catch(function(error) {
								if (error.status == 500) {
									var _j = {};
									if (vm.xuanze[0].is) {
										_j.BMIScore = 0;
									}
									if (vm.xuanze[1].is) {
										_j.SitForwardScore = 0;
									}
									if (vm.xuanze[2].is) {
										_j.ThirtyMeterDashScore = 0;
									}
									if (vm.xuanze[3].is) {
										_j.VerticalJumpScore = 0;
									}
									if (vm.xuanze[4].is) {
										_j.RelativeSquatMaxStrengthScore = 0;
									}
									if (vm.xuanze[5].is) {
										_j.RelativeLyingPushMaxStrengthScore = 0;
									}
									if (vm.xuanze[6].is) {
										_j.PullUpScore = 0;
									}
									if (vm.xuanze[7].is) {
										_j.AbdominalEnduranceScore = 0;
									}
									if (vm.xuanze[8].is) {
										_j.BackMuscleEnduranceScore = 0;
									}
									if (vm.xuanze[9].is) {
										_j.ThreeKmScore = 0;
									}
									if (vm.xuanze[10].is) {
										_j.TwoKmDynamometer = 0;
									}
									vm.jichuLeiDaAll = _j
									resolve();
								}
								console.log(error);
							});
					}

					if (vm.listType == 3) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/TrunkAverage?trainId=' + vm.trainId + '&sex=' + vm.sex, {})
							.then(function(result) {
								if (result.body.StateCode == 0) {
									vm.wendingLeiDaAll = result.body.Data;
									resolve();
								}
							})
							.catch(function(error) {
								if (error.status == 500) {
									vm.wendingLeiDaAll = {
										Left45Score: 0,
										Left90Score: 0,
										Left135Score: 0,
										LowerLimbRatioScore: 0,
										LowerLimbScore: 0,
										OneHundredEightyScore: 0,
										Right45Score: 0,
										Right90Score: 0,
										Right135Score: 0,
										UpperLimbRatioScore: 0,
										UpperLimbScore: 0,
										ZeroScore: 0
									}
									resolve();
								}
								console.log(error);
							});
					}

				});
			},
			getList: function() {
				if (vm.listType == 1) {
					if (vm.sport !== '') {
						vm.getLeiDa1();
					}
					vm.getList1();
				} else if (vm.listType == 2) {
					vm.getList2();
				} else if (vm.listType == 3) {
					if (vm.sport !== '') {
						vm.getLeiDa3();
					}
					vm.getList3();
				}
			},
			getList1: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value +
					'&pagesize=9999&pageindex=1';

				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllBasicPhysicalData?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						vm.list = result.body.Data ? result.body.Data : [];
						var _staminaDate = [];
						var _staminaList = [];
						var _staminaName = [];
						if (vm.xuanze[0].is) {
							_staminaName.push('BMI');
						}
						if (vm.xuanze[1].is) {
							_staminaName.push('坐位体前屈');
						}
						if (vm.xuanze[2].is) {
							_staminaName.push('30m冲刺');
						}
						if (vm.xuanze[3].is) {
							_staminaName.push('垂直纵跳');
						}
						if (vm.xuanze[4].is) {
							_staminaName.push('深蹲相对力量');
						}
						if (vm.xuanze[5].is) {
							_staminaName.push('卧推相对力量');
						}
						if (vm.xuanze[6].is) {
							_staminaName.push('引体向上次');
						}
						if (vm.xuanze[7].is) {
							_staminaName.push('腹肌耐力');
						}
						if (vm.xuanze[8].is) {
							_staminaName.push('背肌耐力');
						}
						if (vm.xuanze[9].is) {
							_staminaName.push('3000m');
						}
						if (vm.xuanze[10].is) {
							_staminaName.push('2000m测功仪');
						}
						if (result.body.Data) {
							var valueList;
							for (var i = 0; i < result.body.Data.length; i++) {
								_staminaDate.push(result.body.Data[i].Testdate);
								valueList = [];
								if (vm.xuanze[0].is) {
									valueList.push(result.body.Data[i].BMI);
								}
								if (vm.xuanze[1].is) {
									valueList.push(result.body.Data[i].SitForward);
								}
								if (vm.xuanze[2].is) {
									valueList.push(result.body.Data[i].ThirtyMeterDash);
								}
								if (vm.xuanze[3].is) {
									valueList.push(result.body.Data[i].VerticalJump);
								}
								if (vm.xuanze[4].is) {
									valueList.push(result.body.Data[i].RelativeSquatMaxStrength);
								}
								if (vm.xuanze[5].is) {
									valueList.push(result.body.Data[i].RelativeLyingPushMaxStrength);
								}
								if (vm.xuanze[6].is) {
									valueList.push(result.body.Data[i].PullUp);
								}
								if (vm.xuanze[7].is) {
									valueList.push(result.body.Data[i].AbdominalEndurance);
								}
								if (vm.xuanze[8].is) {
									valueList.push(result.body.Data[i].BackMuscleEndurance);
								}
								if (vm.xuanze[9].is) {
									valueList.push(result.body.Data[i].ThreeKm);
								}
								if (vm.xuanze[10].is) {
									valueList.push(result.body.Data[i].TwoKmDynamometer);
								}
								_staminaList.push({
									TestDate: result.body.Data[i].Testdate,
									valueList: valueList
								});
							}
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						})
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			getList2: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value +
					'&pagesize=9999&pageindex=1';

				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllPlateFitnessData?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						var _staminaName = ['攀爬时间（s）', '攀爬距离（m）', '平均心率', '最大心率', '80%以上最大心率保持时间和总距离'];
						var _staminaDate = [];
						var _staminaList = [];

						vm.list = result.body.Data ? result.body.Data : [];
						if (result.body.Data) {
							for (var i = 0; i < result.body.Data.length; i++) {
								_staminaDate.push(result.body.Data[i].Testdate);
								_staminaList.push({
									TestDate: result.body.Data[i].Testdate,
									valueList: [
										result.body.Data[i].ClimbingTime,
										result.body.Data[i].ClimbingDistance,
										result.body.Data[i].MeanHeartRate,
										result.body.Data[i].MaxHeartRate,
										result.body.Data[i].MaxHeartRateHoldTime,
									]
								});
							}
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						})
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			getList3: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value +
					'&pagesize=9999&pageindex=1';

				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrunkStabilityBalance?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						var _staminaName = ['左45°s', '右45°s', '左135°s', '右135°s', '左90°s', '右90°s', '0°s', '180°s', '上肢', '下肢'];
						var _staminaDate = [];
						var _staminaList = [];
						if (result.body.Data) {
							vm.list = result.body.Data ? result.body.Data : [];
							for (var i = 0; i < result.body.Data.length; i++) {
								_staminaDate.push(result.body.Data[i].Testdate);
								_staminaList.push({
									TestDate: result.body.Data[i].Testdate,
									valueList: [
										result.body.Data[i].Left45,
										result.body.Data[i].Right45,
										result.body.Data[i].Left135,
										result.body.Data[i].Right135,
										result.body.Data[i].Left90,
										result.body.Data[i].Right90,
										result.body.Data[i].Zero,
										result.body.Data[i].OneHundredEighty,
										result.body.Data[i].UpperLimbRatio,
										result.body.Data[i].LowerLimbRatio
									]
								});
							}
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						})
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			setBiaoAxis: function(_dateList, _list) {
				try {
					var _series = []
					var _val = [];
					for (var i = 0; i < vm.staminaName.length; i++) {
						_val = [];
						for (var j = 0; j < _dateList.length; j++) {
							_val.push(_list[j].valueList[i]);
						}
						_series.push({
							name: vm.staminaName[i],
							type: 'line',
							data: _val
						});
					}
					document.getElementById('biao1').setAttribute("_echarts_instance_", "");
					document.getElementById('biao1').innerHTML = '';
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('biao1'));

					// 指定图表的配置项和数据
					var option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data: vm.staminaName
						},
						grid: {
							left: '10px',
							right: '50px',
							bottom: '10px',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: _dateList
						},
						yAxis: {
							type: 'value',
							axisLabel: {
								formatter: '{value}'
							}

						},
						series: _series
					};

					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);

				} catch (e) {
					//TODO handle the exception
				}

			},
			getLeiDa1: function() {
				var _indicator = [];
				if (vm.xuanze[0].is) {
					_indicator.push({
						name: 'BMI', //BMI Score
						max: 10
					});
				}
				if (vm.xuanze[1].is) {
					_indicator.push({
						name: '坐位体前屈', //Sit Forward Score
						max: 10
					});
				}
				if (vm.xuanze[2].is) {
					_indicator.push({
						name: '30m冲刺', //ThirtyMeterDashScore
						max: 10
					});
				}
				if (vm.xuanze[3].is) {
					_indicator.push({
						name: '垂直纵跳', //VerticalJumpScore
						max: 10
					});
				}
				if (vm.xuanze[4].is) {
					_indicator.push({
						name: '深蹲相对力量', //Relative Squat Max Strength Score
						max: 10
					});
				}
				if (vm.xuanze[5].is) {
					_indicator.push({
						name: '卧推相对力量', //Relative Lying Push Max Strength Score
						max: 10
					});
				}
				if (vm.xuanze[6].is) {
					_indicator.push({
						name: '引体向上次', //Pull Up Score
						max: 10
					});
				}
				if (vm.xuanze[7].is) {
					_indicator.push({
						name: '腹肌耐力', //Abdominal Endurance Score
						max: 10
					});
				}
				if (vm.xuanze[8].is) {
					_indicator.push({
						name: '背肌耐力', //Back Muscle Endurance Score
						max: 10
					});
				}
				if (vm.xuanze[9].is) {
					_indicator.push({
						name: '3000m', //Three Km Score
						max: 10
					});
				}
				if (vm.xuanze[10].is) {
					_indicator.push({
						name: '2000m测功仪', //Three Km Score
						max: 10
					});
				}
				vm.indicator = _indicator;

				function api() {
					return new Promise(function(resolve, reject) {
						var _d = '';
						_d += 'sportuserid=' + (vm.sport !== '' ? vm.sportList[vm.sport].UserId : '');
						var _data = {};
						if (vm.xuanze[0].is) {
							_data.BMIScore = 0;
						}
						if (vm.xuanze[1].is) {
							_data.SitForwardScore = 0;
						}
						if (vm.xuanze[2].is) {
							_data.ThirtyMeterDashScore = 0;
						}
						if (vm.xuanze[3].is) {
							_data.VerticalJumpScore = 0;
						}
						if (vm.xuanze[4].is) {
							_data.RelativeSquatMaxStrengthScore = 0
						}
						if (vm.xuanze[5].is) {
							_data.RelativeLyingPushMaxStrengthScore = 0;
						}
						if (vm.xuanze[6].is) {
							_data.PullUpScore = 0;
						}
						if (vm.xuanze[7].is) {
							_data.AbdominalEnduranceScore = 0;
						}
						if (vm.xuanze[8].is) {
							_data.BackMuscleEnduranceScore = 0;
						}
						if (vm.xuanze[9].is) {
							_data.ThreeKmScore = 0;
						}
						if (vm.xuanze[10].is) {
							_data.TwoKmDynamometer = 0;
						}

						vm.$http.post(myPublic.publicUrl + '/API/Test/BasicPhysicalRadarChart?' + _d, {}).then(function(result) {
								if (result.body.StateCode == 0) {
									resolve(result.body.Data);
								}
							})
							.catch(function(error) {
								if (error.status == 500) {
									resolve(_data);
								}
								console.log(error);
							});
					});
				}
				api().then(res => {
					var _h = [];
					var _all = [];
					var _value = [];
					if (vm.xuanze[0].is) {
						_h.push(vm.jichuLeiDaHide.BMIScore);
						_all.push(vm.jichuLeiDaAll.BMIScore);
						_value.push(res.BMIScore);
					}
					if (vm.xuanze[1].is) {
						_h.push(vm.jichuLeiDaHide.SitForwardScore);
						_all.push(vm.jichuLeiDaAll.SitForwardScore);
						_value.push(res.SitForwardScore);
					}
					if (vm.xuanze[2].is) {
						_h.push(vm.jichuLeiDaHide.ThirtyMeterDashScore);
						_all.push(vm.jichuLeiDaAll.ThirtyMeterDashScore);
						_value.push(res.ThirtyMeterDashScore);
					}
					if (vm.xuanze[3].is) {
						_h.push(vm.jichuLeiDaHide.VerticalJumpScore);
						_all.push(vm.jichuLeiDaAll.VerticalJumpScore);
						_value.push(res.VerticalJumpScore);
					}
					if (vm.xuanze[4].is) {
						_h.push(vm.jichuLeiDaHide.RelativeSquatMaxStrengthScore);
						_all.push(vm.jichuLeiDaAll.RelativeSquatMaxStrengthScore);
						_value.push(res.RelativeSquatMaxStrengthScore);
					}
					if (vm.xuanze[5].is) {
						_h.push(vm.jichuLeiDaHide.RelativeLyingPushMaxStrengthScore);
						_all.push(vm.jichuLeiDaAll.RelativeLyingPushMaxStrengthScore);
						_value.push(res.RelativeLyingPushMaxStrengthScore);
					}
					if (vm.xuanze[6].is) {

						_h.push(vm.jichuLeiDaHide.PullUpScore);
						_all.push(vm.jichuLeiDaAll.PullUpScore);
						_value.push(res.PullUpScore);
					}
					if (vm.xuanze[7].is) {

						_h.push(vm.jichuLeiDaHide.AbdominalEnduranceScore);
						_all.push(vm.jichuLeiDaAll.AbdominalEnduranceScore);
						_value.push(res.AbdominalEnduranceScore);
					}
					if (vm.xuanze[8].is) {
						_h.push(vm.jichuLeiDaHide.BackMuscleEnduranceScore);
						_all.push(vm.jichuLeiDaAll.BackMuscleEnduranceScore);
						_value.push(res.BackMuscleEnduranceScore);
					}
					if (vm.xuanze[9].is) {
						_h.push(vm.jichuLeiDaHide.ThreeKmScore);
						_all.push(vm.jichuLeiDaAll.ThreeKmScore);
						_value.push(res.ThreeKmScore);
					}
					if (vm.xuanze[10].is) {
						_h.push(vm.jichuLeiDaHide.TwoKmDynamometer);
						_all.push(vm.jichuLeiDaAll.TwoKmDynamometer);
						_value.push('0');
					}

					vm.LeiDaSeries = [{
						name: '基础体能',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [{
								value: _h,
								name: '国际高水平'
							},
							{
								value: _all,
								name: '队内平均值'
							},
							{
								value: _value,
								name: '当前队员'
							}
						]
					}];

					vm.$nextTick(function() {
						// vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						vm.setBiaoRadar();
					})
				});
			},
			getLeiDa3: function() {
				vm.indicator = [{
						name: '左45°s',
						max: 10
					},
					{
						name: '右45°s',
						max: 10
					},
					{
						name: '左135°s',
						max: 10
					},
					{
						name: '右135°s',
						max: 10
					},
					{
						name: '左90°s',
						max: 10
					},
					{
						name: '右90°s',
						max: 10
					},
					{
						name: '0°s',
						max: 10
					},
					{
						name: '180°s',
						max: 10
					},
					{
						name: '上肢',
						max: 10
					},
					{
						name: '下肢',
						max: 10
					}
				];

				function api() {
					return new Promise(function(resolve, reject) {
						var _d = '';
						_d += 'sportuserid=' + (vm.sport !== '' ? vm.sportList[vm.sport].UserId : '');
						var _data = {
							Left45Score: 0,
							Right45Score: 0,
							Left135Score: 0,
							Right135Score: 0,
							Left90Score: 0,
							Right90Score: 0,
							ZeroScore: 0,
							OneHundredEightyScore: 0,
							UpperLimbRatioScore: 0,
							LowerLimbRatioScore: 0
						}
						vm.$http.post(myPublic.publicUrl + '/API/Test/TrunkRadarChart?' + _d, {}).then(function(result) {
								if (result.body.StateCode == 0) {
									resolve(result.body.Data);
								}
							})
							.catch(function(error) {
								if (error.status == 500) {
									resolve(_data);
								}
								console.log(error);
							});
					});
				}
				api().then(res => {
					var _h = [
						vm.wendingLeiDaHide.Left45Score,
						vm.wendingLeiDaHide.Right45Score,
						vm.wendingLeiDaHide.Left135Score,
						vm.wendingLeiDaHide.Right135Score,
						vm.wendingLeiDaHide.Left90Score,
						vm.wendingLeiDaHide.Right90Score,
						vm.wendingLeiDaHide.ZeroScore,
						vm.wendingLeiDaHide.OneHundredEightyScore,
						vm.wendingLeiDaHide.UpperLimbRatioScore,
						vm.wendingLeiDaHide.LowerLimbRatioScore
					];
					var _all = [
						vm.wendingLeiDaAll.Left45Score,
						vm.wendingLeiDaAll.Right45Score,
						vm.wendingLeiDaAll.Left135Score,
						vm.wendingLeiDaAll.Right135Score,
						vm.wendingLeiDaAll.Left90Score,
						vm.wendingLeiDaAll.Right90Score,
						vm.wendingLeiDaAll.ZeroScore,
						vm.wendingLeiDaAll.OneHundredEightyScore,
						vm.wendingLeiDaAll.UpperLimbRatioScore,
						vm.wendingLeiDaAll.LowerLimbRatioScore
					];
					vm.LeiDaSeries = [{
						name: '稳定和均衡',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [{
								value: _h,
								name: '国际高水平'
							},
							{
								value: _all,
								name: '队内平均值'
							},
							{
								value: [
									res.Left45Score,
									res.Right45Score,
									res.Left135Score,
									res.Right135Score,
									res.Left90Score,
									res.Right90Score,
									res.ZeroScore,
									res.OneHundredEightyScore,
									res.UpperLimbRatioScore,
									res.LowerLimbRatioScore
								],
								name: '当前队员'
							}
						]
					}];


					vm.LeiDaSeries = [{
						name: '基础体能',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [{
								value: _h,
								name: '国际高水平'
							},
							{
								value: _all,
								name: '队内平均值'
							},
							{
								value: [res.BMIScore,
									res.SitForwardScore,
									res.ThirtyMeterDashScore,
									res.VerticalJumpScore,
									res.RelativeSquatMaxStrengthScore,
									res.RelativeLyingPushMaxStrengthScore,
									res.PullUpScore,
									res.AbdominalEnduranceScore,
									res.BackMuscleEnduranceScore,
									res.ThreeKmScore
								],
								name: '当前队员'
							}
						]
					}];

					vm.$nextTick(function() {
						// vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						vm.setBiaoRadar();
					})
				});


			},
			setBiaoRadar: function() {
				try {
					// vm.getInfo();

					document.getElementById('biao2').setAttribute("_echarts_instance_", "");
					document.getElementById('biao2').innerHTML = '';
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('biao2'));
					// 指定图表的配置项和数据
					var option = {
						title: {
							text: '基础雷达图'
						},
						tooltip: {},
						legend: {
							data: ['国际高水平', '队内平均值', '当前队员']
						},
						radar: {
							// shape: 'circle',
							name: {
								textStyle: {
									color: '#fff',
									backgroundColor: '#999',
									borderRadius: 3,
									padding: [3, 5]
								}
							},
							indicator: vm.indicator
						},
						series: vm.LeiDaSeries
					};
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);


				} catch (e) {
					//TODO handle the exception
				}
			},
			backWorkout: function(num) {
				window.bus.$emit('workout', num);
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.start();
				}, 200);
			}
		}
	}
</script>
