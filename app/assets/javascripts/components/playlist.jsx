var Playlist = React.createClass({
  render: function() {
    var songNames = this.props.songs.map(function(song, index) {
      return <MiniSong index={index} playMe={this.props.playMe} key={index} songSource={song.song_host} songName={song.song_name} songArtist={song.song_artist} songId={song.song_id} />
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
    var elementId = "song-" + this.props.index;
    return <a
             href="#"
             onClick={this.handleClick}
             className="list-group-item playlist-list-item"
             id={elementId}>
           {this.props.songName} - {this.props.songArtist}
           </a>
  }
});
