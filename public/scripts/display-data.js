$(document).ready(function () {
  $( "form" ).on("submit",function( event ) {
    console.log("form Submitted")
    event.preventDefault();
    const sendingText = $(this).serialize();
    console.log(sendingText)
    $.ajax({
      url: "/tweets",
      method: "POST", // POST, PUT, DELETE, ... 
      data: sendingText
    })
  });
  fetch("/tweets")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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

  // $("#load-more-posts").on("submit", function (event) {
  //   event.preventDefault();
  //   console.log("the default event result has been prevented");
  //   let url = "https://api.apify.com/v2/key-value-stores/fabbocwKrtxSDf96h/records/LATEST?disableRedirect=true"
  //   $.ajax({
  //     url: url,
  //     method: "GET", // POST, PUT, DELETE, ... 
  //   })
  //   .then((data) => {
  //     console.log('ajax callback called');
  //     console.log('result:',data);
  //     appendData(data)
  //     history.pushState(null,"Stats Retrieved",'/#data');
  //   })
  //   .catch(err => {
  //     console.log('ajax error caught');
  //     console.log(err); // related error
  //   });

  // });