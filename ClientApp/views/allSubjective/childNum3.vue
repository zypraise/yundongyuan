<template>
	<div class="body-item">
		<div class="title">
			<div class="wen">
				<img src="../../assets/imgs/wen.png" />
				<p>雷达图结果为选择时间范围内的平均值</p>
			</div>
			<div>主观评价雷达图</div>
		</div>
		<section>
			<div class="table-box">
				<div id="biao-leida" style="width: 100%;height: 100%;overflow: hidden;">
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
			return {}
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
		computed: {
			leida: function() {
				var item = {
					Fatigue: 0, //RPE
					SleepQuality: 0, //睡眠质量
					Desire: 0, //饮食欲望
					SorenessLevel: 0, //肌肉酸痛
					FatigueLevel: 0, //伤病疼痛
					TrainStatus: 0, //自我训练状态
					FatigueLength: 0,
					SleepQualityLength: 0,
					DesireLength: 0,
					SorenessLevelLength: 0,
					FatigueLevelLength: 0,
					TrainStatusLength: 0
				};
				try {

					for (var i = 0; i < vm.bodyList.length; i++) {
						item.Fatigue += vm.bodyList[i].Fatigue;
						item.FatigueLength = vm.bodyList[i].Fatigue ? item.FatigueLength - (-1) : item.FatigueLength;
						item.SleepQuality += vm.bodyList[i].SleepQuality;
						item.SleepQualityLength = vm.bodyList[i].SleepQuality ? item.SleepQualityLength - (-1) : item.SleepQualityLength;
						item.Desire += vm.bodyList[i].Desire;
						item.DesireLength = vm.bodyList[i].Desire ? item.DesireLength - (-1) : item.DesireLength;
						item.SorenessLevel += vm.bodyList[i].SorenessLevel;
						item.SorenessLevelLength = vm.bodyList[i].SorenessLevel ? item.SorenessLevelLength - (-1) : item.SorenessLevelLength;
						item.FatigueLevel += vm.bodyList[i].FatigueLevel;
						item.FatigueLevelLength = vm.bodyList[i].FatigueLevel ? item.FatigueLevelLength - (-1) : item.FatigueLevelLength;
						item.TrainStatus += vm.bodyList[i].TrainStatus;
						item.TrainStatusLength = vm.bodyList[i].TrainStatus ? item.TrainStatusLength - (-1) : item.TrainStatusLength;
					}
					item.Fatigue = (item.Fatigue / (item.FatigueLength ? item.FatigueLength : 1)).toFixed(1);
					item.SleepQuality = (item.SleepQuality / (item.SleepQualityLength ? item.SleepQualityLength : 1)).toFixed(1);
					item.Desire = (item.Desire / (item.DesireLength ? item.DesireLength : 1)).toFixed(1);
					item.SorenessLevel = (item.SorenessLevel / (item.SorenessLevelLength ? item.SorenessLevelLength : 1)).toFixed(1);
					item.FatigueLevel = (item.FatigueLevel / (item.FatigueLevelLength ? item.FatigueLevelLength : 1)).toFixed(1);
					item.TrainStatus = (item.TrainStatus / (item.TrainStatusLength ? item.TrainStatusLength : 1)).toFixed(1);
					return item;
				} catch (e) {
					return item;
				}
			}
		},
		methods: {
			start: function() {
				vm.setBiao();
			},
			setBiao: function() {
				var _series = [vm.leida.Fatigue, vm.leida.SleepQuality, vm.leida.Desire, vm.leida.SorenessLevel, vm.leida.FatigueLevel,
					vm.leida.TrainStatus
				];
				document.getElementById('biao-leida').setAttribute("_echarts_instance_", "");
				document.getElementById('biao-leida').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('biao-leida'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {},
					legend: {
						data: ['标准', '选择时间段的平均值']
					},
					polar: {},
					angleAxis: {
						show: false,
					},
					radiusAxis: {
						type: 'value',
						min: 0,
						max: 10,
						interval: 2,
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						}
					},
					radar: {
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: 'rgba(186, 37, 56,0.5)',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						radius: '70%',
						indicator: [{
								name: 'RPE',
								max: 10
							},
							{
								name: '睡眠质量',
								max: 10
							},
							{
								name: '饮食欲望',
								max: 10
							},
							{
								name: '肌肉酸痛',
								max: 10
							},
							{
								name: '伤病疼痛',
								max: 10
							},
							{
								name: '自我训练状态',
								max: 10
							}
						]
					},
					series: [{
						name: '主观评价雷达图',
						type: 'radar',
						data: [{
							value: [10, 10, 10, 10, 10, 10],
							name: '标准'
						}, {
							value: _series,
							name: '选择时间段的平均值'
						}]
					}]
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
