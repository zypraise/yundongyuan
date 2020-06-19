<template>
	<div>
		<section class="shengli-main" :style="{'width':(showPingFen?'100%':'40%')}">
			<div class="body-item">
				<div class="title">
					<ul class="title-tab">
						<li class="item" v-on:click="backWorkout(1)">基础体能数据</li>
						<li class="item current">专项体能数据</li>
					</ul>
					<div><span>体能训练记录指标</span><img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
						 v-on:click="showPingFen = !showPingFen" /><img v-on:click="workoutAdd()" class="workout-add" src="../../assets/imgs/add.png"></div>
				</div>
				<section>
					<div class="table-box" style="height: auto;min-height: 500px;">

						<div id="biao" style="width: 100%;height: 500px;overflow: hidden;margin-bottom: 50px;">

						</div>
						<table>
							<thead>
								<tr>
									<th style="min-width: 100px;">时间</th>
									<th v-for="(item,index) in staminaName">{{item}}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in staminaList">
									<td>{{item.TestDate}}</td>
									<td v-for="val in item.valueList">{{val}}</td>
								</tr>
							</tbody>
						</table>


					</div>
				</section>
			</div>
		</section>
		<section class="ping-fen" :style="{'width':'60%','margin-right':(showPingFen?'-60%':'0%')}">
			<ping-fen v-bind:show-ping-fen="showPingFen"></ping-fen>
		</section>
	</div>
</template>

<script>
	var vm;
	import pingFen from '../../components/pingFen.vue';
	export default {
		props: ["isGetList"],
		data: function() {
			return {
				getOnr: {},
				staminaList: [],
				staminaName: [],
				staminaDate: [],
				showPingFen: true
			}
		},
		//公共模板
		components: {
			pingFen: pingFen
		},
		watch: {
			isGetList: function(newVal, oldVal) {
				vm.start()
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader('.table-box')
				vm.getList();
			},
			getList: function() {
				var _d = '';
				_d += 'sportuserid=' + JSON.parse(window.localStorage.getItem('user')).Id;
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value + '&pagesize=9999&pageindex=1';

				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrainResult?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						var _staminaName = [];
						var _staminaDate = [];
						var _l = [];
						var _staminaList = [];
						if (result.body.Data) {
							for (var i = 0; i < result.body.Data.length; i++) {
								if(_staminaName.indexOf(result.body.Data[i].TypeName)<0){
								_staminaName.push(result.body.Data[i].TypeName);
								}
								if(_staminaDate.indexOf(result.body.Data[i].TestDate)<0){
								_staminaDate.push(result.body.Data[i].TestDate);
								_l.push([result.body.Data[i].Value]);
								}else{
									_l[_staminaDate.indexOf(result.body.Data[i].TestDate)].push(result.body.Data[i].Value);
								}
							}
							for(var i = 0;i<_staminaDate.length;i++){
								_staminaList.push({
									TestDate:_staminaDate[i],
									valueList:_l[i]
								})
							}
							
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiao(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						})
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			setBiao: function(_dateList, _list) {
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

			},
			backWorkout: function(num) {
				window.bus.$emit('stamina', num);
			},
			workoutAdd: function() {
				vm.$router.push({
					path: '/staminaAdd'
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
