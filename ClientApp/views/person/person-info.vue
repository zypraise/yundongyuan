<template>
	<div>
		<div v-if="zhuangtai" class="person-info-content">
			<div class="item">
				<label>头像：</label>
				<div class="text" style="position: relative;">
					<img v-if="personImg" :src="personImg">
					<img v-else src="../../assets/imgs/person.png">
					<input type="file" name="file" id="file" accept="image/gif, image/jpeg, image/png" />
				</div>
			</div>
			<div class="item">
				<label>姓名：</label>
				<div class="text">{{user.FullName}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>籍贯：</label>
				<div class="text">{{user.NativePlace}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>民族：</label>
				<div class="text">{{user.Nation}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>血型：</label>
				<div class="text">{{user.BloodType}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>身高：</label>
				<div class="text">{{user.Height}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>体重：</label>
				<div class="text">{{user.Weight}}&nbsp;</div>
			</div>
			
			<div class="item">
				<label>性别：</label>
				<div class="text">{{user.Sex}}&nbsp;</div>
			</div>
			<!-- <div class="item">
				<label>手机号：</label>
				<div class="text">{{}}&nbsp;</div>
			</div> -->
			<div v-if="userType == '运动员'" class="item">
				<label>出生年月：</label>
				<div class="text">{{user.Birthday}}&nbsp;</div>
			</div>
			<div class="item">
				<label>运动等级：</label>
				<div class="text" v-if="user.SportGrade === ''">-</div>
				<div class="text" v-if="user.SportGrade === 0">国际级运动健将</div>
				<div class="text" v-if="user.SportGrade == 1">运动健将</div>
				<div class="text" v-if="user.SportGrade == 2">一级运动员</div>
				<div class="text" v-if="user.SportGrade == 3">二级运动员</div>
				<div class="text" v-if="user.SportGrade == 4">三级运动员</div>
				<div class="text" v-if="user.SportGrade == 5">其他</div>
			</div>
			<div class="item">
				<label>运动项目：</label>
				<div class="text">{{user.TrainName}}&nbsp;</div>
			</div>
			<div v-if="userType == '运动员'" class="item">
				<label>教练：</label>
				<div class="text">{{user.CoachId}}&nbsp;</div>
			</div>
			<div class="item">
				<label>参与训练时间：</label>
				<div class="text">{{user.Start4Training}}&nbsp;</div>
			</div>
			<div class="item">
				<label>运动年限：</label>
				<div class="text">{{nianxian}}&nbsp;</div>
			</div>
		</div>
		<!-- 编辑 -->
		
		
		
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {
				userType: '',
				zhuangtai: true, //true 显示，false 编辑
				personImg: '', //头像
				user: {
					FullName: '',
					nativePlace:'',
					nation:'',
					bloodType:'',
					height:'',
					weight:'',
					Sex: '',
					Birthday: '',
					SportGrade: 0,
					TrainName: '',
					CoachId: '',
					Start4Training: 0
				}
			}
		},
		watch: {},
		//计算属性
		computed: {
			nianxian: function() {
				return myPublic.dateForFormat(null, 'yyyy') - vm.user.Start4Training;
			},
		},
		methods: {
			start: function() {
				vm.getUserInfo(window.localStorage.getItem('Sport_Access_Token'), false);
				vm.userType = window.localStorage.getItem('Sport_userType');
				if(window.localStorage.getItem('Sport_userPicture')) {
					vm.personImg = window.localStorage.getItem('Sport_userPicture');
				}
				vm.imgInp();
			},
			closeZhuanXiang:function(i){},
			closeJiaoLian:function(i){},
			imgInp: function() {
				document.getElementById('file').onchange = function() {

					var fileInput = document.getElementById('file');
					var formData = new FormData(); //创建formData对象
					formData.append('file', fileInput.files[0]);
					var httpDemo = new XMLHttpRequest(); //创建httprequest对象
					httpDemo.open('post', 'http://localhost/API/User/SetUserHead', true); //初始化请求  post方式  接口  异步
					httpDemo.onreadystatechange = function(e) {
						if(httpDemo.readyState == 4 && httpDemo.status == 200) {
							var res = JSON.parse(httpDemo.responseText)
							if(res.StateCode == 0) {
								var reader = new FileReader();
								reader.readAsDataURL(fileInput.files[0]);
								reader.onload = function(e) {
									vm.personImg = e.target.result;
									window.localStorage.setItem('Sport_userPicture', e.target.result);
									window.bus.$emit('personImg', e.target.result);
								}
							} else {
								window.myPublic.alertResult(res.Message);
							}
						}
					}
					httpDemo.send(formData); //发送请求
				}
			},
			save: function() {},
			getUserInfo: function(data, is) {
				vm.$http.get(myPublic.publicUrl + '/API/User/GetUserInfo', {
					headers: {
						token: data
					}
				}).then(function(result) {
					try {
						if(result.body.StateCode != 0) {
							vm.$router.push({
								path: '/login'
							});
						} else {
							window.localStorage.setItem('user', JSON.stringify(result.body.Data));
						}
					} catch(err) {
						vm.$router.push({
							path: '/login'
						});
					}
					vm.user = JSON.parse(window.localStorage.getItem('user'));
					vm.year = vm.user.Birthday.split('-')[0];
					vm.month = parseInt(vm.user.Birthday.split('-')[1]);
					vm.day = parseInt(vm.user.Birthday.split('-')[2]);
					if(is) {
						vm.zhuangtai = true;
						window.bus.$emit('person', 1);
					}

				}).catch(function(error) {
					console.log(error);
				});
			},
			//获取教练员
			GetAllDepartment: function() {},
			//获取训练专项
			GetAllTrain: function() {}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
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