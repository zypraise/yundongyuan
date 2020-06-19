<template>
	<div class="body-item">
		<div class="title">
			<ul class="title-tab">
				<li class="item" v-on:click="setChildNum(1)">数据表</li>
				<li class="item current">折线图</li>
			</ul>
			<div>主观评价统计</div>
		</div>
		<section>

			<div style="margin: 0px 10px 20px 10px;float: right;color: #ba2538;cursor: pointer;line-height: 20px;" v-on:click="showPingFen()">评分标准</div>
			<div style="clear: both;"></div>
			<div class="table-box" style="height: 380px;">
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
				pingfen: true
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
			},
			showPingFen: function() {
				vm.pingfen = !vm.pingfen;
				window.bus.$emit('pingfen', vm.pingfen)
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
						name: '肌肉酸痛评价',
						type: 'line',
						data: []
					},
					{
						name: '伤病疼痛评价',
						type: 'line',
						data: []
					},
					{
						name: '自我训练状态评价',
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
						_series[3].data[i] = vm.bodyList[i].SorenessLevel; //肌肉酸痛评价
						_series[4].data[i] = vm.bodyList[i].FatigueLevel; //伤病疼痛评价
						_series[5].data[i] = vm.bodyList[i].TrainStatus; //自我训练状态评价
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
							'肌肉酸痛评价',
							'伤病疼痛评价',
							'自我训练状态评价',
							'RPE'
						]
					},
					grid: {
						left: '10px',
						right: '20px',
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
