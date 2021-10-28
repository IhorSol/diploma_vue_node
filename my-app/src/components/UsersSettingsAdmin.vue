<template>
  <div class="settings_users">
    <div class="settings_user_card" v-for="user in usersAdmin" v-bind:key="user._id">
      <div class="settings_users__photo">
        <img :src="require(`../assets/images/${user.image}`)" height="100px">
      </div>
      <div class="settings_users__info">
        <div class="settings_user_name">
          {{ user.name }} {{ user.surname}}
        </div>
        <div class="settings_user_login">
          {{ user.login }}
        </div>
        <div class="settings_user_password">
          {{ user.password }}
        </div>
        <div class="settings_user_delete_user"><button id="del_user">Delete user <i class="far fa-trash-alt"></i></button></div>
      </div>
    </div>

    <!-- <img src="../../static/naruto.png"> -->
  </div>
</template>
<script>

  export default {
    name: 'UsersSettingsAdmin',
    data: function() {
      return {
        usersAdmin: [],
        image: '../assets/pictures/naruto.png' // require('../assets/pictures/naruto.png')
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
      },
      itemImage(user) {
        let ingPath = user.image;
        let resp = 'require(`../../public/' + ingPath + '`)'
        return resp
      }
    }
    // computed: {
    //    itemImage(user) {
    //      let ingPath = user.image;
    //      let resp = 'require(`' + ingPath + '`)'
    //      return resp
    //    }
    // }
  }
</script>
