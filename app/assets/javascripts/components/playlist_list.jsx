var PlaylistList = React.createClass({
  render: function() {
    var playlists = this.props.playlists.map(function(playlist, index) {
      var boundPlaylistDetails = this.props.playlistDetails(this, playlist);
      return <SinglePlaylist onCLick={boundPlaylistDetails} playlistName={playlist.name} index={index} />
    }.bind(this))
    return  <div className="list-group">
              {playlists}
            </div>
  }
});

var SinglePlaylist = React.createClass({
  render: function() {
    return  <a
              href="#"
              key={this.props.index}
              className="list-group-item playlist-list-item">
            {this.props.playlistName}
            </a>
  }
});
