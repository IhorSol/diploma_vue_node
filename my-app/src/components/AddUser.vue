<template>
  <div class="settings_add_user">
    <form class="add_user__form" action="/api/contacts" method="post" enctype="multipart/form-data">
      <h3>Додати нового користувача</h3>
      <label for="surname">Прізвище</label>
      <input type="text" name="surname" class="input">
      <label for="name">Ім'я</label>
      <input type="text" name="name" class="input">
      <label for="login">Логін</label>
      <input type="text" name="login" class="input">
      <label for="password">Пароль</label>
      <input type="password" name="password" class="input">
      <label for="email">Email</label>
      <input type="email" name="email" class="input">
      <label for="phone">Телефон</label>
      <input type="tel" name="phone" class="input">
      <label for="data_of_birth">Дата народження</label>
      <input type="date" name="data_of_birth" class="input">
      <label for="position">Посада</label>
      <input type="text" name="position" class="input">
      <label for="avatar">Фото профілю</label>
      <input type="file" name="avatar" class="photo_input">
      <input name="employee_workload" value="0" style="display: none">
      <button id="add_user__btn">Додати</button>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'AddUser',
    methods: {

    }
  }
</script>
<style>
  .settings_add_user {padding-top: 22px;}
  
</style>
