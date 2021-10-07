<template>
  <div class="form_bg">
    <div class="set_task_form">
      <p>Set task form</p>
      <form action="api/createTask" method="post" class="form">
        <div class="set_task_form__header">
          <h2>Нове завдання</h2>
          <input name="creator" v-bind:value='creator_id' style="display:none">
          <button class="set_task_form__close_btn" type="reset">X</button>
        </div>
        <input type="text" class="set_task_form__name" placeholder="Назва задачі" name="title"  v-model='taskTitle'>
        <div class="set_task_form__details">
          <div class="set_task_form__deadline">
            <span>Термін</span>
            <input type="date" id="deadline" name="deadline"  v-model='taskDeadline'>
          </div>
          <div class="set_task_form__complication">
            <span>Складність</span>
            <select name="complication" id="complication" v-model='taskComplexity'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
        <div class="set_task_form__description">
          <p>Опис завдання</p>
          <textarea name="taskDescription" rows="8" cols="80" v-model='taskDescription'></textarea>
        </div>
        <div class="set_task_form__attach">
          <span>Вкладення</span>
          <div class="set_task_form__attachent">
            <i class="fas fa-paperclip"></i>
              <input type="file" name="attachment">

          </div>
        </div>
        <div class="set_task_form__performer">
          <span>Виконавець</span>
<<<<<<< HEAD
          <select name="performer" id="performer" v-model='taskPerformer'>
=======
          <select name="performer" id="performer" v-bind:value='taskPerformer' >
>>>>>>> dae94b4193987aa60a8d42726b49a2c6803b50f4
            <option v-for="user in allUsers" v-bind:key="user._id" v-bind:value="user._id">{{user.name}}</option>
          </select>
        </div>
        <div class="set_task_form__asign">
            <div id="asign_notice"></div>
<<<<<<< HEAD
            <button id="set_task_form__asign_btn" v-if='!edit'>Призначити</button>
            <button id="set_task_form__edit_btn" v-else type="button" @click='editTask' onclick="event.preventDefault()">Редагувати</button>
=======
            <button id="set_task_form__asign_btn" v-if='!edit' >Призначити</button>
            <button id="set_task_form__asign_btn" v-else type="button" @click='showT' >Редагувати</button>
>>>>>>> dae94b4193987aa60a8d42726b49a2c6803b50f4
            <!-- <button id="set_task_form__asign_btn" v-if type="button" @click='showT'>Done</button> -->

        </div>
      </form>
      <!-- <div> Div for tasks item to modify: {{ taskObj }}</div> -->
  </div>
</div>
</template>
<script>
  import { bus } from '../entry/set_task.js';
  import $ from 'jquery'

  export default {
    name: 'SetTaskForm',
    data() {
      return {
        taskId: '',
        taskTitle: '',
        taskDeadline: '',
        taskComplexity: '',
        taskDescription: '',
        taskPerformer: '',
        creator_id: localStorage.getItem("id"),
        edit: false,
        readOnly: false
      }
    },
    created() {
      bus.$on('editBtnClick', data => {
        this.taskId = data._id,
        this.taskTitle = data.title;
        this.taskDeadline = data.deadline;
        this.taskComplexity = data.complication;
        this.taskDescription = data.taskDescription;
        this.taskPerformer = data.performer;
        this.edit = data.edit;
      })
    },
    updated() {
      $("#set_task_form__edit_btn").on('click', function() {
        $(".form_bg").removeClass("flex");
      })
    },
    props: {
      allUsers: Array
    },
    methods: {
      editTask: async function(){
        this.edit = false;
        let taskToUpdate = { "_id": this.taskId, "creator": this.creator_id, "title": this.taskTitle, "deadline": this.taskDeadline,
         "complication": this.taskComplexity, "taskDescription": this.taskDescription, "attachment": "", "performer": this.taskPerformer}
        console.log(taskToUpdate);

        // const response =
        await fetch(`/api/updateTask`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskToUpdate)
          })

          // console.log(response);
          document.location.reload()
      },
    }
  }
</script>
