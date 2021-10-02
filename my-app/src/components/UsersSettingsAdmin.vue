<template>
  <div class="settings_users">
    <div>
      <button @click="requestToApi">OK</button>
      {{ usersAdmin }}

    </div>
    <div class="settings_user_card" v-for="user in usersAdmin" v-bind:key="user._id">
      <div class="settings_users__photo"></div>
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

  </div>
</template>
<script>
  export default {
    name: 'UsersSettingsAdmin',
    data: function() {
      return {
        usersAdmin: []
      }
    },
    methods: {
      requestToApi: async function () {
        const response = await fetch('/api/allUsers');
        this.usersAdmin = await response.json();

      }
  }
}
</script>
