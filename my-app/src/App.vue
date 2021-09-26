<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="requestToApi">RequestToApi</button>
    <p>{{ usersFromNode }}</p>
    <AddUserForm></AddUserForm>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AddUserForm from './components/AddUserForm.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AddUserForm
  },
  data: function(){
    return {
      usersFromNode: []
    }
  },
  methods: {
    requestToApi: async function () {
      const response = await fetch('/api/users');
      // return await response.json();
      this.usersFromNode.push(await response.json());
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
