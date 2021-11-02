<template lang="html">
  <div class="my_tasks_part">
    <ShowTaskForm/>
    <!-- <MyTasksCommentsForm/> -->
    <MyAsignedTasks></MyAsignedTasks>
  </div>
</template>

<script>
import ShowTaskForm from './ShowTaskForm.vue';
import MyAsignedTasks from './MyAsignedTasks.vue';
// import MyTasksCommentsForm from './MyTasksCommentsForm.vue';

import $ from 'jquery'

export default {
  name:'MyTasks',
  components: { ShowTaskForm, MyAsignedTasks}, // MyTasksCommentsForm
  mounted() {
    $(".hide_menu").on('click', function() {
      $(".aside-menu").toggleClass("show_more");
    })
  }

}
</script>

<style lang="css" scoped>
</style>
