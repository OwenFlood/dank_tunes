var Playlist = React.createClass({
  render: function() {
    var songNames = this.props.songs.map(function(song, index) {
      return <MiniSong playMe={this.props.playMe} index={index} songSource={song.song_host} songName={song.song_name} songArtist={song.song_artist} songId={song.song_id} />
    }.bind(this));
    return  <div className="list-group">
              {songNames}
            </div>
  }
});

var MiniSong = React.createClass({
  handleClick: function() {
    this.props.playMe(event, this.props.songName, this.props.songId, this.props.songSource)
  },
  render: function() {
    return <a
             href="#"
             key={this.props.index}
             onClick={this.handleClick}
             className="list-group-item playlist-list-item">
           {this.props.songName} - {this.props.songArtist}
           </a>
  }
});
