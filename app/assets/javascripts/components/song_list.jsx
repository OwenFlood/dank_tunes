var SongList = React.createClass({
  render: function() {
    if (this.props.songs.length > 0) {
      var allSongs = this.props.songs.map(function(song, index){
        return <Song class="song-list" playMe={this.props.playMe} imageLink={song.thumbnailLink} songName={song.songName} songId={song.songId} author={song.author} source={song.source} key={index} />
      }.bind(this));

      return <div>{allSongs}</div>
    } else {
      return <h4>No Results Found.</h4>
    }
  }
});

var Song = React.createClass({
  // playMe: function(e) {
  //   e.preventDefault();
  //   var scPlayer = new SoundCloudAudio('5d3aaf910add018f35ba65e325fcf227');
  //   scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + this.props.songId + '/stream'});
  // },
  imageFilter: function() {
    if (this.props.imageLink) {
      return this.props.imageLink;
    } else {
      return "http://www.unlimitune.com/images/soundcloud-button.png";
    }
  },
  render: function() {
    // var playMe = this.props.playMe.bind(null, {this.props.songName})
    return <div>
              <img src={this.imageFilter()} class="song-thumbnail" />
              <span className="h4"><a href="#" onClick={() => this.props.playMe(this.props.songName, this.props.songId)}>{this.props.songName}</a></span> - {this.props.author} Source: {this.props.source}
              <hr />
           </div>
  }
});
