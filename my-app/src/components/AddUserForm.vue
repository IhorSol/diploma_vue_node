<template lang="html">
  <div class="user-form">
    <form action="/api/contacts" method="post"><br>
      <!-- <input type="text" name="_id"><br> -->
      <input type="text" name="name" placeholder="Name"><br>
      <input type="text" name="position" placeholder="Position"><br>
      <input type="text" name="email" placeholder="Email"><br>
      <input type="text" name="department" placeholder="Department"><br>
      <button>Create user</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddUserForm',
  methods: {
  }
}
</script>

<style lang="css" scoped>
</style>
