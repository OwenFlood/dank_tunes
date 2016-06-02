var App = React.createClass({
  getInitialState: function() {
    return {songs: this.props.songs, currentSong: "", fetched: false}
  },
  parseSoundCloud: function(songs) {
    soundCloudSongs = []
    for (var i = 0; i < songs.length; i++) {
      soundCloudSongs.push({
          songName: songs[i].title,
          songId: songs[i].id,
          thumbnailLink: songs[i].artwork_url,
          author: songs[i].user.username,
          source: "soundcloud"
      });
    }
    return soundCloudSongs;
  },
  parseYouTube: function(songs) {
    youtubeSongs = []
    // console.log(songs.items);
    // console.log("ID: " + songs.items[0].id.videoId);
    // console.log("Name: " + songs.items[0].snippet.title);
    // console.log("Author: " + songs.items[0].snippet.channelTitle);
    // console.log("Thumbnail: " + songs.items[0].snippet.thumbnails.default.url);
    for (var i = 0; i < songs.items.length; i++) {
      youtubeSongs.push({
          songName: songs.items[i].snippet.title,
          songId: songs.items[i].id.videoId,
          thumbnailLink: songs.items[i].snippet.thumbnails.default.url,
          author: songs.items[i].snippet.channelTitle,
          source: "youtube"
      });
    }
    return youtubeSongs;
  },
  searchFilter: function(e) {
    e.preventDefault();

    // Soundcloud api search
    $.ajax({
      method: "GET",
      url: "http://api.soundcloud.com/tracks.json",
      data: {client_id: "4346c8125f4f5c40ad666bacd8e96498", q: $("#search-term").val(), limit: "100", order: "hotness"},
      success: function(data) {
        if(this.state.fetched){
          this.setState({songs: this.state.songs.concat(this.parseSoundCloud(data)), fetched: true});
        } else {
          this.setState({songs: this.parseSoundCloud(data), fetched: true});
        }
      }.bind(this),
      error: function() {
        // this.setState({songs: []});
        console.log("nope");
      }
    });

    // Youtube api search
    $.ajax({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      data: {part: "id, snippet", q: $("#search-term").val(), key: "AIzaSyCgc_LxS73WKGeyFplInVMxuCR332dbOls"},
      success: function(data) {
        if(this.state.fetched){
          this.setState({songs: this.state.songs.concat(this.parseYouTube(data)), fetched: true});
        } else {
          this.setState({songs: this.parseYouTube(data), fetched: true});
        }
      }.bind(this),
      error: function() {
        console.log("nope");
      }
    });
  },
  playMe: function(songName, songId, source) {
    // This is not preventing the default
    event.preventDefault();

    if (source === "soundcloud") {
      var scPlayer = new SoundCloudAudio('5d3aaf910add018f35ba65e325fcf227');
      scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + songId + '/stream'});
    } else if (source === "youtube") {
      console.log("PLAY YOUTUBE");
    }

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
