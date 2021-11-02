<template>
  <div id="set_form" class="form_bg">
    <div class="set_task_form">
      <p>Set task form</p>
      <form id="resForm" action="api/createTask" method="post" class="form">
        <div class="set_task_form__header">
          <h2>Нове завдання</h2>
          <input name="creator" v-bind:value='creator_id' style="display:none">
          <button class="set_task_form__close_btn" @click="closeFormBtnClick">X</button> <!-- onclick="event.preventDefault()" -->
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
          <select name="performer" id="performer" v-model='taskPerformer'>
            <option v-for="user in allUsers" v-bind:key="user._id" v-bind:value="user._id">{{user.name}}</option>
          </select>
        </div>
        <div class="set_task_form__asign">
            <div v-if="checkEmployeeWorkload > 20" class="asign_notice">Завдання такої складності перенавантажить працівника, і може бути виконане не вчасно. <p> Для виконання даного завдання Ви можете обрати іншого. Наприклад - {{ getAltertnativeUser }}</p></div>
            <button id="set_task_form__asign_btn" v-if='!edit'>Призначити</button>
            <button id="set_task_form__asign_btn" v-else type="button" @click='editTask' onclick="event.preventDefault()">Редагувати</button>
            <!-- <button id="set_task_form__asign_btn" v-if type="button" @click='showT'>Done</button> -->
        </div>
        <!-- <p>{{ checkEmployeeWorkload }}</p>
        <p>{{ getAltertnativeUser }}</p> -->
        <input name="new_employee_workload" :value="checkEmployeeWorkload" style="display: none">
        <!-- {{this.allUsers[0].employee_workload}} -->
      </form>
      <!-- <div> Div for tasks item to modify: {{ taskObj }}</div> -->
  </div>
</div>
</template>
<script>
  import { busS } from '../entry/set_task.js';
  import $ from 'jquery'

  export default {
    name: 'SetTaskForm',
    data() {
      return {
        taskId: '',
        taskTitle: '',
        taskDeadline: '',
        taskComplexity: '', // використовеється для розрах навантаження
        taskDescription: '',
        taskPerformer: '', // використовеється для розрах навантаження
        creator_id: localStorage.getItem("id"),
        edit: false,
        readOnly: false
      }
    },
    created() {
      busS.$on('editBtnClick', data => {
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
      closeFormBtnClick(e) {
        e.preventDefault();
        this.taskId = '',
        this.taskTitle = '';
        this.taskDeadline = '';
        this.taskComplexity = '';
        this.taskDescription = '';
        this.taskPerformer = '';
        this.edit = false;
      }
    },
    computed: {
      checkEmployeeWorkload() {
        if (this.taskPerformer === '') {
          return 0;
        }
        let taskPerformer = this.allUsers[this.taskPerformer-1];

        if (parseInt(this.taskComplexity) + parseInt(taskPerformer.employee_workload) > 20) {
          return parseInt(this.taskComplexity) + parseInt(this.allUsers[this.taskPerformer-1].employee_workload);
        } else {
          return parseInt(this.taskComplexity) + parseInt(this.allUsers[this.taskPerformer-1].employee_workload);
        }
      },
      getAltertnativeUser() {
        if (this.taskPerformer === '') {
          return;
        }
        let taskPerformer = this.allUsers[this.taskPerformer-1];
        let taskPerformerPosition = taskPerformer.position;

        if (parseInt(this.taskComplexity) + parseInt(taskPerformer.employee_workload) > 20) {
          let alternativeUser = this.allUsers.filter( (item) => {
            return (item.position === taskPerformerPosition && item._id != this.taskPerformer && (parseInt(item.employee_workload) <= 20 - parseInt(this.taskComplexity)));
          })
          let namesOfAltUsers = [];
          alternativeUser.forEach((item) => {
            namesOfAltUsers.push(item.name)
          });
          return namesOfAltUsers.join(', ');
          // return alternativeUser;
        } else {
          return '';
        }
      }
    }
  }
</script>
