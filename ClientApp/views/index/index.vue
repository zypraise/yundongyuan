<template>
	<div>
		<div v-for="(item,index) in list">{{item.name}}--{{index}}</div>
	</div>
</template>
<script>
	var vm;
	import '../../assets/styles/index/css.css';
    export default {
    	//变量
        data: function () {
			return {
				list:[]
            }
		},
		//公共模板
		components: {
        },
		watch: {
		},
		//计算属性
		computed:{
		},
        methods: {
            start: function () {
            	vm.list = [{
					name:'as'
				},{
					name:'ed'
				},{
					name:'asd'
				}];
            }
        },
		beforeCreate: function () {
            vm = this;
        },
		mounted: function () {
            vm.start();
        }
    }
</script>