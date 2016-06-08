var PlaylistSideBar = React.createClass({
  getInitialState: function() {
    return {playlists: this.props.playlists, activePlayList: {}, allPlaylists: [], newPlaylistItem: "add", playlistView: "allPlaylists", playlistData: []}
  },
  componentDidMount: function() {
    this.renderPlaylists();
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
  addPlaylist: function() {
    if (this.state.newPlaylistItem === "add") {
      this.setState({newPlaylistItem: "form"});
    }
  },
  placeAuthToken: function (authTokenField) {
    //Find token in meta tags
    //Assign to authTokenField
    //$(authTokenField)
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
  playlistDetails: function(playlist, ___, __, event) {
    console.log("Wat");
    this.props.togglePlaylist;
    this.setState({activePlayList: playlist, playlistView: "specificPlaylist"});
  },
  renderPlaylists: function() {
    this.setState({allPlaylists:
      this.state.playlists.map(function(playlist, index){
        var boundPlaylistDetails = this.playlistDetails.bind(this, playlist)
        return (
          <a
            href="#"
            key={index}
            onClick={boundPlaylistDetails}
            className="list-group-item playlist-list-item">
          {playlist.name}
          </a>
        )
      }.bind(this))
    });
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
    this.props.togglePlaylist;
  },
  render: function() {
    console.log(this.props.playlists);
    if (this.state.playlistView === "allPlaylists") {
      return  <div className="col-sm-1 col-md-3 playlist-sidebar">
                <div className="playlist-header">My Playlists</div>
                <br />
                <div>
                  <div className="list-group">
                    <a href="#" onClick={this.addPlaylist} className="list-group-item new-playlist-item">
                      {this.newPlaylistItem()}
                    </a>
                    {this.state.allPlaylists}
                    {/*<PlaylistList playlistDetails={this.playlistDetails} playlists={this.props.playlists}/>*/}
                  </div>
                </div>
              </div>
    } else if (this.state.playlistView === "specificPlaylist") {
      return  <div className="col-sm-1 col-md-3 playlist-sidebar">
                <div className="playlist-header">
                  <a href="#" onClick={this.goBack}><i className="fa fa-chevron-left custom-icons" aria-hidden="true" /></a>
                  <span className="playlist-title">{this.state.activePlayList.name}</span>
                </div>
                <br />
                <Playlist songs={this.state.activePlayList.playlist_songs} playMe={this.props.playMe}/>
                <div className="list-group">
                  {/*{this.renderPlaylistSongs(this.state.activePlayList)}*/}
                </div>
              </div>
    }
  }
});
