<template>
	<div id="biao" style="width: 100%;height: 100%;overflow: hidden;">

	</div>
</template>

<script>
	var vm;
	export default {
		props: ['againBiao','phyConstituentsList','showPingFen'],
		data: function() {
			return {
				getOnr:{}
			}
		},
		watch: {
			phyConstituentsList: function() {
				vm.setBiao();
			},
			showPingFen:function(){
				window.setTimeout(function(){
					vm.setBiao();
				},1000);
			},
			againBiao:function(){
				vm.start();
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.setBiao();
			},
			setBiao: function() {
				document.getElementById('biao').setAttribute("_echarts_instance_", "");
				document.getElementById('biao').innerHTML = '';
				var _dateList = [];
				var _series = [{
						name: '睾酮',
						type: 'line',
						stack: '总量',
						data: []
					},
					{
						name: '睾酮/皮质醇',
						type: 'line',
						yAxisIndex: 1,
						data: []
					}
				];
				for(var i = 0; i < vm.phyConstituentsList.length; i++) {
					_dateList.push(vm.phyConstituentsList[i].Testdate);
					_series[0].data.push(vm.phyConstituentsList[i].Testosterone);
					try {
						if(vm.phyConstituentsList[i].Testosterone / vm.phyConstituentsList[i].Cortisol) {
							_series[1].data.push((vm.phyConstituentsList[i].Testosterone / vm.phyConstituentsList[i].Cortisol).toFixed(2));
						} else {
							_series[1].data.push(0);
						}
					} catch(e) {
						_series[1].data.push(0);
					}
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
						data: ['睾酮', '睾酮/皮质醇']
					},
					grid: {
						left: '50px',
						right: '50px',
						bottom: '10px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: _dateList
					},
					yAxis: [{
						type: 'value',
						name: '睾酮（ng/dl）',
						axisLabel: {
							formatter: '{value}'
						}

					}, {
						type: 'value',
						name: '睾酮/皮质醇',
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