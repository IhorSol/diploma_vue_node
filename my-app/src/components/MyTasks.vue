<template lang="html">
  <div class="my_tasks_part">
    <SetTaskForm v-bind:allUsers="allUsersParent"/>
    <MyAsignedTasks></MyAsignedTasks>
  </div>
</template>

<script>
import SetTaskForm from './SetTaskForm.vue';
import MyAsignedTasks from './MyAsignedTasks.vue';


export default {
  name:'MyTasks',
  components: { SetTaskForm, MyAsignedTasks }

}
</script>

<style lang="css" scoped>
</style>
