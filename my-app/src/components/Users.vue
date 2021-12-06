<template>
  <div class="users">
    <div class="user_card" v-for="user in usersAdmin" v-bind:key="user._id">
      <div class="user_card__main_info">
        <div class="user_card__photo">
          <img :src="require(`../assets/images/${user.image}`)">
        </div>
        <div class="user_card__user_name">{{ user.name }} {{ user.surname}}</div>
        <!-- <div class="user_card__tasks_statistic">Виконано завдань - 10</div> -->
      </div>
      <div class="user_card__personal_info">
        <p class="user_card__position"><i class="fas fa-user-tie"></i>{{ user.position }}</p>
        <p class="user_card__email"><i class="fas fa-envelope"></i> {{ user.email }}</p>
        <p class="user_card__phone"><i class="fas fa-phone"></i>{{ user.phone }}</p>
        <p class="user_card__date_of_bith"><i class="fas fa-birthday-cake"></i> {{ user.data_of_birth }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Users',
    data: function() {
      return {
        usersAdmin: []
      }
    },
    created: function(){
      this.showAllUsers();
    },
    methods: {
      showAllUsers: async function () {
        console.log('showLog from requestToApi');
        const response = await fetch('/api/allUsers');
        this.usersAdmin = await response.json();
      }
    }
  }
</script>
<style scoped>
  .users {
    flex-wrap: wrap;
  }
  .user_card__photo > img {
    height: 100%;
    width: 100%
  }
  .user_card__photo {
    overflow: hidden;
  }
</style>
