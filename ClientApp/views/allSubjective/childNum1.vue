<template>
	<div class="body-item">
		<div class="title">
			<div>主观评价统计</div>
		</div>
		<section>
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
		props: ['againBiao','shuaxin','bodyList'],
		data: function() {
			return {
			}
		},
		watch:{
			shuaxin:function(){
				vm.setBiao();
			},
			bodyList:function(){
				vm.setBiao();
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
							name: '训练强度',
							type: 'line',
							data: []
						}
					];
				for(var i = 0;i<vm.bodyList.length;i++){
					_dateList.push(vm.bodyList[i].DateSign);
					_series[0].data[i] = vm.bodyList[i].SleepDuration;//睡眠时间
					_series[1].data[i] = vm.bodyList[i].SleepQuality;//睡眠质量
					_series[2].data[i] = vm.bodyList[i].Desire;//饮食欲望
					_series[3].data[i] = vm.bodyList[i].SorenessLevel;//肌肉酸痛评价
					_series[4].data[i] = vm.bodyList[i].FatigueLevel;//伤病疼痛评价
					_series[5].data[i] = vm.bodyList[i].TrainStatus;//自我训练状态评价
					_series[6].data[i] = vm.bodyList[i].Fatigue;//RPE
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