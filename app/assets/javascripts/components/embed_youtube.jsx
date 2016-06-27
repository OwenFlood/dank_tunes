var EmbedYoutube = React.createClass({
  render: function() {
    var styles = {
      display: this.props.source === "youtube" ? 'block' : 'none'
    }
    return <div style={styles}><div id="player" className="youtube-iframe"></div></div>
  }
});
