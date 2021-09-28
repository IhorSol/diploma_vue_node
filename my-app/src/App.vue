<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="requestToApi">Get all users</button>
    <p>{{ usersFromNode }}</p>
    <AddUserForm></AddUserForm>
    <hr><br>
    <TaskForm></TaskForm>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AddUserForm from './components/AddUserForm.vue'
import TaskForm from './components/TaskForm.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AddUserForm,
    TaskForm
  },
  data: function(){
    return {
      usersFromNode: []
    }
  },
  methods: {
    requestToApi: async function () {
      const response = await fetch('/api/allUsers');
      this.usersFromNode = await response.json();
    },
    show: function(){
      alert('Hello')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
