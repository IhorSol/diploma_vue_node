<template>
  <div class="asigned_tasks_part">
    <h2>Призначені завдання</h2>
    <div class="asigned_tasks">
      <div class="asigned_task">
        <div class="asigned_task__header">
          <div class="asigned_task__complexity normal-complexity"></div>
          <div class="asigned_task__name"><h3>Назва задачі </h3></div>
        </div>
        <div class="asigned_task__body">
          <p class="asigned_task_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex atque vel nobis facilis cumque alias possimus, quia at fuga. Debitis nisi aut impedit repudiandae, voluptates nostrum accusamus doloribus ratione sequi?</p>
          <div class="asigned_task__deadline"><i class="fas fa-calendar-week"></i> dd.mm.yy</div>
          <div class="asigned_task__asigned-by"><i class="fas fa-user"></i>Name of user </div>
          <div class="asigned_task__buttons">
            <!-- <button id="btn_done">Виконано</button>
            <button id="btn_more">Детальніше</button> -->
            <button id="comment_btn"><i class="fas fa-comments"></i></button>
            <button id="edit_btn"><i class="fas fa-edit"></i></button>
            <button id="delete_btn"><i class="fas fa-trash-alt"></i></button>

          </div>
        </div>

      </div>
      <div class="asigned_task"></div>
      <div class="asigned_task"></div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'AsignedTasks'
  }
</script>
