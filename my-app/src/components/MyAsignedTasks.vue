<template lang="html">
    <div class="asigned_tasks">

      <!-- <h2>Counter. Tasks not viewed - {{ countNotViewedTasks.length }}</h2>  показує к-сть непродивлених задач -->
      <div class="asigned_task" :id="item._id" v-for="item in myTasks" v-bind:key="item._id" v-bind:class="{'new_task': !item.isLooked}">
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
          <button class="comment_btn" @click='transferDataToShowForm(item)'><i class="fas fa-comment-dots"></i></button>
          <button class="show_btn" @click='transferDataToShowForm(item); '><i class="fas fa-eye"></i></button>
          <button id="done_btn" @click='completeTask(item._id)'><i class="far fa-check-circle"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { bus } from '../entry/my_tasks.js';
import $ from 'jquery'

export default {
  name:'MyAsignedTasks',
  data: function(){
    return {
      myTasks: [],
      allUsers: [],
    }
  },
  created: function(){
    this.getMyTasks()
    this.showAllUsers()

 },
  updated: function() {
    $(".show_btn").on('click', function() {
      $("#show_form").addClass("flex");
      $(".form").addClass("read_only");
      $(".set_task_form__name").attr("disabled", true);
    })
    $(".comment_btn").on('click', function() {
      $("#show_form").addClass("flex");
      $(".form").addClass("read_only");
      $(".set_task_form__name").attr("disabled", true);
    })
    this.complexityColor();
    if (this.countNotViewedTasks.length > 0) {
      document.getElementsByClassName("notification_my_tasks")[0].innerHTML = this.countNotViewedTasks.length;
    } else {
      document.getElementsByClassName("notification_my_tasks")[0].innerHTML = "";
    }
  },
  mounted() {
    $(".show_task_form__close_btn").on('click', function(){
      $("#show_form").removeClass("flex");
      $(".form").removeClass("read_only");
      $(".set_task_form__name").attr("disabled", false);
    })
    $("#show_btn").on('click', function() {
      $("#show_form").addClass("flex");
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
    transferDataToShowForm: async function(item) {
      item.readOnly = true;
      this.$emit('commentBtnClick', item);
  // change isLooked to TRUE
      console.log('mark task as looked. Task id - ' + item._id);
      let taskToUpdate = { "_id": item._id}
      document.getElementById(item._id).classList.remove("new_task");

      await fetch(`/api/markAsLooked`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(taskToUpdate)
        })


    },


    // transferDataToCommentForm: function(item) {
    //   item.readOnly = true;
    //   bus.$emit('commentBtnClick', item, this.edit);
    // },
    completeTask: async function(itemId){
      console.log('complete task. Task id - ' + itemId);
      let taskToUpdate = { "_id": itemId}

      await fetch(`/api/finishTask`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(taskToUpdate)
        })
      document.location.reload()
    },
    complexityColor: function() {
      var num = '';
      var arr = $(".asigned_task__complexity");
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
  },
  computed: {
    countNotViewedTasks: function() { // показує к-сть непродивлених задач
      return this.myTasks.filter(function(task){
        return task.isLooked === false
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
