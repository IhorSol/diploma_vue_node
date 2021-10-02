<template>
  <div class="form_bg">
    <div class="set_task_form">
      <form action="api/createTask" method="post">
        <div class="set_task_form__header">
          <h2>Нове завдання</h2>
          <input name="creator" v-bind:value='creator_id' style="display:none">
          <button class="set_task_form__close_btn" type="reset">X</button>
        </div>
        <input type="text" class="set_task_form__name" placeholder="Назва задачі" name="title"  v-bind:value='taskTitle'>
        <div class="set_task_form__details">
          <div class="set_task_form__deadline">
            <span>Термін</span>
            <input type="date" id="deadline" name="deadline"  v-bind:value='taskDeadline'>
          </div>
          <div class="set_task_form__complication">
            <span>Складність</span>
            <select name="complication" id="complication" v-bind:value='taskComplexity'>
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
          <textarea name="taskDescription" rows="8" cols="80"   v-bind:value='taskDescription'></textarea>
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
          <select name="performer" id="performer"  v-bind:value='taskPerformer'> <!--v-for users in users -->
            <option value="1">Ліля</option>
            <option value="2">Ігорьок</option>
            <option value="3">Мама</option>
            <option value="4">Папа</option>
            <option value="5">Джеська</option>
            <option value="6">Джун</option>
            <option value="7">Данка</option>
          </select>
        </div>
        <div class="set_task_form__asign">
            <div id="asign_notice"></div>
            <button id="set_task_form__asign_btn" >Призначити</button>
        </div>
      </form>
  </div>
</div>
</template>
<script>
  export default {
    name: 'SetTaskForm',
    data() {
      return {
        taskTitle: '',
        taskDeadline: '',
        taskComplexity: '',
        taskDescription: '',
        taskPerformer: '',
        creator_id: localStorage.getItem("id")
      }
    }
  }
</script>
