var SongList = React.createClass({
  render: function() {
    if (this.props.songs.length > 0) {
      var allSongs = this.props.songs.map(function(song, index){
        return <Song addToPlaylist={this.props.addToPlaylist} addable={this.props.addable} class="song-list" playMe={this.props.playMe} imageLink={song.thumbnailLink} songName={song.songName} songId={song.songId} author={song.author} source={song.source} key={index} popularity={song.popularity} />
      }.bind(this));

      return <div>{allSongs}</div>
    } else {
      return <div className="h4 no-results">No Results Found.</div>
    }
  }
});

var Song = React.createClass({
  imageFilter: function() {
    if (this.props.imageLink) {
      return this.props.imageLink;
    } else {
      if (this.props.source === "soundcloud") {
        return "http://www.unlimitune.com/images/soundcloud-button.png";
      } else if (this.props.source === "youtube") {
        return "https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png"
      }
    }
  },
  handleClick: function(event) {
    this.props.playMe(event, this.props.songName, this.props.songId, this.props.source)
  },
  addSong: function(event) {
    event.preventDefault();
    this.props.addToPlaylist(this.props.songName, this.props.songId, this.props.source, this.props.author, this.props.imageLink, this.props.popularity);
  },
  render: function() {
    if (this.props.addable) {
      return <div className="song-result">
                <img src={this.imageFilter()} className="song-thumbnail" />
                <span className="h4 song-title"><a href="#" onClick={this.handleClick}>{this.props.songName}</a></span> - {this.props.author} <span className="h4">Source: </span> {this.props.source} <span className="h4">Popularity: </span> {this.props.popularity}
                <a href="#"><i onClick={this.addSong} className="fa fa-plus-square" aria-hidden="true"></i></a>
                <hr />
             </div>
    } else {
      return <div className="song-result">
                <img src={this.imageFilter()} className="song-thumbnail" />
                <span className="h4 song-title"><a href="#" onClick={this.handleClick}>{this.props.songName}</a></span> - {this.props.author} <span className="h4">Source: </span> {this.props.source} <span className="h4">Popularity: </span> {this.props.popularity}
                <hr />
             </div>
    }
  }
});
