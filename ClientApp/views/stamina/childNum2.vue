<template>
	<table>
		<thead>

			<tr>
				<th style="min-width: 100px;">时间</th>
				<th v-for="(item,index) in staminaName">{{item}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item,index) in staminaList">
				<td>{{item.TestDate}}</td>
				<td v-for="val in item.valueList">{{val}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	var vm;
	export default {
		props: ['staminaList', 'staminaName'],
		data: function() {
			return {}
		},
		watch: {
			staminaList: function() {
				vm.$forceUpdate();
			}
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