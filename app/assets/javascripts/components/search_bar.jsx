var SearchBar = React.createClass({
  render: function() {
    return <div className="col-md-12 song-search-bar">
             <form className="col-md-3" onSubmit={this.props.onSearch}>
               <input className="form-control" placeholder="Search for a song" id="search-term" type="text" name="music-search-box" />
             </form>
           </div>
  }
});
