<template lang="html">
  <div class="task-update">
    <h2>Block to update task</h2>
    <div class="task" @dblclick="updateTask(task)" v-for="task in tasks" v-bind:key="task._id">
      {{ task._id }}: {{ task.title }} - {{ task.taskDescription }} <br>
      <form>
        Title - <input id="task-title" :value="task.title"><br>
        taskDescription - <input id="task-description" :value="task.taskDescription"><br>
      </form>
      <button @click="updateTask(task)">Update task</button> <br><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskUpdate',
  props: {
    tasks: Array
  },
  methods: {
    updateTask: async function(task) {
      let des = document.getElementById('task-description').value;
      console.log('taskDescription from input - ' + des);
      console.log('taskDescription new - ' + (task.taskDescription = des));
      console.log('Task info for update - ' + task.title + ' ' + task.taskDescription);

      const response = await fetch(`/api/updateTask`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(task)
        })
        return await response.json();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
