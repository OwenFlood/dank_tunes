var PlaylistSideBar = React.createClass({
  getInitialState: function() {
    return {playlists: this.props.playlists, allPlaylists: [], newPlaylistItem: "add", playlistView: "allPlaylists", playlistData: []}
  },
  componentDidMount: function() {
    this.renderPlaylists();
  },
  newPlaylist: function() {
    this.setState({newPlaylistItem: "add"});
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/playlists",
      data: {
        "name": "Sick Playlist"
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
  newPlaylistItem: function() {
    if (this.state.newPlaylistItem === "add") {
      return <span>Add New Playlist</span>
    } else if (this.state.newPlaylistItem === "form") {
      return <form onSubmit={this.newPlaylist}>
               <input type="text" placeholder="Name Your Playlist" />
             </form>
    }
  },
  playlistDetails: function() {
    // this.setState({playlistData: []});
    debugger
  },
  renderPlaylists: function() {
    this.setState({allPlaylists:
      this.state.playlists.map(function(playlist, index){
        return <a href="#" key={index} onClick={this.playlistDetails} className="list-group-item playlist-list-item">{playlist.name}</a>
      }.bind(this))
    });
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
                  </div>
                </div>
              </div>
    } else if (this.state.playlistView === "specificPlaylist") {
      return  <div className="col-sm-1 col-md-3 playlist-sidebar">
                <div className="playlist-header">Playlist Title</div>
                <br />
                <div>
                  <div className="list-group">
                    <a href="#" className="list-group-item">
                      {this.state.playlists}
                    </a>
                  </div>
                </div>
              </div>
    }
  }
});
