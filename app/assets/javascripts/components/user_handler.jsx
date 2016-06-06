var UserHandler = React.createClass({
  render: function() {
    if (this.props.user) {
      return <div>{this.props.user.first_name}</div>
    } else {
      return <div><a href="#" onClick={this.props.logIn}>Log In</a>{this.props.logTest}</div>
    }
  }
});
