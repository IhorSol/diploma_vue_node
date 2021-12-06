<template>
  <header>
    <div class="logo"><a href="index.html">Task Manager / {{ userPosition }}</a></div>
    <div class="full-data">
      <div class="time"></div>
      <div class="day"></div>
      <div class="data">26.11.2021</div>
    </div>
    <div class="user-info">
      <div class="user_photo">
        <img :src="require(`../assets/images/${this.userPhoto}`)">
      </div>
      <div class="user_name">
        {{ userName }}
      </div>
      <button @click='cleanCookies'><a href='avtoriz.html'>Вийти</a></button>
    </div>
  </header>
</template>

<script>

  export default {
    name: 'Header',
    data() {
      return {
        userName: localStorage.getItem("name"),
        userPosition: localStorage.getItem("position"),
        userPhoto: localStorage.getItem("photo"),
      }
    },
    methods: {
      cleanCookies: function() {
        localStorage.clear()
      }
    },
    mounted() {
    function clock(){
      let date = new Date();
      let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
      minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
      // seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
      let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
      let days = date.getDay();
      document.querySelector(".time").innerHTML = hours + ':' + minutes;
      document.querySelector(".day").innerHTML = dayOfWeek[days];
    }
    setInterval(clock, 1000);
    clock();

    function date_on_site(){
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear()
      let current_data = day + "." + (month + 1) + "." + year;
      document.querySelector(".data").innerHTML = current_data;

    }
    date_on_site();
  },
}
</script>

<style>
</style>
