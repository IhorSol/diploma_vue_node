<template>
  <aside class="aside-menu">
    <div id="aside_menu_fixed">
      <div class="set-task"><a href="set_task.html">
        <i class="fas fa-clipboard-list"></i>
        <p class="menu_item">Призначити завдання</p>
        </a>
      </div>
      <div class="my-tasks"><a href="my_tasks.html">
        <i class="fas fa-tasks"></i>
        <p class="menu_item">Мої завдання</p>
        </a>
      </div>
      <div class="colleages"><a href="#">
        <i class="fas fa-user-friends"></i>
        <p class="menu_item">Працівники</p>
        </a>
      </div>
      <div class="news"><a href="#">
        <i class="fas fa-newspaper"></i>
        <p class="menu_item">Новини</p>
        </a>
      </div>
      <div class="add_user"><a href="settings.html">
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
    mounted() {
      $(".hide_menu").on('click', function() {
        $(".aside-menu").toggleClass("show_more");
      })
    }
  }

</script>
