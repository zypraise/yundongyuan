<template>

	<div class="body-item">
		<div class="title">
			<img v-on:click="closePingFen()" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 20px;cursor: pointer;" src="../assets/imgs/close.png" />
			<div>评分标准</div>
		</div>
		<section>
			<div class="table-box">
				<table>
					<tr>
						<th rowspan="2">指标名称</th>
						<th rowspan="2">指标单位</th>
						<th colspan="3">评价标准</th>
					</tr>
					<tr>
						<th>优</th>
						<th>良</th>
						<th>差</th>
					</tr>
					<tr>
						<td>晨脉</td>
						<td>次数</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
					<tr>
						<td>体重</td>
						<td>kg</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
					<tr>
						<td>睡眠时间</td>
						<td>小时</td>
						<td class="you">≥8</td>
						<td class="liang">5-7</td>
						<td class="cha">0-4</td>
					</tr>
					<tr>
						<td>睡眠质量</td>
						<td>1-10分</td>
						<td class="you">8-10</td>
						<td class="liang">5-7</td>
						<td class="cha">0-4</td>
					</tr>
					<tr>
						<td>饮食欲望</td>
						<td>1-10分</td>
						<td class="you">8-10</td>
						<td class="liang">5-7</td>
						<td class="cha">0-4</td>
					</tr>
					<tr>
						<td>肌肉酸痛</td>
						<td>1-10分</td>
						<td class="you">0-4</td>
						<td class="liang">5-7</td>
						<td class="cha">8-10</td>
					</tr>
					<tr>
						<td>伤病疼痛</td>
						<td>1-10分</td>
						<td class="you">0-4</td>
						<td class="liang">5-7</td>
						<td class="cha">8-10</td>
					</tr>
					<tr>
						<td>自我训练状态</td>
						<td>1-10分</td>
						<td class="you">8-10</td>
						<td class="liang">5-7</td>
						<td class="cha">0-4</td>
					</tr>
					<tr>
						<td>RPE</td>
						<td>1-10分</td>
						<td class="you">0-4</td>
						<td class="liang">5-7</td>
						<td class="cha">8-10</td>
					</tr>
					<tr>
						<td>教练员评价</td>
						<td>1-10分</td>
						<td class="you">8-10</td>
						<td class="liang">5-7</td>
						<td class="cha">0-4</td>
					</tr>
				</table>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {},
			closePingFen:function(){
				window.bus.$emit('pingfen', true)
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