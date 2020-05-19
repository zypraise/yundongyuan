<template>
	<div id="biao" style="width: 100%;height: 100%;overflow: hidden;">

	</div>
</template>

<script>
	var vm;
	export default {
		props: ['staminaList','staminaName','staminaDate'],
		data: function() {
			return {
				getOnr:{}
			}
		},
		watch:{
			staminaList:function(){
				vm.setBiao(myPublic.copys(vm.staminaDate),myPublic.copys(vm.staminaList));
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.setBiao(myPublic.copys(vm.staminaDate),myPublic.copys(vm.staminaList));
			},
			setBiao: function(_dateList,_list) {
				var _series = []
				var _val = [];
				for(var i = 0;i<vm.staminaName.length;i++){
					_val = [];
					for(var j = 0;j<_dateList.length;j++){
						_val.push(_list[j].valueList[i]);
					}
					_series.push({
							name: vm.staminaName[i],
							type: 'line',
							smooth: true,
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

			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function(){
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function(){
					vm.start();
				},200);
			}
		}
	}
</script>