var App = React.createClass({
  getInitialState: function() {
    return {songs: this.props.songs, currentSong: "", fetched: false}
  },
  parseSoundCloud: function(songs) {
    soundCloudSongs = []
    var author;
    var authors = [];

    for (var i = 0; i < songs.length; i++) {
      if (songs[i].user) {
        author = songs[i].user.username
      } else {
        author = "Unknown Artist"
      }
      authors.push(author)
      soundCloudSongs.push({
          songName: songs[i].title,
          songId: songs[i].id,
          thumbnailLink: songs[i].artwork_url,
          author: author,
          source: "soundcloud"
      });
      console.log(">>>>>>>>>>>>>>>>>>>>>");
      console.log(songs[i].id);
      console.log(">>>>>>>>>>>>>>>>>>>>>");
    }
    // console.log(authors.length);
    return soundCloudSongs;
  },
  searchFilter: function(e) {
    e.preventDefault();

    // Soundcloud api search
    $.ajax({
      method: "GET",
      url: "http://api.soundcloud.com/tracks.json",
      data: {client_id: "4346c8125f4f5c40ad666bacd8e96498", q: $("#search-term").val(), limit: "100", order: "hotness"},
      success: function(data) {
        console.log(data);
        console.log(data.length);
        // this.setState({fetched: true});
        if(this.state.fetched){
          this.setState({songs: data.concat(this.parseSoundCloud(data)), fetched: true});
          console.log(">>>>>>>>>>>>>>>>");
          console.log(this.state.songs);
          console.log(">>>>>>>>>>>>>>>>");
        } else {
          this.setState({songs: this.parseSoundCloud(data), fetched: true});
        }
      }.bind(this),
      error: function() {
        this.setState({songs: []});
      }
    });

    // Youtube api search
    $.ajax({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      data: {part: "id, snippet", q: $("#search-term").val(), key: "AIzaSyCgc_LxS73WKGeyFplInVMxuCR332dbOls"},
      success: function(data) {
        console.log(data.items);
      },
      error: function() {
        console.log("nope");
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
