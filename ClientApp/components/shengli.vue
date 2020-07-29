<template>

	<div class="body-item">
		<div class="title">
			<img v-on:click="closePingFen()" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 20px;cursor: pointer;" src="../assets/imgs/close.png" />
			<div>生理生化标准</div>
		</div>
		<section>
			<div class="table-box" style="height: 500px !important">
				<table>
					<tr>
						<th rowspan="2">中文名</th>
						<th rowspan="2">英文缩写</th>
						<th colspan="2">指标范围</th>
					</tr>
					<tr>
						<th>男子</th>
						<th>女子</th>
					</tr>
					<tr>
						<td>白细胞</td>
						<td>WBC</td>
						<td>4-11 ×10<sup>9</sup>/L</td>
						<td>4-11 ×10<sup>9</sup>/L</td>
					</tr>
					<tr>
						<td>红细胞</td>
						<td>RBC</td>
						<td>4-5.6 ×10<sup>12</sup>/L</td>
						<td>4-5.6 ×10<sup>12</sup>/L</td>
					</tr>
					<tr>
						<td>血红蛋白</td>
						<td>HGB</td>
						<td>120-160 g/L</td>
						<td>110-150 g/L</td>
					</tr>
					<tr>
						<td>血球压积</td>
						<td>HCT</td>
						<td>0.32-0.54</td>
						<td>0.32-0.54</td>
					</tr>
					<tr>
						<td>淋巴细胞</td>
						<td>LY#</td>
						<td>0.8-3.5 ×10<sup>9</sup>/L</td>
						<td>0.8-3.5 ×10<sup>9</sup>/L</td>
					</tr>
					<tr>
						<td>中性粒细胞</td>
						<td>NE#</td>
						<td>1.8-6.30 ×10<sup>9</sup>/L</td>
						<td>1.8-6.30 ×10<sup>9</sup>/L</td>
					</tr>
					<tr>
						<td>血尿素</td>
						<td>BUN</td>
						<td>4-7 mmol/L</td>
						<td>4-7 mmol/L</td>
					</tr>
					
					<tr>
						<td>肌酸激酶</td>
						<td>CK</td>
						<td>10-300 U/L</td>
						<td>10-200 U/L</td>
					</tr>
					
					<tr>
						<td>皮质醇</td>
						<td>Cortisol</td>
						<td>6-26 ug/dl</td>
						<td>6-26 ug/dl</td>
					</tr>
					<tr>
						<td>睾酮</td>
						<td>Testo</td>
						<td>270-1000 ng/dl</td>
						<td>10-100 ng/dl</td>
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