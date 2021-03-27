<template>
  <button v-on:click="confirmInput">Confirm</button>
  <button v-on:click="saveChanges">Save changes</button>
  <p v-if="!changesSaved">You havent saved your data.</p>
  <p v-else>Data saved!</p>
  <ul>
    <UserItem
      v-for="user in users"
      v-bind:key="user.id"
      v-bind:name="user.fullName"
      v-bind:role="user.role"
    />
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';
// import NotFound from '../nav/NotFound';

export default {
  data: function() {
    return {
      leaving: '',
      changesSaved: false
    };
  },
  components: {
    UserItem
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      //do something
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
    }
  },
  // authentication within the component
  beforeRouteEnter(to, from, next) {
    console.log('UserList component before route enter.');
    console.log(to, from);
    next();
    // const name = prompt('where do you want to go?');
    // if(name === 'users') {
    //   next();
    // } else {
    //   next({path:'/noaccess', component: NotFound});
    // }
  },
  beforeRouteLeave(to, from, next) {
    if (this.changesSaved) {
      next();
    } else {
      const userWantsToLeave = confirm('Are you sure?');
      next(userWantsToLeave);
    }
  },
  unmounted() {
    this.leaving = 'leaving page.';
    console.log(this.leaving);
    console.log('unmounted');
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
