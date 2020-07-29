<template>
	<div id="body">
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
					<button class="daochu" v-on:click="getBodyFatTrend()">查询</button>
				</div>
				<div style="clear: both;"></div>
				
				
				
				
				
				
				<section class="">
					<div class="body-item">
						<div class="title">
							<ul class="title-tab">
								<li class="item" :class="{'current':childNum == 1}" v-on:click="childNum = 1">数据表</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">折线图</li>
							</ul>
						</div>
						<section v-show="childNum == 1">
							<div id="table-header" class="table-box">
								<table>
									<thead>
										<tr>
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;">测试时间<img @click="sortbut('Testdate')"
								 :src="sort('Testdate')" /></th>
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;">运动员<img @click="sortbut('SportName')"
								 :src="sort('SportName')" /></th>
											<th>运动项目</th>
											<th>参赛主项</th>
											<th>年龄</th>
											<th>性别</th>
											<th>体重</th>
											<th>肌肉</th>
											<th>脂肪</th>
											<th>骨矿物盐</th>
											<th>体脂率</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item,index) in bodyList">
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.Testdate}}</th>
											
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
											<td>{{item.TrainName}}</td>
											<td>{{item.TrainSecName}}</span></td>
											<td>{{item.Age}}</td>
											<td>{{item.Sex}}</td>
											
											<td>{{item.TotalMass.toFixed(2)}}</td>
											<td>{{item.Muscle.toFixed(2)}}</td>
											<td>{{item.Fat.toFixed(2)}}</td>
											<td>{{item.BoneMSalt.toFixed(2)}}</td>
											<td>{{item.BF.toFixed(2)}}</td>
										</tr>
									</tbody>
								</table>
						
							</div>
						</section>
						<section v-show="childNum == 2">
							<div class="table-box">
								<div id="biao" style="width: 100%;height: 100%;overflow: hidden;">
				
								</div>
							</div>
						</section>
					</div>
				</section>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import '../../assets/styles/body.css';
	import {
		sortimg
	} from '../../components/sort.js';

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
				childNum:1,
				getOnr: {},
				bodyList: [],
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {
			childNum:function(newVal,oldVal){
				if(newVal == 2){
					vm.$nextTick(function(){
						
					vm.setBiao();
					})
				}
			},
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -4), 'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				myPublic.tableHeader('#table-header');
				vm.getBodyFatTrend();
			},
			sort: function(res){
				return sortimg(res,vm.sortlist);
			},
			sortbut: function(res) {
				var l = [...vm.sortlist];
				for (var i = 0; i < l.length; i++) {
					l[i].is = false;
					if (res == l[i].type) {
						l[i].is = true;
						l[i].sort = !l[i].sort;
					}
				}
				vm.sortlist = l;
				vm.getBodyFatTrend();
			},
			//获取体成分
			getBodyFatTrend: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllBodyComposition', {
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
					if(result.body.StateCode == 0) {
						vm.bodyList = result.body.Data?result.body.Data:[];
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