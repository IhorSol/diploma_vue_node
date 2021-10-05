<template lang="html">
  <div class="my_tasks_part">
    <SetTaskForm v-bind:allUsers="allUsersParent"/>
    <MyAsignedTasks></MyAsignedTasks>
  </div>
</template>

<script>
import SetTaskForm from './SetTaskForm.vue';
import MyAsignedTasks from './MyAsignedTasks.vue';
import $ from 'jquery'


export default {
  name:'MyTasks',
  components: { SetTaskForm, MyAsignedTasks },
  mounted() {
    $(".hide_menu").on('click', function() {
      $(".aside-menu").toggleClass("show_more");
    })
  }

}
</script>

<style lang="css" scoped>
</style>
