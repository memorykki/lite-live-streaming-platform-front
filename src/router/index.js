import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import person from '@/components/person/person.vue';
import information from '@/components/person/users/information.vue'
import attention from '@/components/person/users/attention.vue'
import wallet from '@/components/person/users/wallet.vue'
import history from '@/components/person/users/history.vue'
import gift from '@/components/person/users/gift.vue'
import dynamic from '@/components/person/users/dynamic.vue'
import show from '@/components/person/users/show.vue'

import anchorInfo from '@/components/person/anchor/anchorInfo.vue'
import playback from '@/components/person/anchor/playback.vue'

import user from '@/components/person/administrators/user.vue'
import demand from '@/components/person/administrators/demand.vue'
import ban from '@/components/person/administrators/ban.vue'
import report from '@/components/person/administrators/report.vue'
import Admingift from '@/components/person/administrators/Admingift.vue'
import Adminwatching from '@/components/person/administrators/Adminwatching.vue'

import dashboard from '@/views/dashboard/index.vue'
import ranking from '@/views/dashboard/ranking.vue'
import dancing from '@/views/dashboard/dancing.vue'
import game from '@/views/dashboard/game.vue'
import singing from '@/views/dashboard/singing.vue'
import movie from '@/views/dashboard/movie.vue'
import wholelife from '@/views/dashboard/wholelife.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  //**************************************************** */
  {
    path: '/home',
    name:"home",
    component: () => import('@/views/home/home'),
    hidden: true
  },
  {
    path: '/vod',
    name:"vod",
    component: () => import('@/views/vod/index'),
    hidden: true
  },
  {
    path: '/liveTogether',
    name:"liveTogether",
    component: () => import('@/views/live_together/index'),
    hidden: true
  },

  {
    path: '/postimage',
    name:"liveTogether",
    component: () => import('@/views/postimage/postimage'),
    hidden: true
  },
  // {
  //   path: '/dynamic',
  //   component: () => import('@/views/dynamic/index.vue'),
  //   hidden: true
  // },

  {
    path:'/dashboard',
    name:'dashboard',
    component:dashboard,
    
    children:[
      {
        path:'/ranking',
        name:'ranking',
        component:ranking
      },
      {
        path:'/dancing',
        name:'dancing',
        component:dancing
      },
      {
        path:'/singing',
        name:'singing',
        component:singing
      },
      {
        path:'/game',
        name:'game',
        component:game
      },
      {
        path:'/movie',
        name:'movie',
        component:movie
      },
      {
        path:'/wholelife',
        name:'wholelife',
        component:wholelife
      },
    ]
  },


  // //*************************************************************** */
  // {
  //   path: '/user',
  //   component: Layout,
  //   hidden: true,
  //   children:[
  //     {
  //       path: 'person',
  //       name: 'person',
  //       component:person,
  //       children:[
  //       {
  //         path:'anchorInfo',
  //         name:'anchorInfo',
  //         component:anchorInfo
  //       },
  //         {
  //           path:'playback',
  //           name:'playback',
  //           component:playback
  //         },
  //       {
  //         path:'information',
  //         name:'information',
  //         component:information
  //       },
  //       {
  //         path:'attention',
  //         name:'attention',
  //         component:attention
  //       },
  //       {
  //         path:'wallet',
  //         name:'wallet',
  //         component:wallet
  //       },
  //       {
  //         path:'history',
  //         name:'history',
  //         component:history
  //       },
  //       {
  //         path:'gift',
  //         name:'gift',
  //         component:gift
  //       },
  //       {
  //         path:'dynamic',
  //         name:'dynamic',
  //         component:dynamic
  //       },
  //       {
  //         path:'show',
  //         name:'show',
  //         component:show
  //       },
  //       {
  //         path:'report',
  //         name:'report',
  //         component:report
  //       },
  //       {
  //         path:'demand',
  //         name:'demand',
  //         component:demand
  //       },
  //       {
  //         path:'ban',
  //         name:'ban',
  //         component:ban
  //       },
  //       {
  //         path:'user',
  //         name:'user',
  //         component:user
  //       },
  //       {
  //         path:'admingift',
  //         name:'admingift',
  //         component:Admingift
  //       },
  //       {
  //         path:'adminwatching',
  //         name:'adminwatching',
  //         component:Adminwatching
  //       }
  //       ]
  //     },
  //   ]
  // },
  

  //绝对路径，，，，，，，，，，，，，记得改
   //*************************************************************** */
   {
    
        path: '/person',
        name: 'person',
        component:person,
        children:[
        {
          path:'/anchorInfo',
          name:'anchorInfo',
          component:anchorInfo
        },
          {
            path:'/playback',
            name:'playback',
            component:playback
          },
        {
          path:'/information',
          name:'information',
          component:information
        },
        {
          path:'/attention',
          name:'attention',
          component:attention
        },
        {
          path:'/wallet',
          name:'wallet',
          component:wallet
        },
        {
          path:'/history',
          name:'history',
          component:history
        },
        {
          path:'/gift',
          name:'gift',
          component:gift
        },
        {
          path:'/dynamic',
          name:'dynamic',
          component:dynamic
        },
        {
          path:'/show',
          name:'show',
          component:show
        },
        {
          path:'/report',
          name:'report',
          component:report
        },
        {
          path:'/demand',
          name:'demand',
          component:demand
        },
        {
          path:'/ban',
          name:'ban',
          component:ban
        },
        {
          path:'/user',
          name:'user',
          component:user
        },
        {
          path:'/admingift',
          name:'admingift',
          component:Admingift
        },
        {
          path:'/adminwatching',
          name:'adminwatching',
          component:Adminwatching
        }
        ]
      },
 

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
