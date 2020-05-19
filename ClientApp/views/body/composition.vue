<template>
	<div id="body">
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
				<section class="body-tu">
					<div class="body-item">
						<div class="title">体成分</div>
						<section>
							<div class="table-box">
								<div id="biao" style="width: 100%;height: 100%;overflow: hidden;">

								</div>
							</div>
						</section>
					</div>
				</section>
				<section class="body-biao">
					<div class="body-item">
						<div class="title">体成分数据</div>
						<section>
							<div id="table-header" class="table-box">
								<table>
									<thead>
										<tr>
											<th>时间</th>
											<th>体重</th>
											<th>肌肉</th>
											<th>脂肪</th>
											<th>骨矿物盐</th>
											<th>体脂率</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item,index) in bodyList">
											<td>{{item.Testdate}}</td>
											<td>{{item.TotalMass}}</td>
											<td>{{item.Muscle}}</td>
											<td>{{item.Fat}}</td>
											<td>{{item.BoneMSalt}}</td>
											<td>{{item.BF}}</td>
										</tr>
									</tbody>
								</table>

							</div>
						</section>
					</div>
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
							<td><input value="TotalMass,总质量" type="checkbox" name="daochu" v-model="daochuList" />总质量</td>
							<td><input value="Muscle,肌肉" type="checkbox" name="daochu" v-model="daochuList" />肌肉</td>
						</tr>
						<tr>
							<td><input value="Fat,脂肪" type="checkbox" name="daochu" v-model="daochuList" />脂肪</td>
							<td><input value="BoneMSalt,骨矿物盐" type="checkbox" name="daochu" v-model="daochuList" />骨矿物盐</td>
						</tr>
						<tr>
							<td><input value="BF,体脂率" type="checkbox" name="daochu" v-model="daochuList" />体脂率</td>
							<td></td>
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
	import '../../assets/styles/body.css';

	export default {
		//变量
		data: function() {
			return {
				getOnr: {},
				allDaoChu: ['1'],
				allDaoChuNext: [],
				daochuNum: 1,
				userXuanZe: [],
				daochuList: [],
				daochu: false,
				bodyList: [],
				userType: '',
				sportList: [],
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
				window.sportIndex = newVal;
				vm.getBodyFatTrend();
			},
			allDaoChu: function(newVal, oldVal) {
				if(newVal.length > 0) {
					vm.getSport()
				} else {
					vm.userXuanZe = [];
				}
			},
			allDaoChuNext: function(newVal, oldVal) {
				if(newVal.length > 0) {
					vm.daochuList = ["TotalMass,总质量", "Muscle,肌肉", "Fat,脂肪", "BoneMSalt,骨矿物盐", "BF,体脂率"]
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
				return myPublic.publicUrl + '/API/Excelreport/BodyCompositionExport?' + data;
			}
		},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -4), 'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				if(window.localStorage.getItem('Sport_userType') == '教练') {
					//教练
					vm.userType = '教练';
					vm.getSport();
				} else {
					//运动员
					vm.userType = '运动员';
					vm.getBodyFatTrend();
				}
				myPublic.tableHeader('#table-header');
				vm.setTimeInp();
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
							vm.getBodyFatTrend();
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
			//获取体成分
			getBodyFatTrend: function() {
				var userId = '';
				if(vm.userType == '教练') {
					userId = vm.sportList[vm.sportIndex].UserId;
				}
				vm.$http.get(myPublic.publicUrl + '/API/Analysis/GetBodyFatTrend', {
					params: {
						sportuserid: userId,
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.bodyList = result.body.Data;
						vm.setBiao();
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			setBiao: function() {
				var _dateList = [];
				var _series = [{
						name: '体脂率',
						type: 'line',
						yAxisIndex: 1,
						data: []
					},
					{
						name: '骨矿物盐',
						barWidth: '50%',
						type: 'bar',
						stack: '总量',
						data: []
					},
					{
						name: '脂肪',
						type: 'bar',
						stack: '总量',
						data: []
					},
					{
						name: '肌肉',
						type: 'bar',
						stack: '总量',
						data: []
					}
				];
				for(var i = 0; i < vm.bodyList.length; i++) {
					_dateList.push(vm.bodyList[i].Testdate);
					_series[0].data.push(vm.bodyList[i].BF)
					_series[1].data.push(vm.bodyList[i].BoneMSalt)
					_series[2].data.push(vm.bodyList[i].Fat)
					_series[3].data.push(vm.bodyList[i].Muscle)
				}
				document.getElementById('biao').setAttribute("_echarts_instance_", "");
				document.getElementById('biao').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('biao'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['体脂率', '骨矿物盐', '脂肪', '肌肉']
					},
					grid: {
						left: '50px',
						right: '50px',
						bottom: '10px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: _dateList
					},
					yAxis: [{
						type: 'value',
						name: '质量',
						axisLabel: {
							formatter: '{value} kg'
						}

					}, {
						type: 'value',
						name: '百分比',
						max: 50,
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: _series
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date2 == '' || isDate) {
						vm.getBodyFatTrend();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
					vm.getBodyFatTrend();
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null, 'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 < _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						vm.getBodyFatTrend();
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date1 == '' || isDate) {
						vm.getBodyFatTrend();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
					vm.getBodyFatTrend();
				});
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