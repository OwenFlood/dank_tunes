var UserHandler = React.createClass({
  logIn: function() {

  },
  logOut: function() {
    $.ajax({
      method: "DELETE",
      url: "http://localhost:3000/sessions",
      success: function() {
        console.log("Successfully logged out");
      },
      error: function() {
        console.log("Unable to log out");
      }
    });
  },
  render: function() {
    if (this.props.user) {

      return  <div>
                <div>Hello, {this.props.user.first_name}</div>
                <div><a href="#" onClick={this.logOut}>Log Out</a></div>
              </div>
    } else {
      return <div><a href="#" onClick={this.logIn}>Log In</a>{this.props.logTest}</div>
    }
  }
});
