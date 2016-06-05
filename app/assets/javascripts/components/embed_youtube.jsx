var EmbedYoutube = React.createClass({
  render: function() {
    return <iframe id="player" type="text/html" width="640" height="390"
           src={"http://www.youtube.com/embed/" + this.props.song[1] + "?enablejsapi=1&origin=http://example.com"}
           frameborder="0"></iframe>
  }
});
