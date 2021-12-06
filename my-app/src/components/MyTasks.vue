<template lang="html">
  <div class="my_tasks_part">
    <ShowTaskForm :info = "infoToShowForm" />
    <MyAsignedTasks v-on:commentBtnClick="transferDataToShowForm($event)"></MyAsignedTasks>
  </div>
</template>

<script>
import ShowTaskForm from './ShowTaskForm.vue';
import MyAsignedTasks from './MyAsignedTasks.vue';

// import $ from 'jquery'

export default {
  name:'MyTasks',
  data() {
    return {
      infoToShowForm: [],
    }
  },
  components: { ShowTaskForm, MyAsignedTasks}, // MyTasksCommentsForm
  mounted() {
    // $(".hide_menu").on('click', function() {
    //   $(".aside-menu").toggleClass("show_more");
    // })
  },
  methods: {
    transferDataToShowForm(event) {
      this.infoToShowForm = event;
      console.log("Emit received");
      console.log(event);
    }
  }

}
</script>

<style lang="css" scoped>
</style>
