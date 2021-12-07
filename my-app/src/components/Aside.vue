<template>
  <aside class="aside-menu">
    <div id="aside_menu_fixed">
      <div class="set-task"><a href="set_task.html">
        <div class="icon_block">
          <i class="fas fa-clipboard-list"></i>
          <div class="notification_completed_tasks"></div>
        </div>
        <p class="menu_item">Призначити завдання</p>
        </a>
      </div>
      <div class="my-tasks"><a href="my_tasks.html">
        <div class="icon_block">
          <i class="fas fa-tasks"></i>
          <div class="notification_my_tasks"></div>
        </div>
        <p class="menu_item">Мої завдання</p>
        </a>
      </div>
      <div class="colleages"><a href="users.html">
        <div class="icon_block">
          <i class="fas fa-user-friends"></i>
          <div class="notification_users"></div>
        </div>
        <p class="menu_item">Працівники</p>
        </a>
      </div>
      <div class="news"><a href="news.html">
        <div class="icon_block">
          <i class="fas fa-newspaper"></i>
          <div class="notification_news"></div>
        </div>
        <p class="menu_item">Новини</p>
        </a>
      </div>
      <div class="add_user" v-show="isAdmin != 'undefined' "><a href="settings.html">
        <i class="fas fa-user-plus"></i>
        <p class="menu_item">Додати користувача</p>
        </a>
      </div>
      <div class="hide_menu">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  </aside>
</template>
<script>
import $ from 'jquery'

  export default {
    name: 'Aside',
    data() {
      return {
        isAdmin: localStorage.getItem("isAdmin")
      }
    },
    mounted() {
      $(".hide_menu").on('click', function() {
        $(".aside-menu").toggleClass("show_more");
      })
    }
  }

</script>
