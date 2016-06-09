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
      var addSong = <a href="#"><i onClick={this.addSong} className="fa fa-plus-square" aria-hidden="true"></i></a>
    }
    return <div className="song-container panel panel-default">
             <div className="panel-body">
               <div className="song-result row">
                 <div className='col-xs-2'><img src={this.imageFilter()} className="song-thumbnail" /></div>
                 <div className='col-xs-10'>
                   <div className='row'>
                     <div className='song-info col-xs-12'>{this.props.author} &mdash; Popularity: {this.props.popularity}</div>
                     <div className="song-title col-xs-12"><a href="#" onClick={this.handleClick}>{this.props.songName}</a>{addSong}</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
  }
});
{/*<span className="h4">Source: </span> {this.props.source}*/}
