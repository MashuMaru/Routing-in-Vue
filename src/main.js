import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';

import App from './App.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        } // teams/teamID (t1)
      ]
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter }
      //authentication within main global JS
      //   beforeEnter(to, from, next) {
      //     console.log(to, from);
      //     console.log('users before enter.');
      //     const name = prompt('name please');
      //     if (name === 'users') {
      //       next();
      //     } else {
      //       next({ path: '/:undefined(.*)', component: NotFound });
      //     }
      //   }
    },

    // below route has been moved to a nested route for TeamsList.
    // { path: '/teams/:teamId', component: TeamMembers, props: true },
    { path: '/:undefined(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    };
  }
});

// to check if the user is authenticated below
router.beforeEach(function(to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs Auth.');
    next();
  } else {
    next();
  }
  //   const name = prompt('where do you want to go?');
  //   if (name === 'team-members') {
  //     next();
  //   } else {
  //     next({ name: 'team-members', params: { teamId: 't2' } });
  //   }
  next();
});

router.afterEach(function(to, from) {
  // sending analytics data
  console.log('Global afterEach');
  console.log(to, from);
});

const app = createApp(App);

app.use(router);
app.mount('#app');
