<template>
	<table>
		<thead>
			<tr>
				<th>提交时间</th>
				<th>白细胞</th>
				<th>红细胞</th>
				<th>血红蛋白</th>
				<th>中性粒细胞</th>
				<th>淋巴细胞</th>
				<th>血球压积</th>
				<th>血尿素</th>
				<th>肌酸激酶</th>
				<th>皮质醇</th>
				<th>睾酮</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item,index) in phyConstituentsList">
				<td>{{item.Testdate}}</td>
				<td>{{item.Leukocyte}}</td>
				<td>{{item.Erythrocyte}}</td>
				<td>{{item.Hemoglobin}}</td>
				<td>{{item.Neutrophils}}</td>
				<td>{{item.Lymphocyte}}</td>
				<td>{{item.Hematocrit}}</td>
				<td>{{item.BloodUrea}}</td>
				<td>{{item.CreatineKinase}}</td>
				<td>{{item.Cortisol}}</td>
				<td>{{item.Testosterone}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	var vm;
	export default {
		props: ['phyConstituentsList'],
		data: function() {
			return {}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader('.table-box')
				
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