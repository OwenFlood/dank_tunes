var SignInModal = React.createClass({
  render: function() {
    return <div className="modal fade" id="myModal" tabindex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Sign In</h4>
                </div>
                <div className="modal-body">
                  <SignInForm />
                </div>
              </div>
            </div>
          </div>
  }
});

var SignInForm = React.createClass({
  render: function() {
    return  <form class="" action="#" method="post">
              <div className="sign-in-field">
                <label htmlFor="email">Email</label>
                <input className="form-control sign-in-email" type="text" name="email" id="email" placeholder="e.g. John" />
              </div>

              <div className="sign-in-field">
                <label htmlFor="password">Password</label>
                <input className="form-control sign-in-password" type="text" name="password" id="password" placeholder="e.g. Doe" />
              </div>
            </form>
  }
});
