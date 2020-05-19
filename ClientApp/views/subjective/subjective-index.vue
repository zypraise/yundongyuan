<template>
	<div class="body-item">
		<div class="title">
			<div>主观评价指标</div>
		</div>
		<section>
			<div style="margin: 0px 10px 20px 10px;float: right;color: #ba2538;cursor: pointer;line-height: 20px;" v-on:click="showPingFen()">评分标准</div>
			<div style="clear: both;"></div>
			<div id="table-header" class="table-box">
				<table>
					<thead>
						<tr>
							<th>提交时间</th>
							<th>晨脉</th>
							<th>体重</th>
							<th>睡眠时间</th>
							<th>睡眠质量</th>
							<th>饮食欲望</th>
							<th>肌肉酸痛评价</th>
							<th>伤病疼痛评价</th>
							<th>自我训练状态评价</th>
							<th>RPE</th>
							<th>训练强度</th>
							<th>教练评价</th>
						</tr>
					</thead>
					<tbody>

						<tr v-for="item in bodyList">
							<td>{{item.DateSign}}</td>
							<td>{{item.MorPulse}}</td>
							<td>{{item.Weight}}</td>
							<td><span v-if="item.SleepDuration>=8" class="shuiping1"></span><span v-if="item.SleepDuration>=5 && item.SleepDuration<=7" class="shuiping2"></span><span v-if="item.SleepDuration>=0 && item.SleepDuration<=4" class="shuiping3"></span>{{item.SleepDuration}}</td>
							<td><span v-if="item.SleepQuality>=8" class="shuiping1"></span><span v-if="item.SleepQuality>=5 && item.SleepQuality<=7" class="shuiping2"></span><span v-if="item.SleepQuality>=0 && item.SleepQuality<=4" class="shuiping3"></span>{{item.SleepQuality}}</td>
							<td><span v-if="item.Desire>=8" class="shuiping1"></span><span v-if="item.Desire>=5 && item.Desire<=7" class="shuiping2"></span><span v-if="item.Desire>=0 && item.Desire<=4" class="shuiping3"></span>{{item.Desire}}</td>
							<td><span v-if="item.SorenessLevel>=0 && item.SorenessLevel<=4" class="shuiping1"></span><span v-if="item.SorenessLevel>=5 && item.SorenessLevel<=7" class="shuiping2"></span><span v-if="item.SorenessLevel>=8" class="shuiping3"></span>{{item.SorenessLevel}}</td>
							<td><span v-if="item.FatigueLevel>=0 && item.FatigueLevel<=4" class="shuiping1"></span><span v-if="item.FatigueLevel>=5 && item.FatigueLevel<=7" class="shuiping2"></span><span v-if="item.FatigueLevel>=8" class="shuiping3"></span>{{item.FatigueLevel}}</td>
							<td><span v-if="item.TrainStatus>=8" class="shuiping1"></span><span v-if="item.TrainStatus>=5 && item.TrainStatus<=7" class="shuiping2"></span><span v-if="item.TrainStatus>=0 && item.TrainStatus<=4" class="shuiping3"></span>{{item.TrainStatus}}</td>
							<td><span v-if="item.Fatigue>=0 && item.Fatigue<=4" class="shuiping1"></span><span v-if="item.Fatigue>=5 && item.Fatigue<=7" class="shuiping2"></span><span v-if="item.Fatigue>=8" class="shuiping3"></span>{{item.Fatigue}}</td>
							<td>{{item.TrainIntensity}}</td>
							<td v-if="item.Evaluate"><span v-if="item.Evaluate>=8" class="shuiping1"></span><span v-if="item.Evaluate>=5 && item.Evaluate<=7" class="shuiping2"></span><span v-if="item.Evaluate>=0 && item.Evaluate<=4" class="shuiping3"></span>{{item.Evaluate}}</td>
							<td v-else>-</td>
						</tr>
					</tbody>

				</table>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		props: ['shuaxin', 'bodyList'],
		data: function() {
			return {
				pingfen: true
			}
		},
		watch: {
			shuaxin: function() {
				vm.$forceUpdate();
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader('#table-header');
			},
			showPingFen: function() {
				vm.pingfen = !vm.pingfen;
				window.bus.$emit('pingfen', vm.pingfen)
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