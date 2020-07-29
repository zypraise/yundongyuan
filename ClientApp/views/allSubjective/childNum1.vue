<template>
	<div class="body-item">
		<div class="title">
			<ul class="title-tab">
				<li class="item" v-on:click="setChildNum(1)">数据表</li>
				<li class="item current">折线图</li>
				<li class="item" v-on:click="setChildNum(3)">训练负荷</li>
			</ul>
		</div>
		<section>
			<div class="table-box">
				<div id="child1" style="width: 100%;height: 100%;overflow: hidden;">
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		props: ['againBiao', 'shuaxin', 'bodyList'],
		data: function() {
			return {
			}
		},
		watch: {
			shuaxin: function() {
				vm.setBiao();
			},
			bodyList: function() {
				vm.setBiao();
			},
			againBiao: function() {
				vm.start();
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.setBiao();
				vm.showPingFen();
			},
			showPingFen: function() {
				window.bus.$emit('pingfen', true)
			},
			setChildNum: function(num) {
				window.bus.$emit('childNum', num)
			},
			setBiao: function() {
				var _dateList = [];
				var _series = [{
						name: '睡眠时间',
						type: 'line',
						data: []
					},
					{
						name: '睡眠质量',
						type: 'line',
						data: []
					},
					{
						name: '饮食欲望',
						type: 'line',
						data: []
					},
					{
						name: '肌肉酸痛',
						type: 'line',
						data: []
					},
					{
						name: '伤病疼痛',
						type: 'line',
						data: []
					},
					{
						name: '自我训练状态',
						type: 'line',
						data: []
					},
					{
						name: 'RPE',
						type: 'line',
						data: []
					},
					{
						name: '训练负荷',
						type: 'line',
						data: []
					}
				];
				try {

					for (var i = 0; i < vm.bodyList.length; i++) {
						_dateList.push(vm.bodyList[i].DateSign);
						_series[0].data[i] = vm.bodyList[i].SleepDuration; //睡眠时间
						_series[1].data[i] = vm.bodyList[i].SleepQuality; //睡眠质量
						_series[2].data[i] = vm.bodyList[i].Desire; //饮食欲望
						_series[3].data[i] = vm.bodyList[i].SorenessLevel; //肌肉酸痛
						_series[4].data[i] = vm.bodyList[i].FatigueLevel; //伤病疼痛
						_series[5].data[i] = vm.bodyList[i].TrainStatus; //自我训练状态
						_series[6].data[i] = vm.bodyList[i].Fatigue; //RPE
					}
				} catch (e) {
					//TODO handle the exception
				}
				document.getElementById('child1').setAttribute("_echarts_instance_", "");
				document.getElementById('child1').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('child1'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: [
							'睡眠时间',
							'睡眠质量',
							'饮食欲望',
							'肌肉酸痛',
							'伤病疼痛',
							'自我训练状态',
							'RPE'
						]
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
						type: 'value'

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
		}
	}
</script>
