import $ from 'jquery'

function clock(){
  let date = new Date();
  let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
  minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  // seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  let days = date.getDay();
  document.querySelector(".time").innerHTML = hours + ':' + minutes;
  document.querySelector(".day").innerHTML = dayOfWeek[days];
}
setInterval(clock, 1000);
clock();

// ;(function($, undefined) {
  $(".hide_menu").on('click', function() {
    $(".aside-menu").toggleClass("show_more");
  });
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
  $("#show_btn").on('click', function() {
    $(".form_bg").addClass("flex");
    $("#set_task_form__asign_btn").text("Bиконано");
    $(".form").addClass("read_only");
    $(".set_task_form__name").attr("disabled", true);


  })
// })(jQuery);
