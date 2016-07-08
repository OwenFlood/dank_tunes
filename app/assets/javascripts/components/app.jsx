var App = React.createClass({
  getInitialState: function() {
    return {songs: [], sortedSongs: [], addable: false, playlistBarShowing: true, currentSong: "", currentSource: "", currentPlaylist: null, playerVariable: null, playlists: this.props.playlists}
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
        data: {id: song.id.videoId,  key: this.props.youtube_client_id, part: "statistics"},
        success: function(data) {
          updatedSong.viewCount = data.items[0].statistics.viewCount;
          resolve(updatedSong);
        },
        error: function(err) {
          reject(err);
        }
      });
    }.bind(this));
  },
  searchFilter: function(e) {
    e.preventDefault();
    this.state.songs = [];

    // Soundcloud api search
    $.ajax({
      method: "GET",
      url: "http://api.soundcloud.com/tracks.json",
      data: {client_id: this.props.soundcloud_client_id, q: $("#search-term").val(), limit: "20", order: "hotness"},
      success: function(data) {
        this.setState({ songs: this.state.songs.concat(this.parseSoundCloud(data)) });
        debugger
      }.bind(this),
      error: function(error) {
        console.log(error);
      }
    });

    // Youtube api search
    $.ajax({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      data: {part: "id, snippet", q: $("#search-term").val(), type: "video", maxResults: 5, key: this.props.youtube_client_id},
      success: function(data) {
        this.parseYouTube(data).then(function (youtubeSongs) {
          this.setState({ songs: this.state.songs.concat(youtubeSongs) });
        }.bind(this));
      }.bind(this),
      error: function(error) {
        console.log(error);
      }
      // Consider using .then(this.sortSongs) to try to sort the songs
    });
  },
  sortSongs:function() {
    var sortedSongs = this.state.songs.sort(function(a, b) {
        parseInt(a.popularity) - parseInt(b.popularity);
    });
    console.log("INC SORT:");
    console.log(sortedSongs);
    this.setState({sortedSongs: sortedSongs});
  },
  playMe: function(event, songName, songId, source) {
    event.preventDefault();

    if (this.state.currentSource === "soundcloud") {
      this.state.playerVariable.stop();
    } else if (this.state.currentSource === "youtube") {
      this.player.loadVideoById(null);
    }

    if (source === "soundcloud") {
      var scPlayer = new SoundCloudAudio(this.props.soundcloud_client_id);
      this.setState({currentSource: "soundcloud", playerVariable: scPlayer});
      scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + songId + '/stream'});
    } else if (source === "youtube") {
      this.setState({currentSource: "youtube"});

      if (this.player) {
        setTimeout(function () {
          this.player.loadVideoById(songId);
        }.bind(this), 100);
      } else {
        this.player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: songId
        });
        this.setState({playerVariable: this.player});
        setTimeout(function () {
          this.player.loadVideoById(songId);
        }.bind(this), 1000);
      }
    }
    this.setState({currentSong: songName});
  },
  handlePlayPause: function() {
    if (this.state.currentSource === "soundcloud") {
      var player = this.state.playerVariable
      player.pause();
      this.setState({currentSource: "", currentSong: ""});
    } else if (this.state.currentSource === "youtube") {
      this.player.loadVideoById(null);
      this.setState({currentSource: "", currentSong: ""});
    }
    this.setState({playerVariable: null})
  },
  addToPlaylist: function(name, songId, source, author, thumbnail, popularity) {
    $.ajax({
      method: "POST",
      url: "http://" + this.props.base_url + "/playlists/:playlist_id/playlist_songs",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: {
        "playlist_song[song_host]": source,
        "playlist_song[song_id]": songId,
        "playlist_song[song_name]": name,
        "playlist_song[song_artist]": author,
        "playlist_song[thumbnail_link]": thumbnail,
        "playlist_song[popularity]": popularity,
        "playlist_song[playlist_id]": this.state.currentPlaylist.id,
      },
      success: function() {
        this.updatePlaylists();
      }.bind(this),
      error: function(error) {
        console.log(error);
      }
    });
  },
  updatePlaylists: function () {
    $.ajax({
      method: 'GET',
      url: "http://" + this.props.base_url + "/users/" + this.props.current_user.id + "/playlists",
      success: function(data) {
        this.setState({playlists: data});
      }.bind(this),
      error: function(error) {
        console.log(error);
      }
    })
  },
  togglePlaylist: function(playlist) {
    this.state.addable ? this.setState({addable: false, currentPlaylist: null}) : this.setState({addable: true, currentPlaylist: playlist});
  },
  togglePlaylistBar: function() {
    this.setState({playlistBarShowing: !this.state.playlistBarShowing});
  },
  render: function() {
    if (this.state.playlistBarShowing) {
      var containerClasses = 'container col-sm-11 col-md-9'
    } else {
      var containerClasses = 'container'
    }
    return <div className={containerClasses}>
            <h2 className='app-title'>Enjoy the dankest of tunes...</h2>
            <UserHandler />
            <SearchBar onSearch={this.searchFilter} /> <br /> <br />
            <SongList addToPlaylist={this.addToPlaylist} addable={this.state.addable} playMe={this.playMe} songs={this.state.songs} />
            <NowPlaying togglePlaylistBar={this.togglePlaylistBar} handlePlayPause={this.handlePlayPause} currentSong={this.state.currentSong} />
            <Playlists baseUrl={this.props.base_url} currentSource={this.state.currentSource} showing={this.state.playlistBarShowing} togglePlaylist={this.togglePlaylist} playlists={this.state.playlists} playMe={this.playMe} updatePlaylists={this.updatePlaylists} />
            <SignInModal />
           </div>
  }
});
