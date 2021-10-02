<template>
  <div class="main-part">
    <SetTaskForm/>
    <div class="tasks_asign">
      <div class="set_task_btn">
        <button id="set_task">Призначити завдання</button>
      </div>
      <AsignedTasks/>
    </div>
  </div>
</template>
<script>
  import SetTaskForm from './SetTaskForm.vue'
  import AsignedTasks from './AsignedTasks.vue'
  import $ from 'jquery'

  export default {
    name: 'SetTask',
    components: { SetTaskForm, AsignedTasks},
    mounted() {
      $("#set_task").on('click', function() {
        $(".form_bg").addClass("flex");
      })
      $(".set_task_form__close_btn").on('click', function(){
        $(".form_bg").removeClass("flex");
        $("#set_task_form__asign_btn").text("Призначити");
        $(".form").removeClass("read_only");
        $(".set_task_form__name").attr("disabled", false);
      })
      $("#edit_btn").on('click', function() {
        $(".form_bg").addClass("flex");
        $("#set_task_form__asign_btn").text("Змінити");
      })
    }
  }


</script>
