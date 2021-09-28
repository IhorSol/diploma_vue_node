<template lang="html">
  <div class="task-form">
    <form action="api/createTask" method="post">
      <input type="text" name="title" placeholder="title"><br>
      <input type="text" name="taskDescription" placeholder="taskDescription"><br>
      <label for="date">Dedline</label>
      <input type="date" name="date" placeholder="dedline"><br>
      <input type="text" name="responsibleUserId" placeholder="responsibleUserId"><br>
      <input type="number" name="complexity" placeholder="complexity"><br>
      <label for="isImportant">High priority</label>
      <input type="checkbox" name="isImportant" placeholder="isImportant"><br>
      <button>Create task</button>
    </form>
    <hr><br>
    <button @click="getAllTasks">Get all tasks</button>
    <div>All tasks - {{ allTasks }}</div>
    <p v-for="item in allTasks" v-bind:key="item._id">{{ item.title }} - {{ item.taskDescription }}</p> <hr>

    <div class="task-update">
      <TaskUpdate :tasks="allTasks"></TaskUpdate>
    </div>
  </div>
</template>

<script>
import TaskUpdate from './TaskUpdate.vue'

export default {
  name: 'TaskForm',
  components: {
    TaskUpdate
  },
  data: function () {
    return {
      allTasks: [],
    }
  },
  methods: {
    getAllTasks: async function () {
      const response = await fetch('/api/allTasks');
      this.allTasks = await response.json(); //this.allTasks.push(await response.json());
    }
  }
}
</script>

<style lang="css" scoped>
</style>
