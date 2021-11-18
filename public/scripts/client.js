$(document).ready(function () {
  $("form").on("submit", function (event) {
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
    event.preventDefault();
    const sendText = $(this).serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: sendText,
    });
    $("#errMsg").empty();
    $("#tweet-text").val("");
    $(".counter").text(140);
    $(".display-main").empty();
    rendertweets(loadTweets());
  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (res) {
        res.reverse();
        rendertweets(res);
      },
    });
  };

  const createTweetElement = function (tweet) {
    let tweetitem = $(
      `
                <div class="name-handle">
                <div class="name-div">
                <img src ="${tweet["user"]["avatars"]}">
                <p>${tweet["user"]["name"]}</p>
                <h3>${tweet["user"]["handle"]}</h3>
                </div>
                <p>${tweet["content"]["text"]}</p>
                <hr>
                <div class="date-handle">
                <p>${timeago.format(new Date(tweet["created_at"]))}</p>
                <i class="far fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="far fa-heart"></i>
                </div>
                </div>
                `
    );
    return tweetitem;
  };

  const rendertweets = function (tweets) {
    $.each(tweets, (item) => {
      const newTweet = createTweetElement(tweets[item]);
      $(".display-main").append(newTweet);
    });
  };

  rendertweets(loadTweets());
});
