<template>
  <header>
    <div class="logo"><a href="index.html">Task Manager / {{ userPosition }}</a></div>
    <div class="full-data">
      <div class="time"></div>
      <div class="day"></div>
      <div class="data">dd.mm.yy</div>
    </div>
    <div class="user-info">
      <div class="user_photo"></div>
      <div class="user_name">
        <button>{{ userName }}</button>
        <button @click='cleanCookies'><a href='avtoriz.html'>Вийти</a></button>
      </div>
    </div>
  </header>
</template>
<script>
// import '../js/main.js'

  export default {
    name: 'Header',
    data() {
      return {
        userName: localStorage.getItem("user"),
        userPosition: 'developer'
      }
    },
    methods: {
      cleanCookies: function() {
        localStorage.clear()
      }
    }
  }
</script>
