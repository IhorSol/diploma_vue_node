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
<<<<<<< HEAD
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
=======
import $ from 'jquery'

  export default {
    name: 'Header',
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

    // ;(function($, undefined) {
    $(".hide_menu").on('click', function() {
      $(".aside-menu").toggleClass("show_more");
    });
    $("#set_task").on('click', function() {
      $(".form_bg").addClass("flex");
    })
    $(".set_task_form__close_btn").on('click', function(){
      $(".form_bg").removeClass("flex");
      $("#set_task_form__asign_btn").text("Призначити");
      $(".form").removeClass("read_only");
      $(".set_task_form__name").attr("disabled", false);
    })
    $("#edit_btn").on('click', function() {
      $(".form_bg").addClass("flex");
      $("#set_task_form__asign_btn").text("Змінити");
    })
    $("#show_btn").on('click', function() {
      $(".form_bg").addClass("flex");
      $("#set_task_form__asign_btn").text("Bиконано");
      $(".form").addClass("read_only");
      $(".set_task_form__name").attr("disabled", true);
    })
    // })(jQuery);
  }
>>>>>>> cebfc3c00260a16cd65038be479deab909c2c9f5
  }
</script>
