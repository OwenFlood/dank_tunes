var YoutubeTest = React.createClass({
  searchYoutube: function() {
    $.ajax({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&q=cat&key=AIzaSyCgc_LxS73WKGeyFplInVMxuCR332dbOls",
      success: function(data) {
        console.log(data);
      },
      error: function() {
        console.log("nope");
      }
    });
  },
  render: function() {
    return <button type="button" onClick={this.searchYoutube}></button>
  }
});
