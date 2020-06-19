<template>
	<div id="header" :class="{'current':isPath}">
    	<header>
    		<div class="header-logo"><img src="../assets/imgs/logo.png" />运动员训练监控与评价系统</div>
    		<div class="header-login" v-if="is && isPath">
    			<span v-on:click="goUrl('/login')">登录</span>
    			<span v-on:click="goUrl('/register')">注册</span>
    		</div>
    		<div class="header-portrait" v-if="is && !isPath">
    			<div class="header-portrait-text">
    				<p>{{user.FullName}}</p>
    				<p>{{user.TrainName}}</p>
    			</div>
    			<div style="display:  inline-block;width:  44px;height: 44px;overflow: hidden;">
    			<img v-if="picture" v-on:click="setIsMenu()" :src="picture">
    			<img v-else v-on:click="setIsMenu()" src="../assets/imgs/person.png">
    				
    			</div>
    			<ul v-if="isMenu" class="header-menu">
    				<li class="jiao"></li>
    				<li class="item" v-if="userType != '系统管理员'" v-on:click="goUrl('/person')"><span>个人中心</span></li>
    				<hr v-if="userType != '系统管理员'" />
    				<li class="item" v-on:click="logout()"><span>注销</span></li>
    			</ul>
    		</div>
    	</header>
    </div>
</template>

<script>
    var vm;
    export default {
    	props: ['shuaxin','personImg'],
        data: function () {
            return {
            	user:{},
            	picture:'',//头像
            	userType:'',
            	isMenu:false,
            	is:false,
            	isPath:true
            }
		},
		watch: {
			shuaxin:function(){
				vm.user =JSON.parse(window.localStorage.getItem('user'));
			},
			personImg:function(newVal,oldVal){
				if(newVal){
					vm.picture = newVal;
				}
			},
			isMenu: function(newVal, oldVal) {
				if(newVal){
					document.body.onclick = function(){
            			vm.isMenu = false;
            			document.body.onclick = undefined;
            		};
				}
			}
		},
        methods: {
            start: function () {
            	vm.isPath = vm.$route.path == '/register' || vm.$route.path == '/forget' || vm.$route.path == '/choiceRegister';
            	vm.user =JSON.parse(window.localStorage.getItem('user'));
            	if(window.localStorage.getItem('Sport_userType') == '教练'){
            		vm.user.TrainName ='教练';
            	}
            	if(window.localStorage.getItem('Sport_userPicture')){
            		vm.picture = window.localStorage.getItem('Sport_userPicture');
            	}
            	vm.userType = window.localStorage.getItem('Sport_userType');
            	vm.is = true;
            },
            setIsMenu:function(){
            	myPublic.holdBubble();
            	vm.isMenu = !vm.isMenu;
            },
            //注销
            logout:function(){
            	vm.$http.post(myPublic.publicUrl + '/API/Account/Logout', {}).then(function(result) {
						if(result.body.StateCode == 0){
							window.localStorage.removeItem('user');
							window.localStorage.removeItem('Sport_userType');
							window.localStorage.removeItem('Sport_Access_Token');
							window.localStorage.removeItem('Sport_userPicture');
							vm.goUrl('/login');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
            },
            goUrl:function(url){
            	vm.$router.push({
					path: url
				});
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

<style>
</style>