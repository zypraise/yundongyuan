<template>
	<div class="body-item">
		<div class="title">
			<ul class="title-tab">
				<li class="item" v-on:click="setChildNum(1)">数据表</li>
				<li class="item" v-on:click="setChildNum(2)">折线图</li>
				<li class="item current">训练负荷</li>
			</ul>
		</div>
		<section>
			<div class="table-box">
				<div v-if="!userId" style="width: 100%;height: 100%;line-height: 380px;font-size: 20px;text-align: center;color: #999999;">
					选择一位运动员
				</div>
				<div v-show="userId" id="child2" style="width: 100%;height: 100%;overflow: hidden;">
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		props: ['againBiao','shuaxin', 'userId'],
		data: function() {
			return {
				bodyList: []
			}
		},
		watch: {
			shuaxin: function() {
				vm.getList();
			},
			againBiao:function(){
				vm.start();
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.getList();
				vm.showPingFen();
			},
			showPingFen: function() {
				window.bus.$emit('pingfen', true)
			},
			setChildNum: function(num) {
				window.bus.$emit('childNum', num)
			},
			getList: function() {
				if(!vm.userId) {
					return;
				}
				vm.$http.get(myPublic.publicUrl + '/API/Analysis/GetExerciseIntensityTrend', {
					params: {
						sportuserid: vm.userId,
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value
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
			setBiao:function(){
				
				var _dateList = [];
				var _series = [{
						name: '强度平均值',
						type: 'bar',
						stack: '总量',
						barWidth: '50%',
						data: []
					}
				];
				var _thisTime = (new Date(document.getElementById('starttime').value.replace(/-/g,'/'))).getTime();
				var _time = (new Date(document.getElementById('starttime').value.substr(0, 4) + '/01/01')).getTime();
				var addIndex = parseInt((_thisTime - _time)/(60*60*24*1000*7));
				for(var i = 0; i < vm.bodyList.length; i++) {
					_dateList.push('第' + (parseInt(vm.bodyList[i].Testdate) + addIndex) + '周');
					_series[0].data.push(vm.bodyList[i].AvgIntensity);//平均值
				}
				document.getElementById('child2').setAttribute("_echarts_instance_", "");
				document.getElementById('child2').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('child2'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					color: ["#3FA7DC"],
					legend: {
						data: ['强度平均值']
					},
					grid: {
						left: '10px',
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
						name: '周训练负荷',
						axisLabel: {
							formatter: '{value}'
						}

					}],
					series: _series
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);

			
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>