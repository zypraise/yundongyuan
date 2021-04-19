<template>
	<div>
		<div v-show="userId" id="biao2" style="width: 100%;height: 500px;overflow: hidden;">

		</div>
		<div v-if="!userId" style="width: 100%;height: 100%;line-height: 380px;font-size: 20px;text-align: center;color: #999999;">
			选择一位运动员
		</div>
		<!--<div id="biao1" style="margin-top: 50px; width: 100%;height: 500px;overflow: hidden;">

		</div>-->
	</div>
</template>

<script>
	var vm;
	export default {
		props: ['userId','againBiao', 'phyConstituentsList', 'showPingFen'],
		data: function() {
			return {
				getOnr: {}
			}
		},
		watch: {
			showPingFen: function() {
				window.setTimeout(function() {
					vm.setBiao();
				}, 1000);
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
			setBiao: function() {
				vm.setBiao2();
			},
			setBiao2: function() {
				document.getElementById('biao2').setAttribute("_echarts_instance_", "");
				document.getElementById('biao2').innerHTML = '';
				var _dateList = [];
				var _series = [{
						name: '白细胞',
						type: 'line',
						data: []
					},
					{
						name: '红细胞',
						type: 'line',
						data: []
					},
					{
						name: '血红蛋白',
						type: 'line',
						data: []
					},
					{
						name: '中性粒细胞',
						type: 'line',
						data: []
					},
					{
						name: '淋巴细胞',
						type: 'line',
						data: []
					},
					{
						name: '血红蛋白',
						type: 'line',
						data: []
					},
					{
						name: '红细胞压积',
						type: 'line',
						data: []
					},
					{
						name: '血尿素',
						type: 'line',
						data: []
					},
					{
						name: '肌酸激酶',
						type: 'line',
						data: []
					},
					{
						name: '睾酮',
						type: 'line',
						data: []
					},
					{
						name: '皮质醇',
						type: 'line',
						data: []
					},
					{
						name: '睾酮/皮质醇',
						type: 'line',
						data: []
					}

				];
				for (var i = 0; i < vm.phyConstituentsList.length; i++) {
					_dateList.push(vm.phyConstituentsList[i].Testdate);
					_series[0].data.push(vm.phyConstituentsList[i].Leukocyte);
					_series[1].data.push(vm.phyConstituentsList[i].Erythrocyte);
					_series[2].data.push(vm.phyConstituentsList[i].Hemoglobin);
					_series[3].data.push(vm.phyConstituentsList[i].Neutrophils);
					_series[4].data.push(vm.phyConstituentsList[i].Lymphocyte);
					_series[5].data.push(vm.phyConstituentsList[i].Hemoglobin);
					_series[6].data.push(vm.phyConstituentsList[i].Hematocrit);
					_series[7].data.push(vm.phyConstituentsList[i].BloodUrea);
					_series[8].data.push(vm.phyConstituentsList[i].CreatineKinase);
					_series[9].data.push(vm.phyConstituentsList[i].Testosterone);
					_series[10].data.push(vm.phyConstituentsList[i].Cortisol);
					if(vm.phyConstituentsList[i].Cortisol>0){
						_series[11].data.push((vm.phyConstituentsList[i].Testosterone/vm.phyConstituentsList[i].Cortisol).toFixed(2));
					}else{
						_series[11].data.push(0);
					}
				}
				document.getElementById('biao2').setAttribute("_echarts_instance_", "");
				document.getElementById('biao2').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('biao2'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					color: ['#ff0000', '#ff00ff', '#7f00ff', '#0000ff', '#007fff', '#00ffff', '#00ff00', '#ffff00', '#000000',
						'#7f7f7f', '#ff7f00','#ff8181'
					],
					legend: {
						data: ['白细胞', '红细胞', '血红蛋白', '中性粒细胞', '淋巴细胞', '血红蛋白', '红细胞压积', '血尿素', '肌酸激酶', '睾酮', '皮质醇', '睾酮/皮质醇']
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
