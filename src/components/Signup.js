import React, { useState } from 'react';

let Signup = () => {
  let fullname = '';
  let email = '';
  let password = '';

  const [infoMsg, setInfomsg] = useState('');
  const [infoColor, setInfoColor] = useState('text-danger');
  let onSubmitForm = (e) => {
    e.preventDefault();
    fetch("https://backendapi.turing.com/customers", {
      body: `name=${encodeURIComponent(fullname.value)}&email=${email.value}&password=${encodeURIComponent(password.value)}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
        if (response.error) {
          setInfoColor('text-danger');
          setInfomsg(response.error.message);
          return;
        }
        setInfoColor('text-info font-weight-bold');
        setInfomsg("Registration successfull");
      })
      .catch(error => {
        setInfoColor('text-danger');
        setInfomsg(error)
      });
  }

  return (
    <>
      <a href="#signUp" className="trigger-btn text-danger font-weight-bold" data-toggle="modal">Register</a>
      <div id="signUp" className="modal fade">
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <form method="post" onSubmit={onSubmitForm}>
              <div className="modal-header">
                <h4 className="modal-title">Login</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="Full name" ref={(input) => fullname = input} required="required" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" placeholder="Email" ref={(input) => email = input} required="required" />
                </div>
                <div className="form-group">
                  <div className="clearfix">
                    <label>Password</label>
                  </div>
                  <input type="password" className="form-control" placeholder="Password" ref={(input) => password = input} required="required" />
                </div>
              </div>
              <div className="modal-footer">
                <span className={`pull-left ${infoColor}`}>{infoMsg}</span>
                <input type="submit" className="btn btn-primary pull-right" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;