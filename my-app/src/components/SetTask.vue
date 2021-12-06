<template>
      <div class="main-part">
        <SetTaskForm v-bind:allUsers="allUsersParent"/>
        <ShowTaskForm :info = "infoToShowForm" />
        <!-- <SetTaskCommentsForm/> -->
        <div class="tasks_asign">
          <div class="set_task_btn">
            <button id="set_task">Призначити завдання</button>
          </div>
          <AsignedTasks v-bind:allUsers="allUsersParent" v-on:commentBtnClick="transferDataToShowForm($event)" />
        </div>
      </div>
</template>
<script>
  import SetTaskForm from './SetTaskForm.vue'
  import AsignedTasks from './AsignedTasks.vue'
  import ShowTaskForm from './ShowTaskForm.vue'

  import $ from 'jquery'

  export default {
    name: 'SetTask',
    data: function(){
      return {
        allUsersParent: [],
        infoToShowForm: [],
      }
    },
    components: { SetTaskForm, AsignedTasks, ShowTaskForm, }, // SetTaskCommentsForm
    created: function() {
      this.showAllUsers()
    },
    mounted() {
      $("#set_task").on('click', function() {
        $("#set_form").addClass("flex");
      })
      $(".set_task_form__close_btn").on('click', function(){
        $("#set_form").removeClass("flex");
        // $("#set_task_form__asign_btn").text("Призначити");
        $(".form").removeClass("read_only");
        $(".set_task_form__name").attr("disabled", false);
      })
      $(".edit_btn").on('click', function() {
        $("#set_form").addClass("flex");
        // $("#set_task_form__asign_btn").text("Змінити");
      })
    },
    methods: {
      showAllUsers: async function () {
        const response = await fetch('/api/allUsers');
        this.allUsersParent = await response.json();
      },
      transferDataToShowForm(event) {
        this.infoToShowForm = event;
        console.log("Emit received");
        console.log(event);
      }
    }
  }


</script>
