<template>
	<div class="body-item">
			<div class="title">
				<div>训练强度</div>
			</div>
			<section>
				<div class="table-box">
					<div id="biao-train" style="width: 100%;height: 100%;overflow: hidden;">
					</div>
				</div>
			</section>
		</div>
</template>

<script>
	var vm;
	export default {
		props: ['shuaxin','againBiao'],
		data: function() {
			return {
				bodyList:[],
			}
		},
		watch:{
			shuaxin:function(){
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
			},
			getList:function(){
				vm.$http.get(myPublic.publicUrl + '/API/Analysis/GetExerciseIntensityTrend', {
					params: {
						sportuserid: '',
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
				for(var i = 0; i < vm.bodyList.length; i++) {
					_dateList.push('第' + vm.bodyList[i].Testdate + '周');
					_series[0].data.push(vm.bodyList[i].AvgIntensity);
				}
				document.getElementById('biao-train').setAttribute("_echarts_instance_", "");
				document.getElementById('biao-train').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('biao-train'));

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
						right: '20px',
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