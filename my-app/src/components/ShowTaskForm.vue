<template>
  <div id="show_form" class="form_bg"> <!-- changed class name from form_bg -->
    <div class="set_task_form">
      <!-- <p>Show tast form</p> -->
      <form action="api/createTask" method="post" class="form">
        <div class="set_task_form__header">
          <h2>Поточне завдання</h2>
          <!-- <input name="creator" v-bind:value='creator_id' style="display:none"> -->
          <button class="show_task_form__close_btn comments_form_btn_close" onclick="event.preventDefault()">X</button>
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
          <span>Прикріпити</span>
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
            <div id="asign_notice"></div>
            <button id="set_task_form__asign_btn" @click='completeTask' onclick="event.preventDefault()">Виконано</button>
        </div>
      </form>

  </div>
  <MyTasksCommentsForm :taskComments="taskComments" :taskId="taskId"/>
</div>
</template>
<script>
  import MyTasksCommentsForm from './TaskCommentsForm.vue';
  import $ from 'jquery'

  export default {
    name: 'ShowTaskForm',
    data() {
      return {
        taskId: '',
        taskTitle: '',
        taskDeadline: '',
        taskComplexity: '',
        taskDescription: '',
        taskPerformer: '',
        // creator_id: localStorage.getItem("id"),
        edit: false,
        taskComments: [],
        readOnly: true,
        taskPerformerComment: '',
        taskPerformerName: '',
      }
    },
    components: {
      MyTasksCommentsForm
    },
    updated() {
      $("#set_task_form__edit_btn").on('click', function() {
        $(".form_bg").removeClass("flex");
      })
    },
    props: {
      allUsers: Array,
      info: Array, // for test $emit event from parent component
    },
    watch: {
      info: function() {
        this.taskId = this.info._id,
        this.taskTitle = this.info.title,
        this.taskDeadline = this.info.deadline,
        this.taskComplexity = this.info.complication,
        this.taskDescription = this.info.taskDescription,
        this.taskPerformer = this.info.performer,
        this.taskComments = this.info.comments
      }
    },
    methods: {
      completeTask: async function(){
        console.log('complete task. Task id - ' + this.taskId);
        let taskToUpdate = { "_id": this.taskId}

        await fetch(`/api/finishTask`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskToUpdate)
          })
        document.location.reload()
      }
    }
  }
</script>
<style>
.comments_form_btn_close {
  background: #6a9ce6;
  padding: 3px 5px;
  cursor: pointer;
  border: 0px;
  border-radius: 5px;
  color: #fff;
}
.comments_form_btn_close:hover {
  transition: all 0.2s ease;
  background: #4582de;
}
</style>
