<template lang="html">
  <div class="form_bg_comments"> <!-- змінив назву класу. Додав _comments -->
    <div class="set_task_form">
      <p>Comments form</p>
      <form action="api/createTask" method="post" class="form">
        <div class="set_task_form__header">
          <h2>Поточне завдання</h2>
          <!-- <input name="creator" v-bind:value='creator_id' style="display:none"> -->
          <!-- <button class="set_task_form__close_btn comment_form_btn_close" onclick="event.preventDefault()">X</button> -->
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
        <!-- <div class="set_task_form__performer">
          <span>Виконавець</span>
          <select name="performer" id="performer" v-model='taskPerformer'>
            <option v-for="user in allUsers" v-bind:key="user._id" v-bind:value="user._id">{{user.name}}</option>
          </select>
        </div> -->
        <div class="set_task_form__asign">
            <div id="asign_notice"></div>
            <button id="set_task_form__asign_btn" @click='acceptTask' onclick="event.preventDefault()">Прийняти як виконану</button>
        </div>
      </form>

      <!-- comments form started -->
      <textarea title="comment input" v-model="taskPerformerComment"> </textarea><br>
      <button type="button" @click="addComment()">Додати коментар</button> <br><br>
      <div class="comments-to-task">
        <div class="comment" v-for="(comment, index) in taskComments" :key="index">
          <p>Name: {{ comment.userName }}</p>
          <p>Comment text: {{ comment.comment }}</p> <br>
        </div>
      </div>
      <!-- comments form ended -->

  </div>
</div>
</template>

<script>
import { busS } from '../entry/set_task.js';

import $ from 'jquery'

export default {
  name: 'SetTasksCommentsForm',
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
      taskComments: [], // added
      readOnly: false,
      taskPerformerComment: '',
      taskPerformerName: ''
    }
  },
  created() {
    busS.$on('commentBtnClick', data => {
      this.taskTitle = data.title;
      this.taskDeadline = data.deadline;
      this.taskComplexity = data.complication;
      this.taskDescription = data.taskDescription;
      this.taskPerformer = data.performer;
      this.readOnly = data.readOnly;
      this.taskId = data._id;
      this.taskComments = data.comments
    })
  },
  updated() {
    $("#set_task_form__edit_btn").on('click', function() {
      $(".form_bg").removeClass("flex");
    })
  },
  methods: {
    acceptTask: async function(){
      console.log('complete task. Task id - ' + this.taskId);
      let taskToUpdate = { "_id": this.taskId}

      await fetch(`/api/acceptTask`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(taskToUpdate)
        })
      document.location.reload()
    },
    addComment: async function () {
      console.log(this.taskPerformerComment);
      this.taskComments.push(
        {userName: localStorage.name,
         comment: this.taskPerformerComment}
      );
      this.taskPerformerComment = '';

      let commentsToUpdate = { "_id": this.taskId, comments: this.taskComments};

      await fetch(`/api/addComment`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(commentsToUpdate)
        })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
