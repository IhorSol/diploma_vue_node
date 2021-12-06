<template>
  <div class="settings_users">
    <div class="settings_user_card" v-for="user in usersAdmin" v-bind:key="user._id">
      <div class="settings_users__photo">
        <img :src="require(`../assets/images/${user.image}`)">
      </div>
      <div class="settings_users__info">
        <div class="settings_user_name">
          {{ user.name }} {{ user.surname}}
        </div>
        <div class="settings_user_login">
          Login: {{ user.login }}
        </div>
        <div class="settings_user_password">
          Password: {{ user.password }}
        </div>
        <div class="settings_user_delete_user" @click="deleteUser(`${user._id}`)"><button id="del_user">Delete user <i class="far fa-trash-alt"></i></button></div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'UsersSettingsAdmin',
    data: function() {
      return {
        usersAdmin: [],
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
      deleteUser: async function(userId){
        console.log('deleteUser func started. User id - ' + userId);
        let userIdtoDelete = {id: parseInt(userId)};
        await fetch(`/api/deleteUser`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userIdtoDelete)
          })
          document.location.reload()
      },
    }
  }
</script>

<style scoped>
  .settings_users__photo > img {
    height: 100%;
    width: 100%
  }
  .settings_users__photo {
    overflow: hidden;
  }
</style>
