var SignInModal = React.createClass({
  render: function() {
    return <div className="modal fade" id="myModal" tabindex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button id="sign-in-close" type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Sign In</h4>
                </div>
                <div className="modal-body">
                  <SignInForm baseUrl={this.props.baseUrl} />
                </div>
              </div>
            </div>
          </div>
  }
});

var SignInForm = React.createClass({
  signIn: function() {
    document.getElementById("sign-in-close").click();

    var email = this.refs.signInEmail.value
    var password = this.refs.signInPass.value

    $.ajax({
      method: "POST",
      url: "http://" + this.props.baseUrl + "/sessions",
      data: {
        "user[email]": email,
        "user[password]": password
      },
      success: function() {
        console.log("signed in?");
      },
      error: function() {
        console.log("Error");
      }
    })
  },
  render: function() {
    return  <form onSubmit={this.signIn} action="#" method="get">
              <div className="sign-in-field">
                <label htmlFor="email">Email</label>
                <input ref="signInEmail" className="form-control sign-in-email" type="text" name="email" id="email" placeholder="e.g. John" />
              </div>

              <div className="sign-in-field">
                <label htmlFor="password">Password</label>
                <input ref="signInPass" className="form-control sign-in-password" type="password" name="password" id="password" placeholder="e.g. Doe" />
              </div>

              <input type="submit" name="name" value="" />
            </form>
  }
});
