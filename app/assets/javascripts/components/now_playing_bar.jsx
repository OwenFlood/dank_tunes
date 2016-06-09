var NowPlaying = React.createClass({
  componentDidMount: function() {
    console.log(document.getElementsByClassName("play-pause-buttons"))
  },
  render: function() {
    if (this.props.currentSong) {
      var stopButton =  <a href="#" className="play-pause-buttons" onClick={this.props.handlePlayPause}>
      <i className="fa fa-stop"></i>
      </a>
    }
    return <div className="navbar navbar-default navbar-fixed-bottom play-bar">
              <div>
                <div className="app-brand navbar-brand pull-left">Dank Tunes</div>
                <div className="song-manipulation">
                   {stopButton}
                   {this.props.currentSong}
                </div>

                <div className="playlist-hamburger">
                  <a href="#" className="play-pause-buttons" onClick={this.props.togglePlaylistBar}>
                    <i className="fa fa-bars open-playlist" aria-hidden="true"></i>
                  </a>
                </div>

              </div>
           </div>
  }
});
