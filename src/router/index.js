import {createRouter, createWebHistory} from 'vue-router'
import Register from "@/views/Register";
import IndexPage from "@/views/IndexPage";
import Home from "@/components/home/Home";
import Adopt from "@/components/home/adopt/Adopt";
import Login from "@/views/Login";
import Seek from "@/components/home/seek/Seek";
import Rescue from "@/components/home/rescue/Rescue";
import Help from "@/components/home/Help";
import EditUserInfo from "@/components/user/EditUserInfo";
import MyMessage from "@/components/user/MyMessage";
import InfoManager from "@/components/manager/InfoManager";
import AdoptManager from "@/components/manager/AdoptManager";
import SeekManager from "@/components/manager/SeekManager";
import RescueManager from "@/components/manager/RescueManager";
import NewsManager from "@/components/manager/NewsManager";
import CommentManager from "@/components/manager/CommentManager";
import UserManager from "@/components/manager/UserManager";
import BaseDataManager from "@/components/manager/BaseDataManager";
import HelpManager from "@/components/manager/HelpManager";
import AdoptPublish from "@/components/home/adopt/AdoptPublish";
import AdoptView from "@/components/home/adopt/AdoptView";
import SeekPublish from "@/components/home/seek/SeekPublish";
import RescuePublish from "@/components/home/rescue/RescuePublish";
import RescueView from "@/components/home/rescue/RescueView";
import SeekView from "@/components/home/seek/SeekView";
import RealTimeView from "@/components/home/realtime/RealTimeView";
import RealTime from "@/components/home/realtime/RealTime";
import RealTimePublish from "@/components/home/realtime/RealTimePublish";

const routes = [
    {
        path: '/',
        name: 'indexPage',
        redirect: '/home',
        component: IndexPage,
        children: [
            {
                path: 'home',
                name: '首页',
                component: Home,
            }, {
                path: 'adopt',
                name: '领养',
                component: Adopt,
            }, {
                path: 'realtime',
                name: '资讯',
                component: RealTime,
            }, {
                path: 'seek',
                name: '寻宠',
                component: Seek,
            }, {
                path: 'rescue',
                name: '救助',
                component: Rescue,
            }, {
                path: 'help',
                name: '帮助',
                component: Help,
            }, {
                path: 'edit_user_info',
                name: '用户信息',
                component: EditUserInfo,
            }, {
                path: 'message',
                name: '消息',
                component: MyMessage,
            }, {
                path: 'info_manager',
                redirect: '/info_manager/adopt',
                component: InfoManager,
                name: '管理',
                children: [
                    {
                        path: 'adopt',
                        name: '领养管理',
                        component: AdoptManager,
                    }, {
                        path: 'seek',
                        name: '寻宠管理',
                        component: SeekManager,
                    }, {
                        path: 'rescue',
                        name: '救助管理',
                        component: RescueManager,
                    }, {
                        path: 'news',
                        name: '资讯管理',
                        component: NewsManager,
                    }, {
                        path: 'comment',
                        name: '评论管理',
                        component: CommentManager,
                    }, {
                        path: 'user',
                        name: '用户管理',
                        component: UserManager,
                    }, {
                        path: 'base',
                        name: '基础数据管理',
                        component: BaseDataManager,
                    }, {
                        path: 'help',
                        name: '帮助管理',
                        component: HelpManager,
                    },
                ]
            }, {
                path: 'adopt_publish/:id',
                component: AdoptPublish,
                name: '领养发布',
                props: true
            }, {
                path: 'adopt_view/:id',
                component: AdoptView,
                name: '领养信息',
                props: true
            }, {
                path: 'seek_publish/:id',
                component: SeekPublish,
                name: '寻宠发布',
                props: true
            }, {
                path: 'seek_view/:id',
                component: SeekView,
                name: '寻宠信息',
                props: true
            }, {
                path: 'rescue_publish/:id',
                component: RescuePublish,
                name: '救助发布',
                props: true
            }, {
                path: 'rescue_view/:id',
                component: RescueView,
                name: '救助信息',
                props: true
            }, {
                path: 'realtime_view/:id',
                component: RealTimeView,
                name: '资讯信息',
                props: true
            }, {
                path: 'realtime_publish',
                name: '资讯发布',
                component: RealTimePublish
            }
        ]
    }, {
        path: '/register',
        name: '注册',
        component: Register
    }, {
        path: '/login',
        name: '登录',
        component: Login
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return {top: 0}
    }
})

// router.beforeEach((to, from, next) => {
// 在这里进行路由拦截和导航控制逻辑
// console.log("to", to, "from", from, "next", next)
// const breadcrumb = []
// breadcrumb.push({label: from.name, link: from.fullPath});
// breadcrumb.push({label: to.name, link: to.fullPath});
// console.log("breadcrumb", breadcrumb)
// next(vm => {
//     vm.breadcrumb = breadcrumb;
// })
// })

export default router
