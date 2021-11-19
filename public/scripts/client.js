$(document).ready(function () {
  $("form").on("submit", function (event) {
    //check conditions if empty tweet or tweet character length is more than 140 characters
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $("#errMsg").text("⚠️ Cannot post empty tweet ⚠️");
      event.preventDefault();
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      $("#errMsg").text("⚠️ Tweet cannot be more than 140 characters ⚠️");
      event.preventDefault();
      return;
    }
    //prevent default prevents from page reload after the form is submitted
    event.preventDefault();
    // jquery ajax request to send the form data to server without refreshing the page
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    });
    //running jquery function to reset once the data is sent
    $("#errMsg").empty();
    $("#tweet-text").val("");
    $(".counter").text(140);
    //Empty and reload off the tweets without page refresh
    $(".display-main").empty();
    rendertweets(loadTweets());
  });
  //ajax request to get the data from server
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (res) {
        res.reverse();
        //calling render tweet function to pass the result object
        rendertweets(res);
      },
    });
  };
  // create tweet function to create tweets 
  const createTweetElement = function (tweet) {
    //escape function to handle cross site scripting 
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    let tweetitem = $(
      `
                <div class="name-handle">
                <div class="name-div">
                <img src ="${tweet["user"]["avatars"]}">
                <p>${tweet["user"]["name"]}</p>
                <span>${tweet["user"]["handle"]}</span>
                </div>
                <div class="text-display">
                <p>${escape(tweet["content"]["text"])}</p>
                </div>
                <hr>
                <div class="date-handle">
                <p>${timeago.format(new Date(tweet["created_at"]))}</p>
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
                </div>
                </div>
                `
    );
    return tweetitem;
  };
  // render tweets function takes in tweets data as parameter and loops through it to append all the tweets
  const rendertweets = function (tweets) {
    $.each(tweets, (item) => {
      const newTweet = createTweetElement(tweets[item]);
      $(".display-main").append(newTweet);
    });
  };

  rendertweets(loadTweets());
});
