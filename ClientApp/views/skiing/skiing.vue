<template>
  <div id="skiing">
    <header-component></header-component>
    <section class="content">
      <top-menu></top-menu>
      <div class="index-content">
        <div style="margin-right:20px;margin-bottom:20px; float:right;">
          <section class='mydate-box' style="position: relative">
            <div class="week">{{ week }}周</div>
            <input class='form_datetime' style="opacity: 0" onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
            <section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
          </section>
          <button class="daochu" v-on:click="getList()">查询</button>
        </div>
        <div style="clear: both;"></div>

        <section class="shengli-main" style="width:100%">
          <div class="body-item">
            <section>
              <div class="table-box">
                <table style="margin-bottom: 50px;">
                  <thead>
                  <tr>
                    <th rowspan="2" style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;">运动员</th>
                    <th rowspan="2" style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;">星期</th>
                    <th rowspan="2">运动项目</th>
                    <th rowspan="2">参赛主项</th>
                    <th rowspan="2">年龄</th>
                    <th rowspan="2">性别</th>
                    <th colspan="3">总负荷量</th>
                    <th colspan="5">总负荷强度</th>
                    <th colspan="3">滑雪量</th>
                    <th colspan="5">滑雪训练强度</th>
                    <th colspan="3">跑步训练量</th>
                    <th colspan="5">跑步训练强度</th>
                    <th colspan="3">力量训练</th>
                    <th colspan="2">核心训练</th>
                    <th colspan="3">其他训练</th>
                    <th rowspan="2">备注</th>
                  </tr>
                  <tr>
<!--总-->
                    <th>训练距离(km)</th>
                    <th>训练时间(hh:mm:ss)</th>
                    <th>训练课次</th>

                    <th>1级强度(hh:mm:ss)</th>
                    <th>2级强度(hh:mm:ss)</th>
                    <th>3级强度(hh:mm:ss)</th>
                    <th>4级强度(hh:mm:ss)</th>
                    <th>5级强度(hh:mm:ss)</th>

<!--滑雪-->
                    <th>训练距离(km)</th>
                    <th>训练时间(hh:mm:ss)</th>
                    <th>训练课次</th>

                    <th>1级强度(hh:mm:ss)</th>
                    <th>2级强度(hh:mm:ss)</th>
                    <th>3级强度(hh:mm:ss)</th>
                    <th>4级强度(hh:mm:ss)</th>
                    <th>5级强度(hh:mm:ss)</th>
<!--跑步-->
                    <th>训练距离(km)</th>
                    <th>训练时间(hh:mm:ss)</th>
                    <th>训练课次</th>

                    <th>1级强度(hh:mm:ss)</th>
                    <th>2级强度(hh:mm:ss)</th>
                    <th>3级强度(hh:mm:ss)</th>
                    <th>4级强度(hh:mm:ss)</th>
                    <th>5级强度(hh:mm:ss)</th>
<!--力量-->
                    <th>负重量(kg)</th>
                    <th>训练时间(hh:mm:ss)</th>
                    <th>训练课次</th>
<!--核心训练-->
                    <th>训练时间(hh:mm:ss)</th>
                    <th>训练课次</th>
<!--其他-->
                    <th>训练内容</th>
                    <th>训练时间(hh:mm:ss)</th>
                    <th>训练课次</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期一</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr>
                  <tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期二</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr>
                  <tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期三</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr>
                  <tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期四</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr>
                  <tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期五</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr><tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期六</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr><tr>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">wangran</th>
                    <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">星期日</th>
                    <td>滑雪</td>
                    <td>竞速</td>
                    <td>21</td>
                    <td>男</td>
                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>
                    <td>1:30:00</td>

                    <td>2.6</td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                    <td>1:30:00</td>
                    <td>11</td>

                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>

var vm;
import {
  getSortText
} from '../../components/sort.js';
import header from '../../components/header.vue';
import topMenu from '../../components/menu.vue';

