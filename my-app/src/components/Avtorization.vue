<template>
  <div class="wrapper">
    <div class="block">
      <div class="img-holder"></div>
      <h3>Авторизація</h3>
      <form class="avtorization">
        <input type="name" placeholder="Ввведіть логін" v-model="userLogin">
        <input type="password" placeholder="Веедіть пароль"><br >
        <div v-if='error' class="error">Неправильний логін або пароль</div>
        <input type="button" id = "but" value="Вхід" @click='setCookies'>

      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Avtorization',
    data() {
      return {
        userLogin: "",
        error: false
      }

    },
    methods: {
      setCookies: function() {
        localStorage.setItem("user", this.userLogin)
        console.log(localStorage.getItem("user"))
      }
    }
  }
</script>
<style>
  .error {
    margin-top: 10px;
    padding: 15px 0px;
    background: #f5d0ce;
    color: #6e2722;

  }
</style>
