var SearchBar = React.createClass({
  render: function() {
    return <div className="col-md-12 song-search-bar panel panel-default">
             <div className="panel-body">
               <form onSubmit={this.props.onSearch}>
                 <i className='fa fa-search' />
                 <input className="form-control" placeholder="Search songs from Soundcloud and YouTube" id="search-term" type="text" name="music-search-box" />
               </form>
             </div>
           </div>
  }
});
