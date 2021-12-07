<template>
  <div class="asigned_tasks_part">
    <h2>Призначені завдання</h2>
    <!-- <h2>Finished task - {{ finihsedTaskCounter }} </h2> finished task counter -->
    <div class="asigned_tasks">

      <div class="asigned_task" v-for="item in tasksSetByMe" v-bind:key="item._id" v-bind:class="{'finished': item.status == 'finished'}">
        <div class="asigned_task__header">

          <p>Task status - {{ item.status }}</p>  <!-- task status for tests -->

          <div class="asigned_task__complexity">{{ item.complication }}</div>
          <div class="asigned_task__name"><h3>{{ item.title }} </h3></div>
        </div>
        <div class="asigned_task__body">
          <p class="asigned_task_text">{{ item.taskDescription }}</p>
          <div class="asigned_task__deadline"><i class="fas fa-calendar-week"></i> {{ item.deadline}}</div>
          <div class="asigned_task__asigned-by"><i class="fas fa-user"></i>{{ allUsers[item.performer-1].name}} </div>
          <div class="asigned_task__buttons">
            <button class="comment_btn" @click='transferDataToShowForm(item)'><i class="fas fa-comments"></i></button>
            <button class="edit_btn" @click='transferDataToForm(item)'><i class="fas fa-edit"></i></button>
            <button id="delete_btn" @click='deleteTask(item._id)'><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>

      </div>

    </div>

    <ShowTaskForm />
  </div>
</template>
<script>
// import ShowTaskForm from './ShowTaskForm.vue';
import { busS } from '../entry/set_task.js';
import $ from 'jquery'

  export default {
    name: 'AsignedTasks',
    data() {
      return {
        tasksSetByMe: [],
        edit: true,
        counter_completed: ''
        // finihsedNotAccepted: finihsedTaskCounter()
      }
    },
    components: {
      // ShowTaskForm
    },
    props: {
      allUsers: Array
    },
    created: function() {
      this.getTasksSetByMe()
    },
    updated: function() {
      $(".edit_btn").on('click', function() {
        $("#set_form").addClass("flex");
      })
      $(".comment_btn").on('click', function() {
        $("#show_form").addClass("flex");
        $(".form").addClass("read_only");
      })
      this.complexityColor();
      console.log(this.finihsedTaskCounter);
      this.complexityColor();
      if (parseInt(this.finihsedTaskCounter) > 0) {
        document.getElementsByClassName("notification_completed_tasks")[0].innerHTML = this.finihsedTaskCounter;
      } else {
        document.getElementsByClassName("notification_completed_tasks")[0].innerHTML = "";
      }
    },
    mounted() {
      $("#set_task").on('click', function() {
        $("#set_form").addClass("flex");
      })
      $(".set_task_form__close_btn").on('click', function(){
        $("#set_form").removeClass("flex");
        $(".form").removeClass("read_only");
        $(".set_task_form__name").attr("disabled", false);
      })
      $(".edit_btn").on('click', function() {
        $("#set_form").addClass("flex");
        // $("#set_task_form__asign_btn").text("Змінити");
      })
      $(".show_task_form__close_btn").on('click', function(){
        $("#show_form").removeClass("flex");
        $(".form").removeClass("read_only");
        $(".set_task_form__name").attr("disabled", false);
      })

    },
    computed: {
      finihsedTaskCounter: function(){
        let counter = 0;
        this.tasksSetByMe.forEach((item) => {
          if (item.status === 'finished') {
            counter ++
          }
        });
        return counter
      }
    },
    methods: {
      transferDataToForm: function(item) {
        item.edit = true;
        busS.$emit('editBtnClick', item, this.edit);
      },
      transferDataToShowForm: function(item) {
        item.readOnly = true;
        this.$emit('commentBtnClick', item);
      },
      getTasksSetByMe: async function () { // calls automatically hool crated
        let userId = {id: localStorage.id};
        const response = await fetch(`/api/tasksSetByMe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userId)
          })
        this.tasksSetByMe = await response.json();
      },
      deleteTask: async function(itemId){
        console.log('deleteTask func started. Task id - ' + itemId);
        let taskId = {id: itemId};
        await fetch(`/api/deleteTask`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskId)
          })
          document.location.reload()
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
      },
  }
}
</script>
<style>
</style>
