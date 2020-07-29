<template>
		
	<div id='app'>
		<router-view v-if="shuaxin"></router-view>
	</div>
</template>

<script>
	var vm;
	export default {
		name: 'app',
		data: function() {
			return {
				shuaxin:true,
			}
		},
		methods: {
			start: function() {
				if(vm.$route.path == '/policy' || vm.$route.path == '/technology'){
					return;
				}
				if(vm.$route.path == '/allSubjective' && myPublic.getUrlParam('ishou')){
					vm.refreshToken();
					return
				}
				if(window.localStorage.getItem('Sport_Access_Token')){
					vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'));
				}else{
					vm.$router.push({
						path: '/login'
					});
				}
			},
			refreshToken:function(){
				
				vm.$http.post(myPublic.publicUrl + '/API/Account/RefreshAccessToken', {}).then(function(result) {
						if (result.body.Message == "操作成功") {
							window.localStorage.setItem('Sport_Access_Token', result.body.Data.Token_Type + ' ' + result.body.Data.Access_Token);
							window.localStorage.setItem('Sport_userType', result.body.Data.RoleName);
							window.localStorage.setItem('Sport_userPicture', window.myPublic.publicUrl + result.body.Data.Picture ? result
								.body.Data.Picture : '/web/wwwroot/dist/images/person.png');
							vm.getUserInfo(result.body.Data.Token_Type + ' ' + result.body.Data.Access_Token);
						} else {
							vm.$router.push({
								path: '/login'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
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
						vm.shuaxin = false;
						vm.$nextTick(function(){
							vm.shuaxin = true;
						})
						
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