import '../../assets/styles/skiing.css';
export default {
  data: function() {
    return {
      week:'',
      startTime:'',
      endTime:'',
      sortlist:[
        {
          type:'Testdate',
          is:true,
          sort:false
        },
        {
          type:'SportName',
          is:false,
          sort:false
        },
        {
          type:'Leukocyte',
          is:false,
          sort:false
        },
        {
          type:'Erythrocyte',
          is:false,
          sort:false
        },
        {
          type:'Hemoglobin',
          is:false,
          sort:false
        },
        {
          type:'Hematocrit',
          is:false,
          sort:false
        },
        {
          type:'Lymphocyte',
          is:false,
          sort:false
        },
        {
          type:'Neutrophils',
          is:false,
          sort:false
        },
        {
          type:'BloodUrea',
          is:false,
          sort:false
        },
        {
          type:'CreatineKinase',
          is:false,
          sort:false
        },
        {
          type:'Cortisol',
          is:false,
          sort:false
        },
        {
          type:'Testosterone',
          is:false,
          sort:false
        }
      ],
      list: [],
      userType: '', //用户类型
      sex: '',
      trainFirse: '',
      trainId: '',
      sportIndex: '',
      sportList: [],
      zhuanxiangList: [],
      zhuanxiangLists: []
    }
  },
  components: {
    headerComponent: header,
    topMenu: topMenu
  },
  watch: {
    trainFirse: function(newVal, oldVal) {
      vm.trainId = '';
      vm.sportIndex = '';
      vm.getSport();
    },
    trainId: function(newVal, oldVal) {
      vm.sportIndex = '';
      vm.getSport();
    },
    sex: function(newVal, oldVal) {
      vm.sportIndex = '';
      vm.getSport();
    },
  },
  methods: {
    start: function() {
      myPublic.tableHeader(".table-box");
      document.getElementById('starttime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
      vm.userType = window.localStorage.getItem('Sport_userType');
      vm.setWeekTime();
      if (vm.userType == '分队教练') {
        vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
      }
      vm.GetAllTrain().then(() => {
        vm.getSport().then(() => {
          vm.getList();
        });
      });
    },
    setWeekTime: function (){
      function fun(){
        const d = new Date(document.getElementById('starttime').value)
        const day = d.getDay() == 0 ? 7 : d.getDay();
        vm.startTime = myPublic.dateForFormat(myPublic.getAddDayDate(d , 1 - day), 'yyyy-MM-dd');
        vm.endTime = myPublic.dateForFormat(myPublic.getAddDayDate(new Date(vm.startTime) , 6), 'yyyy-MM-dd');
        console.log(vm.startTime + vm.endTime)
        vm.week = myPublic.getWeek(document.getElementById('starttime').value)
      }
      setInterval(fun, 200);
      fun();
    },
    getList: function() {
      // do {
      //   text += "<br>数字为 " + i;
      //   i++;
      // } while (i < 5);
      var _d = '';
      _d += 'trainId=';
      _d += '&trainSecId=';
      _d += '&sex=';
      _d += '&sportuserid=' + JSON.parse(window.localStorage.getItem('user')).Id;
      _d += '&starttime=' + vm.startTime;
      _d += '&endtime=' + vm.endTime;
      _d += '&sort=' + getSortText(vm.sortlist)
      _d += '&pagesize=9999&pageindex=1';
      vm.$http.get(myPublic.publicUrl + '/API/Skiing/GetAllSkiing?' + _d, {})
          .then(function(result) {
            if (result.body.StateCode == 0) {
              vm.list = result.body.Data ? result.body.Data : [];
            } else {
              vm.$router.push({
                path: '/login'
              });
            }
            resolve();

          }).catch(function(error) {
        console.log(error);
      });
    },
    //获取训练专项
    GetAllTrain: function() {
      return new Promise(function(resolve, reject) {
        vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllTrain', {
          params: {
            userName: ''

          }
        }).then(function(result) {
          if (result.body.StateCode == 0) {
            var _z = [];
            var _id = JSON.parse(window.localStorage.getItem('user')).TrainId.split(',');
            if(!(_id[0] === '' && _id.length == 1)){
              for(var i = 0; i < result.body.Data.length; i++) {
                if(_id.includes(result.body.Data[i].Id)) {
                  _z.push(result.body.Data[i]);
                  if(_z.length >= _id.length){break;}
                }
              }
            }else{
              _z = [...result.body.Data];
            }
            vm.zhuanxiangList = _z;
            vm.zhuanxiangLists= [...result.body.Data];
            vm.$nextTick(function(){
              // if(vm.userType == '超级管理员'){
              // 	vm.trainFirse = '';
              // }else{
              // 	for(var i = 0; i < _z.length; i++) {
              // 		if(_z[i].SystemId.length == 3) {
              // 			vm.trainFirse = i;
              // 			break;
              // 		}
              // 	}
              // }
              resolve()
            });

          }
        })
            .catch(function(error) {
              console.log(error);
              reject()
            });
      });

    },
    //获取远动员列表
    getSport: function() {
      return new Promise(function(resolve, reject) {
        vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?'+'trainFId=' + (vm.trainFirse !== ''?vm.zhuanxiangList[vm.trainFirse].Id:'') + '&trainId=' + vm.trainId + '&sex=' + vm.sex, {})
            .then(function(result) {
              if (result.body.StateCode == 0) {
                vm.sportList = result.body.Data;
              } else {
                vm.$router.push({
                  path: '/login'
                });
              }
              resolve();

            }).catch(function(error) {
          console.log(error);
        });
      });
    }
  },
  beforeCreate: function() {
    vm = this;
  },
  beforeDestroy: function() {},
  mounted: function() {
    vm.start();
  }
}
</script>
