<template>
  <div class="main-part">
    <SetTaskForm v-bind:allUsers="allUsersParent"/>
    <div class="tasks_asign">
      <div class="set_task_btn">
        <button id="set_task">Призначити завдання</button>
      </div>
      <AsignedTasks v-bind:allUsers="allUsersParent"/>
    </div>
  </div>
</template>
<script>
  import SetTaskForm from './SetTaskForm.vue'
  import AsignedTasks from './AsignedTasks.vue'
  import $ from 'jquery'

  export default {
    name: 'SetTask',
    data: function(){
      return {
        allUsersParent: []
      }
    },
    components: { SetTaskForm, AsignedTasks},
    created: function() {
      this.showAllUsers()
    },
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
      $(".edit_btn").on('click', function() {
        $(".form_bg").addClass("flex");
        $("#set_task_form__asign_btn").text("Змінити");
      })
    },
    methods: {
      showAllUsers: async function () {
        const response = await fetch('/api/allUsers');
        this.allUsersParent = await response.json();
      }
    }
  }


</script>
