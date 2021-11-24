<template>
  <div id="set_form" class="form_bg">
    <div class="set_task_form">
      <!-- <p>Set task form</p> -->
      <form id="resForm" action="api/createTask" method="post" class="form">
        <div class="set_task_form__header">
          <h2>Нове завдання</h2>
          <input name="creator" v-bind:value="taskObj.creator_id" style="display:none">
          <button class="set_task_form__close_btn" @click="closeFormBtnClick">X</button> <!-- onclick="event.preventDefault()" -->
        </div>
        <input type="text" class="set_task_form__name" placeholder="Назва задачі" name="title"  v-model='taskObj.taskTitle'>
        <div class="set_task_form__details">
          <div class="set_task_form__deadline">
            <span>Термін</span>
            <input type="date" id="deadline" name="deadline"  v-model='taskObj.taskDeadline'>
          </div>
          <div class="set_task_form__complication">
            <span>Складність</span>
            <select name="complication" id="complication" v-model='taskObj.taskComplexity'>
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
          <textarea name="taskDescription" rows="8" cols="80" v-model='taskObj.taskDescription'></textarea>
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
          <select name="performer" id="performer" v-model='taskObj.taskPerformer'>
            <option v-for="user in allUsers" v-bind:key="user._id" v-bind:value="user._id">{{user.name}}</option>
          </select>
        </div>
        <div class="set_task_form__asign">
            <div v-if="checkEmployeeWorkload() > 20" class="asign_notice">Завдання такої складності перенавантажить працівника, і може бути виконане не вчасно. <p> Для виконання даного завдання Ви можете обрати іншого. Наприклад - {{ getAltertnativeUser }}</p></div>
            <button id="set_task_form__asign_btn" v-if='!edit'>Призначити</button>
            <button id="set_task_form__asign_btn" v-else type="button" @click='editTask' onclick="event.preventDefault()">Редагувати</button>
        </div>

        <input name="new_employee_workload" :value="checkEmployeeWorkload" style="display: none">
      </form>

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
        taskObj: {
          taskId: '',
          taskTitle: '',
          taskDeadline: '',
          taskComplexity: '', // використовеється для розрах навантаження
          taskDescription: '',
          taskPerformer: '', // використовеється для розрах навантаження
          creator_id: localStorage.getItem("id"),
        },
        edit: false,
        readOnly: false,
        taskComplexityBeforeEdit: '', // складність задачі перед едітом
        taskPerformerBeforeEdit: '', // виконавець задачі перед едітом
        employeeWorkloadBeforeEdit: '', // завантаженість виконавця задачі перед едітом
        currentEmployeeWorkload: '', // можна передавати в базу для оновлення навантаження на вибраного виконавця при едіті задачі
      }
    },
    created() {
      busS.$on('editBtnClick', data => {
        this.taskObj.taskId = data._id,
        this.taskObj.taskTitle = data.title;
        this.taskObj.taskDeadline = data.deadline;
        this.taskObj.taskComplexity = this.taskComplexityBeforeEdit = data.complication;
        this.taskObj.taskDescription = data.taskDescription;
        this.taskObj.taskPerformer = this.taskPerformerBeforeEdit = data.performer;
        this.edit = data.edit;
        this.employeeWorkloadBeforeEdit = parseInt(this.allUsers[this.taskObj.taskPerformer-1].employee_workload) - parseInt(this.taskComplexityBeforeEdit)
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
        let infoToUpdate = this.taskObj;
        let userObj = {'id': parseInt(this.taskObj.taskPerformer), 'new_employee_workload': this.currentEmployeeWorkload};
        infoToUpdate.user = userObj; // add user obj into taskObj
        // userBeforeUpdateObj для зменшення завантаженості початкового відповідального за задачу до едіту
        // якщо відповідальний був змінений
        if (this.taskObj.taskPerformer != this.taskPerformerBeforeEdit) {
          let userBeforeUpdateObj = {'id': parseInt(this.taskPerformerBeforeEdit), 'new_employee_workload': this.employeeWorkloadBeforeEdit};
          infoToUpdate.userBeforeEdit = userBeforeUpdateObj; // add user userBeforeUpdateObj into taskObj
        }

        await fetch(`/api/updateTask`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(infoToUpdate) // infoToUpdate - taskObj + userObj
          })

          document.location.reload()
      },
      closeFormBtnClick(e) {
        e.preventDefault();
        this.taskObj.taskId = '',
        this.taskObj.taskTitle = '';
        this.taskObj.taskDeadline = '';
        this.taskObj.taskComplexity = '';
        this.taskObj.taskDescription = '';
        this.taskObj.taskPerformer = '';
        this.edit = false;
      },
      checkEmployeeWorkload() {
        if (this.edit == false) {
          if (this.taskObj.taskPerformer === '') {
            return 0;
          } else {
            return parseInt(this.taskObj.taskComplexity) + parseInt(this.allUsers[this.taskObj.taskPerformer-1].employee_workload);
          }
        } else {
          let taskComplexityBeforeEdit = parseInt(this.taskComplexityBeforeEdit);
          let currTaskComplexity = parseInt(this.taskObj.taskComplexity);
          let currentEmployeeWorkload = parseInt(this.allUsers[this.taskObj.taskPerformer-1].employee_workload);

          if (this.taskObj.taskPerformer === this.taskPerformerBeforeEdit) {

            if (taskComplexityBeforeEdit === currTaskComplexity) {
              console.log("taskComplexityBeforeEdit - " +  taskComplexityBeforeEdit);
              return 0;
            } else if (taskComplexityBeforeEdit > currTaskComplexity) {
              console.log("newEmployeeWorkload - " + (currentEmployeeWorkload - (taskComplexityBeforeEdit - currTaskComplexity)));
              console.log(this.currentEmployeeWorkload);
              return this.currentEmployeeWorkload = currentEmployeeWorkload - (taskComplexityBeforeEdit - currTaskComplexity);
            } else {
              console.log("newEmployeeWorkload - " + (currentEmployeeWorkload + (currTaskComplexity - taskComplexityBeforeEdit)));
              return this.currentEmployeeWorkload = currentEmployeeWorkload + (currTaskComplexity - taskComplexityBeforeEdit)
            }

          } else {
            console.log("newEmployeeWorkload - " + (currentEmployeeWorkload + currTaskComplexity));
            console.log("currentEmployeeWorkload - " + this.currentEmployeeWorkload);
            return this.currentEmployeeWorkload = currentEmployeeWorkload = currentEmployeeWorkload + currTaskComplexity
          }

        }
      }
    },
    computed: {
      getAltertnativeUser() {
        if (this.taskObj.taskPerformer === '') {
          return;
        }
        let taskPerformer = this.allUsers[this.taskObj.taskPerformer-1];
        let taskPerformerPosition = taskPerformer.position;

        if (parseInt(this.taskObj.taskComplexity) + parseInt(taskPerformer.employee_workload) > 20) {
          let alternativeUser = this.allUsers.filter( (item) => {
            return (item.position === taskPerformerPosition && item._id != this.taskObj.taskPerformer && (parseInt(item.employee_workload) <= 20 - parseInt(this.taskObj.taskComplexity)));
          })
          let namesOfAltUsers = [];
          alternativeUser.forEach((item) => {
            namesOfAltUsers.push(item.name)
          });
          return namesOfAltUsers.join(', ');
        } else {
          return '';
        }
      }
    }
  }
</script>
