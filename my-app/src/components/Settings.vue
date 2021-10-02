<template>
  <div class="settings">
    <AddUser/>
    <UsersSettingsAdmin/>
    {{ setLocalStoreItem() }}
    <div class="">
      <p>user name = {{ userName }}</p>
      <p>user _id = {{ userId }}</p>
    </div>
  </div>
</template>
<script>
  import AddUser from './AddUser'
  import UsersSettingsAdmin from './UsersSettingsAdmin'

  export default {
    name: 'Settings',
    data: function () {
      return {
        userName: localStorage.name,
        userId: parseInt(localStorage.id)
      }
    },
    components: { AddUser, UsersSettingsAdmin },
    methods: {
      setLocalStoreItem: function() {
        localStorage.name = 'ihor';
        localStorage.id = '29';
      }
    }
  }
</script>
