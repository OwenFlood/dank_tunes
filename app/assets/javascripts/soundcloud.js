// var scPlayer = new SoundCloudAudio('5d3aaf910add018f35ba65e325fcf227');
//
// document.querySelector("#play-button").addEventListener("click", function() {
//   scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'});
// });
$(function() {
  var scPlayer = new SoundCloudAudio('5d3aaf910add018f35ba65e325fcf227');

  $("body").on("click", ".song-link", function(event) {
    var id = event.target.getAttribute("data-id");

    scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + id + '/stream'});

    $("#now-playing").text("Now Playing: " + $(this).text());
  });

  $("#search-box").on("submit", function(event) {
    event.preventDefault();
    console.log("Sup dood");

    $.get({
      url: "http://api.soundcloud.com/tracks.json",
      data: {client_id: "4346c8125f4f5c40ad666bacd8e96498", q: $("#search-term").val(), limit: "100", order: "hotness"},
      success: function(data) {
        for (var i = 0; i < data.length; i++) {
          $(".song-list").append("<a class='song-link' data-id=" + data[i].id + " href='#'> " + data[i].title + " </a> <br> <br>");
        }
      },
      error: function() {
        console.log("nah dude");
      }
    });

    $(".song-list").html("")
  });
})
