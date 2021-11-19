$(document).ready(function () {
  $( "form" ).on("submit",function( event ) {
    console.log("form Submitted")
    event.preventDefault();
    const sendingText = $(this).serialize();
    console.log(sendingText)
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: sendingText
    })
    $(".display-main").empty();
    fetch("/tweets")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.reverse();
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
  });
  fetch("/tweets")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.reverse()
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
  function appendData(data) {
    let mainContainer = $(".display-main");
    for (let i of data) {
      let div = $("<div>").addClass("name-handle");
      let namediv = $("<div>").addClass("name-div");
      const dateHandle = $("<div>").addClass("date-handle");
      let username = $("<p>");
      let handle = $("<h3>");
      let icon = $("<img>");
      let text = $("<p>");
      let date = $("<p>");
      icon.attr("src", i["user"]["avatars"]);
      username.html(i["user"]["name"]);
      handle.html(i["user"]["handle"]);
      text.text(i["content"]["text"]);
      date.html(new Date(i["created_at"]).toDateString());
      namediv.append(icon);
      namediv.append(username);
      namediv.append(handle);
      div.append(namediv);
      div.append(text);
      div.append("<hr>");
      dateHandle.append(date);
      dateHandle.append('<i class="far fa-flag"></i>');
      dateHandle.append('<i class="fas fa-retweet"></i>');
      dateHandle.append('<i class="far fa-heart"></i>');
      div.append(dateHandle);
      mainContainer.append(div);
    }
  }
});