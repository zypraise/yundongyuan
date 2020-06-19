<template>

	<div class="body-item">
		<div class="title">
			<div>躯干稳定性和上下肢左右侧力量均衡性参考标准</div>
		</div>
		<section>
			<div class="table-box" style="height: 708px !important">
				<table>
					<tr>
						<th>评分</th>
						<th>左45°s</th>
						<th>右45°s</th>
						<th>左135°s</th>
						<th>右135°s</th>
						<th>左90°s</th>
						<th>右90°s</th>
						<th>0°s</th>
						<th>180°s</th>
						<th>评分</th>
						<th>上肢比值%</th>
						<th>下肢比值%</th>
						<th>评分</th>
						<th>男子上肢w/kg</th>
						<th>男子下肢w/kg</th>
						<th>女子上肢w/kg</th>
						<th>女子下肢w/kg</th>
					</tr>
					<tr>
						<td>10</td>
						<td colspan="8">≥120</td>
						<td>5</td>
						<td colspan="2">＜1</td>
						<td>5</td>
						<td>≥6</td>
						<td>≥17</td>
						<td>≥4</td>
						<td>≥13</td>
					</tr>
					<tr>
						<td>9</td>
						<td colspan="8">115-119</td>
						<td>4</td>
						<td colspan="2">1-3.1</td>
						<td>4</td>
						<td>5.7-5.9</td>
						<td>16.0-16.9</td>
						<td>3.5-3.9</td>
						<td>12.0-12.9</td>
					</tr>
					<tr>
						<td>8</td>
						<td colspan="8">110-114</td>
						<td>3</td>
						<td colspan="2">3.2-5.4</td>
						<td>3</td>
						<td>5.4-5.6</td>
						<td>15.0-15.9</td>
						<td>3.0-3.4</td>
						<td>11.0-11.9</td>
					</tr>
					<tr>
						<td>7</td>
						<td colspan="8">105-109</td>
						<td>2</td>
						<td colspan="2">5.5-7.7</td>
						<td>2</td>
						<td>5.1-5.3</td>
						<td>14.0-14.9</td>
						<td>2.5-2.9</td>
						<td>10.0-10.9</td>
					</tr>
					<tr>
						<td>6</td>
						<td colspan="8">100-104</td>
						<td>1</td>
						<td colspan="2">7.8-10</td>
						<td>1</td>
						<td>4.2-5.0</td>
						<td>12.0-13.9</td>
						<td>1.5-2.4</td>
						<td>8.0-9.9</td>
					</tr>
					<tr>
						<td>5</td>
						<td colspan="8">90-99</td>
						<td>0</td>
						<td colspan="2">＞10</td>
						<td>0</td>
						<td>＜4.2</td>
						<td>＜12</td>
						<td>＜1.5</td>
						<td>＜8</td>
					</tr>
					<tr>
						<td>4</td>
						<td colspan="8">80-89</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>3</td>
						<td colspan="8">70-79</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>2</td>
						<td colspan="8">60-69</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>1</td>
						<td colspan="8">--</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>0</td>
						<td colspan="8">＜60</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
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
			start: function() {}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>