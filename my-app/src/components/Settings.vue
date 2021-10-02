<template>
  <div class="settings">
    <AddUser/>
    <UsersSettingsAdmin/>
  </div>
</template>
<script>
  import AddUser from './AddUser'
  import UsersSettingsAdmin from './UsersSettingsAdmin'

  export default {
    name: 'Settings',
    components: { AddUser, UsersSettingsAdmin },
  }
</script>
