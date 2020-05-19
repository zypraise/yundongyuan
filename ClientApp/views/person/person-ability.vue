<template>
	<div class="person-ability-content">
    	综合能力
    </div>
</template>

<script>
    var vm;
    export default {
        data: function () {
            return {
            }
		},
        methods: {
            start: function () {
            }
		},
        beforeCreate: function () {
            vm = this;
        },
        mounted: function () {
        	if(!window.localStorage.getItem('Sport_Access_Token')) {
				vm.$router.push({
					path: '/login'
				});
			}
            vm.start();
        }
    }
</script>

<style>
</style>