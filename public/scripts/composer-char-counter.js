$(document).ready(function () {
  const $tweetArea = $("#tweet-text");
  let counter = $(".counter").val();
  $tweetArea.on("input", function (event) {
    $(".counter").text(counter - this.value.length);
    if (this.value.length > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });
});
