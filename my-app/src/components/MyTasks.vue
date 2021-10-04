<template lang="html">
  <div>
    <h2>My tasks</h2>
    {{ myTasks }}
  </div>
</template>

<script>
export default {
  name:'MyTasks',
  data: function(){
    return {
      myTasks: []
    }
  },
  created: function(){
    this.getMyTasks()
  },
  methods: {
    getMyTasks: async function () {
      let userId = {id: localStorage.id};
      const response = await fetch(`/api/myTasks`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userId)
        })
      this.myTasks = await response.json();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
