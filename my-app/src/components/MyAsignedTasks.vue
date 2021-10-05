<template lang="html">
  <div class="asigned_tasks">
    <div class="asigned_task" v-for="item in myTasks" v-bind:key="item._id">
      <div class="asigned_task__header">
        <div class="asigned_task__complexity ">{{ item.complication }}</div> <!--/*******color_complexity -->
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
    this.complexityColor();
    // $(".asigned_task__complexity").addClass("good-complexity");

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
    },
    complexityColor: function() {
      var num = '';
      var arr = $(".asigned_task__complexity");
      // console.log($(".asigned_task__complexity").text()[0]);
      arr.each(function(i) {
        num = arr.text()[i];
        switch(num) {
          case '1':
            arr.eq(i).addClass("light-complexity");
            break;
          case '2':
            arr.eq(i).addClass("normal-complexity");
            break;
          case '3':
            arr.eq(i).addClass("good-complexity");
            break;
          case '4':
            arr.eq(i).addClass("medium-complexity");
            break;
          case '5':
            arr.eq(i).addClass("strong-complexity");
            break;
          case '6':
            arr.eq(i).addClass("hard-complexity");
            break;
          }
      });
    }
  }
}
</script>

<style lang="css" scoped>
  /* .asigned_task__complexity {font-size: 0px;} */
</style>
