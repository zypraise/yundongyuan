<template>
	<div id='app'>
		<router-view></router-view>
	</div>
</template>

<script>
	var vm;
	export default {
		name: 'app',
		data: function() {
			return {}
		},
		methods: {
			start: function() {
				if(vm.$route.path == '/policy' || vm.$route.path == '/technology'){
					return;
				}
				if(window.localStorage.getItem('Sport_Access_Token')){
					vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'));
				}else{
					vm.$router.push({
						path: '/login'
					});
				}
			},
			getUserInfo:function(data){
				vm.$http.get(myPublic.publicUrl + '/API/User/GetUserInfo', {
						headers:{
							token:data
						}
					}).then(function(result) {
						try
						{
							if(result.body.StateCode != 0) {
								vm.$router.push({
									path: '/login'
								});
							}else{
								window.localStorage.setItem('user',JSON.stringify(result.body.Data));
							}
						}
						catch(err){
							vm.$router.push({
								path: '/login'
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
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