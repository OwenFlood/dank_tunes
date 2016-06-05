var App = React.createClass({
  getInitialState: function() {
    return {songs: this.props.songs, currentSong: "", currentSource: "", playerVariable: null, fetched: false, playYoutube: []}
  },
  parseSoundCloud: function(songs) {
    soundCloudSongs = []
    for (var i = 0; i < songs.length; i++) {
      soundCloudSongs.push({
          songName: songs[i].title,
          songId: songs[i].id,
          thumbnailLink: songs[i].artwork_url,
          author: songs[i].user.username,
          popularity: songs[i].playback_count,
          source: "soundcloud"
      });
    }
    return soundCloudSongs;
  },
  parseYouTube: function(songs) {
    var songPromises = songs.items.map(this.getYoutubeViews);

    return new Promise(function(resolve, reject) {
      Promise.all(songPromises).then(function(detailedSongs) {
        var youtubeSongs = detailedSongs.map(function (song) {
          return {
            songName: song.snippet.title,
            songId: song.id.videoId,
            thumbnailLink: song.snippet.thumbnails.default.url,
            author: song.snippet.channelTitle,
            popularity: song.viewCount,
            source: "youtube"
          };
        });

        resolve(youtubeSongs);
      });
    })
  },
  getYoutubeViews: function(song) {
    return new Promise(function (resolve, reject) {
      var updatedSong = Object.assign({}, song);
      $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/videos",
        data: {id: song.id.videoId,  key: "AIzaSyCgc_LxS73WKGeyFplInVMxuCR332dbOls", part: "statistics"},
        success: function(data) {
          updatedSong.viewCount = data.items[0].statistics.viewCount;
          console.log(`Processed song ${song.snippet.title}`)
          resolve(updatedSong);
        },
        error: function(err) {
          console.log(err);
          reject(err);
        }
      });
    });
  },
  searchFilter: function(e) {
    e.preventDefault();
    this.state.songs = [];

    // Soundcloud api search
    $.ajax({
      method: "GET",
      url: "http://api.soundcloud.com/tracks.json",
      data: {client_id: "4346c8125f4f5c40ad666bacd8e96498", q: $("#search-term").val(), limit: "100", order: "hotness"},
      success: function(data) {

        this.setState({ songs: this.state.songs.concat(this.parseSoundCloud(data)) });

      }.bind(this),
      error: function() {
        console.log("nope");
      }
    });

    // Youtube api search
    $.ajax({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      data: {part: "id, snippet", q: $("#search-term").val(), key: "AIzaSyCgc_LxS73WKGeyFplInVMxuCR332dbOls"},
      success: function(data) {
        console.log(data);
        this.parseYouTube(data).then(function (youtubeSongs) {
          this.setState({ songs: this.state.songs.concat(youtubeSongs) });
        }.bind(this));
      }.bind(this),
      error: function() {
        console.log("nope");
      }
    });
  },
  playMe: function(event, songName, songId, source) {
    event.preventDefault();
    scPlayer

    if (this.state.currentSource === "soundcloud") {
      this.state.playerVariable.stop();
    }

    if (source === "soundcloud") {
      var scPlayer = new SoundCloudAudio('5d3aaf910add018f35ba65e325fcf227');
      this.setState({currentSource: "soundcloud", playerVariable: scPlayer});
      scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + songId + '/stream'});
    } else if (source === "youtube") {
      this.setState({playYoutube: [songName, songId, source], currentSource: "youtube"}, function() {
        $(".ytp-large-play-button").click();
      });
    }
    this.setState({currentSong: songName});
  },
  render: function() {
    return <div className="container">
            <h1>Sweet Berry Wine</h1>
            <SearchBar onSearch={this.searchFilter} />
            <EmbedYoutube song={this.state.playYoutube}/>
            <h3>Now Playing:</h3>
            <SongList playMe={this.playMe} songs={this.state.songs} />
            <NowPlaying currentSong={this.state.currentSong}/>
           </div>
  }
});
