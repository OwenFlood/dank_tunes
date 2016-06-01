var SearchBar = React.createClass({
  render: function() {
    return <form onSubmit={this.props.onSearch}>
             <input id="search-term" type="text" name="music-search-box" />
           </form>
  }
});
