<template>
  <div class="wrapper">
    <div class="block">
      <div class="img-holder"></div>
      <h3>Авторизація</h3>
      <form class="avtorization">
        <input type="name" placeholder="Ввведіть логін" v-model="userLogin">
        <input type="password" placeholder="Веедіть пароль" v-model="userPassword"><br >
        <div v-if='error' class="error">Неправильний логін або пароль</div>
        <input type="button" id = "but" value="Вхід" @click='checkUser'>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Avtorization',
    data() {
      return {
        userData: '',
        error: false,
        userLogin: '',
        userPassword: '',
      }

    },
    methods: {
      checkUser: async function () {
        let userInfo = {login: this.userLogin, password: this.userPassword}
        const response = await fetch(`/api/checkUser`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
          })
          let resp = await response.json();
          console.log(resp);
          if (resp.length != 0) {
            this.userData = resp;
            window.location.href = "/set_task.html";

            localStorage.login = this.userData[0].login;
            localStorage.id = this.userData[0]._id;
            localStorage.name = this.userData[0].name;
            localStorage.surname = this.userData[0].surname;
            localStorage.position = this.userData[0].position;
            localStorage.isAdmin = this.userData[0].isAdmin;
            localStorage.photo = this.userData[0].image;
          } else {
            this.error = true
          }
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
