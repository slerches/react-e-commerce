import React from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { stat } from 'fs';

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userprofile: {},
      msg: ''
    }
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  customer_id = "";
  name = "";
  email = "";
  day_phone = "";
  eve_phone = "";
  mob_phone = "";
  accessToken = ''

  onSubmitForm() {
    alert("Yeah");
  }

  onSubmitForm(e) {
    e.preventDefault();
    // const data = new URLSearchParams();
    // for (const pair of new FormData(formElement)) {
    //   data.append(pair[0], pair[1]);
    // }
    console.log(this.accessToken);

    const formData = new URLSearchParams(new FormData(document.getElementById('userP')));
    fetch('https://backendapi.turing.com/customer', {
      method: 'PUT',
      body: formData,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.accessToken
      }
    }).then(response => response.json())
      .then(data => {
        this.props.onSetUserInfo(data);
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    let customer = this.props.customer;
    this.customer_id = customer.customer_id;
    this.name.value = customer.name;
    this.email.value = customer.email;
    this.day_phone.value = customer.day_phone;
    this.eve_phone.value = customer.eve_phone;
    this.mob_phone.value = customer.mob_phone;
    this.accessToken = this.props.accessToken;
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmitForm} id="userP">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Customer Name</label>
              <input type="text" ref={(ref) => this.name = ref} className="form-control" name="name" id="name" placeholder="Full name" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" ref={(ref) => this.email = ref} className="form-control" name="email" id="email" placeholder="Email" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input type="password" ref={(ref) => this.password = ref} className="form-control" name="password" id="password" placeholder="Password" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="day_phone">Day Phone</label>
              <input type="tel" ref={(ref) => this.day_phone = ref} className="form-control" name="day_phone" id="day_phone" placeholder="Your day phone" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="eve_phone">Evening Phone</label>
              <input type="tel" ref={(ref) => this.eve_phone = ref} className="form-control" name="eve_phone" id="eve_phone" placeholder="Your evening phone" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="mob_phone">Mobile Phone</label>
              <input type="tel" ref={(ref) => this.mob_phone = ref} className="form-control" name="mob_phone" id="mob_phone" placeholder="Your mobile phone" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    customer: state.userInfo.customer,
    accessToken: state.userInfo.accessToken
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onSetUserInfo: (user) => {
      dispatch({ type: 'SET_USER_INFO', payload: user });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);