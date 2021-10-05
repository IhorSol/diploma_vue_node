<template lang="html">
  <div class="asigned_tasks">
    <div class="asigned_task" v-for="item in myTasks" v-bind:key="item._id">
      <div class="asigned_task__header">
        <div class="asigned_task__complexity normal-complexity"></div>
        <div class="asigned_task__name"><h3>{{ item.title }} </h3></div>
      </div>
      <div class="asigned_task__body">
        <p class="asigned_task_text">{{ item.taskDescription }}</p>
        <div class="asigned_task__deadline"><i class="fas fa-calendar-week"></i> {{ item.deadline}}</div>
        <div class="asigned_task__asigned-by"><i class="fas fa-user"></i>{{ allUsers[item.creator-1].name }}</div>
      <div class="asigned_task__buttons">
        <!-- <button id="btn_done">Виконано</button>
        <button id="btn_more">Детальніше</button> -->
        <button id="comment_btn"><i class="fas fa-comment-dots"></i></button>
        <button class="show_btn" @click='transferDataToForm(item)'><i class="fas fa-eye"></i></button>
        <button id="done_btn"><i class="far fa-check-circle"></i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { bus } from '../entry/set_task.js';
import $ from 'jquery'

export default {
  name:'MyAsignedTasks',
  data: function(){
    return {
      myTasks: [],
      allUsers: []
    }
  },
  created: function(){
    this.getMyTasks()
    this.showAllUsers()
  },
  updated: function() {
    $(".show_btn").on('click', function() {
      $(".form_bg").addClass("flex");
      // $("#set_task_form__asign_btn").text("Bиконано");
      $(".form").addClass("read_only");
      $(".set_task_form__name").attr("disabled", true);
    })
  },
  mounted() {
    $("#set_task").on('click', function() {
      $(".form_bg").addClass("flex");
    })
    $(".set_task_form__close_btn").on('click', function(){
      $(".form_bg").removeClass("flex");
      $("#set_task_form__asign_btn").text("Призначити");
      $(".form").removeClass("read_only");
      $(".set_task_form__name").attr("disabled", false);
    })
    $(".edit_btn").on('click', function() {
      $(".form_bg").addClass("flex");
      $("#set_task_form__asign_btn").text("Змінити");
    })
    $("#show_btn").on('click', function() {
      $(".form_bg").addClass("flex");
      $("#set_task_form__asign_btn").text("Bиконано");
      $(".form").addClass("read_only");
      $(".set_task_form__name").attr("disabled", true);
    })
  },
  methods: {
    getMyTasks: async function () {
      let userId = {id: localStorage.id};
      const response = await fetch(`/api/myTasks`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userId)
        })
      this.myTasks = await response.json();
    },
    showAllUsers: async function () {
      const response = await fetch('/api/allUsers');
      this.allUsers = await response.json();
    },
    transferDataToForm: function(item) {
      item.readOnly = true;
      bus.$emit('showBtnClick', item, this.edit);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
