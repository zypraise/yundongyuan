// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import index from './views/index/index.vue';
import login from './views/index/login.vue';
import policy from './views/index/policy.vue';
import technology from './views/index/technology.vue';
import register from './views/index/register.vue';
import forget from './views/index/forget.vue';
import choiceRegister from './views/index/choiceRegister.vue';
import person from './views/person/person.vue';
import sportInjury from './views/injury/sportInjury.vue'; //伤病运动员
import trainInjury from './views/injury/trainInjury.vue'; //伤病教练员
import allComposition from './views/body/allComposition.vue';//体成分
import bodyComposition from './views/body/composition.vue';//体成分
import phyConstituents from './views/physiology/constituents.vue';//体成分
import allConstituents from './views/physiology/allConstituents.vue';//体成分
import stamina from './views/stamina/stamina.vue';//体能训练
import staminaAdd from './views/stamina/staminaAdd.vue';//体能测试
import subjective from './views/subjective/subjective.vue';//运动员主观评价
import allSubjective from './views/allSubjective/allSubjective.vue';//主观评价
//import primary from './views/primary/primary.vue';//首页
import workout from './views/workout/workout.vue';//体能测试
import workoutAdd from './views/workout/workoutAdd.vue';//体能测试
import mixedAbility from './views/mixedAbility/mixedAbility.vue';//综合能力
import trainingPlan from './views/trainingPlan/trainingPlan.vue';//训练计划
import allTrainingPlan from './views/trainingPlan/allTrainingPlan.vue';//训练计划
import skiing from './views/skiing/skiing.vue';//越野滑雪
import allSkiing from './views/skiing/allSkiing.vue';//越野滑雪

Vue.use(Router)
window.router = new Router({
    routes: [
        {
            path: '/index',
            component: index
        }, {
            path: '/login',
            component: login
        }, {
            path: '/policy',
            component: policy
        }, {
            path: '/technology',
            component: technology
        }, {
            path: '/register',
            component: register,
        }, {
            path: '/forget',
            component: forget
        }, {
            path: '/choiceRegister',
            component: choiceRegister
        }, {
            path: '/person',
            component: person
        }, {
            path: '/sportInjury',
            component: sportInjury
        }, {
            path: '/trainInjury',
            component: trainInjury
        }, {
            path: '/bodyComposition',
            component: bodyComposition
        }, {
            path: '/allComposition',
            component: allComposition
        }, {
            path: '/phyConstituents',
            component: phyConstituents
        }, {
            path: '/allConstituents',
            component: allConstituents
        }, {
            path: '/stamina',
            component: stamina
        }, {
            path: '/staminaAdd',
            component: staminaAdd
        }, {
            path: '/subjective',
            component: subjective
        }, {
            path: '/allSubjective',
            component: allSubjective
        }, {
            path: "/workout",
            component: workout
        }, {
            path: "/workoutAdd",
            component: workoutAdd
        }, {
            path: "/mixedAbility",
            component: mixedAbility
        }, {
            path: "/trainingPlan",
            component: trainingPlan
        }, {
            path: '/allTrainingPlan',
            component: allTrainingPlan
        }, {
            path: '/skiing',
            component: skiing
        }, {
            path: '/allSkiing',
            component: allSkiing
        }
    ]
})
export default router;
