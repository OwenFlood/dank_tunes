var Playlists = React.createClass({
  getInitialState: function() {
    return {
      activePlayListId: null,
      newPlaylistItem: "add",
      playlistView: "allPlaylists",
      playlistData: []}
  },
  newPlaylist: function() {
    this.setState({newPlaylistItem: "add"});
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/playlists",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: {
        "playlist[name]": $("#add-playlist-input").val()
      },
      success: function() {
        console.log("YAY");
      },
      error: function(error) {
        console.log(error);
      }
    });
  },
  deletePlaylist: function() {
    $.ajax({
      method: "DELETE",
      url: "http://localhost:3000/playlists/" + this.state.activePlayListId,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function() {
        console.log("DELETED");
      },
      error: function(error) {
        console.log(error);
      }
    });
    this.setState({activePlayListId: null, playlistView: "allPlaylists"});
  },
  addPlaylist: function() {
    if (this.state.newPlaylistItem === "add") {
      this.setState({newPlaylistItem: "form"});
    }
  },
  newPlaylistItem: function() {
    if (this.state.newPlaylistItem === "add") {
      return <span>Add New Playlist</span>
    } else if (this.state.newPlaylistItem === "form") {
      return <form onSubmit={this.newPlaylist}>
               <input type="text" id="add-playlist-input" placeholder="Name Your Playlist" />
               <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
             </form>
    }
  },
  playlistDetails: function(playlist, __, event) {
    p = this.findPlaylist(playlist.target.id)
    this.props.togglePlaylist(p);
    this.setState({activePlayListId: p.id, playlistView: "specificPlaylist"});
  },
  findPlaylist: function(playlistId) {
    return _.find(this.props.playlists, {id: parseInt(playlistId)});
  },
  renderPlaylistSongs: function(playlist) {
    playlist.playlist_songs.map(function(song, index){
      console.log(song.song_name);
      return  <a href="#" key={index} className="list-group-item">
                {song.song_name}
              </a>
    });
  },
  goBack: function(event) {
    event.preventDefault();
    this.setState({playlistView: "allPlaylists"});
    this.props.togglePlaylist();
  },
  render: function() {
    if (!this.props.showing) {
      <div></div>
    }
    else if (this.state.playlistView === "allPlaylists") {
      var playlists =
        <div className="list-group">
          <a href="#" onClick={this.addPlaylist} className="list-group-item new-playlist-item">
            {this.newPlaylistItem()}
          </a>
          {this.props.playlists.map(function(playlist, index){
            return (
              <a
                href="#"
                key={index}
                id={playlist.id}
                onClick={this.playlistDetails.bind(playlist)}
                className="list-group-item playlist-list-item">
              {playlist.name}
              </a>
            )
          }.bind(this))}
        </div>
      var playlistHeader = "My Playlists"
    } else {
      var currentList = this.findPlaylist(this.state.activePlayListId)
      var playlists = <Playlist songs={currentList.playlist_songs} playMe={this.props.playMe}/>
      var playlistHeader =
        <span>
          <a href="#" onClick={this.goBack}><i className="fa fa-chevron-left custom-icons" aria-hidden="true" /></a>
          <span className="playlist-title">{currentList.name}</span>
          <a href="#" onClick={this.deletePlaylist}><i className="fa fa-trash custom-icon playlist-trash" aria-hidden="true" /></a>
        </span>
    }

    return <div className="col-sm-1 col-md-3 playlist-sidebar">
              <div className="playlist-header">{playlistHeader}</div>
              <br />
              {playlists}
            </div>
  }
});
