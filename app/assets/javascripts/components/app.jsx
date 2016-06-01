var App = React.createClass({
  getInitialState: function() {
    return {songs: this.props.songs, currentSong: ""}
  },
  searchFilter: function(e) {
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: "http://api.soundcloud.com/tracks.json",
      data: {client_id: "4346c8125f4f5c40ad666bacd8e96498", q: $("#search-term").val(), limit: "100", order: "hotness"},
      success: function(data) {
        console.log(data);
        this.setState({songs: data});
      }.bind(this),
      error: function() {
        this.setState({songs: []});
      }
    });
  },
  playMe: function(songName, songId) {
    event.preventDefault();
      var scPlayer = new SoundCloudAudio('5d3aaf910add018f35ba65e325fcf227');
      scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + songId + '/stream'});
      this.setState({currentSong: songName});
  },
  render: function() {
    return <div className="container">
            <h1>Sweet Berry Wine</h1>
            <SearchBar onSearch={this.searchFilter} />
            <h3>Now Playing:</h3>
            <SongList playMe={this.playMe} songs={this.state.songs} />
            <NowPlaying currentSong={this.state.currentSong}/>
           </div>
  }
});
