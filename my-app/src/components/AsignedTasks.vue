<template>
  <div class="asigned_tasks_part">
    <h2>Призначені завдання</h2>
    <div class="asigned_tasks">
      <div class="asigned_task" v-for="item in tasksSetByMe" v-bind:key="item._id">
        <div class="asigned_task__header">
          <div class="asigned_task__complexity normal-complexity"></div>
          <div class="asigned_task__name"><h3>{{ item.title }} </h3></div>
        </div>
        <div class="asigned_task__body">
          <p class="asigned_task_text">{{ item.taskDescription }}</p>
          <div class="asigned_task__deadline"><i class="fas fa-calendar-week"></i> {{ item.deadline}}</div>
          <div class="asigned_task__asigned-by"><i class="fas fa-user"></i>{{ allUsers[item.performer-1].name}} </div>
          <div class="asigned_task__buttons">
            <button id="comment_btn"><i class="fas fa-comments"></i></button>
            <button class="edit_btn" @click='transferDataToForm(item)'><i class="fas fa-edit"></i></button>
            <button id="delete_btn"><i class="fas fa-trash-alt"></i></button>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { bus } from '../entry/set_task.js';
import $ from 'jquery'

  export default {
    name: 'AsignedTasks',
    data() {
      return {
        tasksSetByMe: [],
        edit: true
      }
    },
    props: {
      allUsers: Array
    },
    created: function() {
      this.getTasksSetByMe()
    },
    updated: function() {
      $(".edit_btn").on('click', function() {
        $(".form_bg").addClass("flex");
        // $("#set_task_form__asign_btn").text("Змінити");
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
        // $("#set_task_form__asign_btn").text("Змінити");
      })
    },
    methods: {
      // getAllTasks: async function () {
      //   const response = await fetch('/api/allTasks');
      //   this.allTasks = await response.json();
      // }
      transferDataToForm: function(item) {
        item.edit = true;
        bus.$emit('editBtnClick', item, this.edit);
      },
      getTasksSetByMe: async function () {
        let userId = {id: localStorage.id};
        const response = await fetch(`/api/tasksSetByMe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userId)
          })
        this.tasksSetByMe = await response.json();
    }
  }
}
</script>
