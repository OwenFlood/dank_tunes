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
        this.props.updatePlaylists();
      }.bind(this),
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
        this.props.updatePlaylists();
      }.bind(this),
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
      return <span><i className="fa fa-plus add-playlist-icon" />Add New Playlist</span>
    } else if (this.state.newPlaylistItem === "form") {
      return <form className="add-playlist-form" onSubmit={this.newPlaylist}>
               <input type="text" id="add-playlist-input" ref={this.focusAddPlaylistInput} className="form-control" placeholder="Name Your Playlist" />
               <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
             </form>
    }
  },
  focusAddPlaylistInput: function(ref) {
    n = ReactDOM.findDOMNode(ref)
    if (n) { n.focus() };
  },
  playlistDetails: function(playlist, __, event) {
    p = this.findPlaylist(playlist.target.id)
    this.props.togglePlaylist(p);
    this.setState({activePlayListId: p.id, playlistView: "specificPlaylist"});
  },
  findPlaylist: function(playlistId) {
    return _.find(this.props.playlists, {id: parseInt(playlistId)});
  },
  goBack: function(event) {
    event.preventDefault();
    this.setState({playlistView: "allPlaylists"});
    this.props.togglePlaylist();
  },
  render: function() {
    if (!this.props.showing) {
      return <div></div>
    } else if (this.state.playlistView === "allPlaylists") {
      return <div className="col-sm-1 col-md-3 playlist-sidebar">
                <div className="playlist-header">My Playlists</div>
                <br />
                <div className="list-group">
                  <a href="#" onClick={this.addPlaylist} className="list-group-item new-playlist-item">
                    {this.newPlaylistItem()}
                  </a>
                  {this.props.playlists.map(function(playlist, index){
                    return <a
                              href="#"
                              key={index}
                              id={playlist.id}
                              onClick={this.playlistDetails.bind(playlist)}
                              className="list-group-item playlist-list-item">
                            {playlist.name}
                            </a>
                  }.bind(this))}
                </div>
              </div>
    } else {
      var currentList = this.findPlaylist(this.state.activePlayListId)
      var playlists = <Playlist songs={currentList.playlist_songs} playMe={this.props.playMe}/>
      return <div className="col-sm-1 col-md-3 playlist-sidebar">
              <div className="playlist-header">
                <a href="#" onClick={this.goBack}><i className="fa fa-chevron-left custom-icons" aria-hidden="true" /></a>
                <span className="playlist-title">{currentList.name}</span>
                <a href="#" onClick={this.deletePlaylist}><i className="fa fa-trash custom-icon playlist-trash" aria-hidden="true" /></a>
              </div>
              <br />
              {playlists}
            </div>
    }
  }
});
