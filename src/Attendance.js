
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class Attendance extends Component {
  render() {
    return (
      <Register />
    );
  }
}

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      errors: {
        fullName: '',
        email: '',
        password: '',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? ' Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      
        
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>ATTENDANCE</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            
            
            <div className='email'>
              <label htmlFor="eventname">Event Name</label>
              <input type='text' name='fullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            
            
            <div className='email'>
              <label htmlFor="department">Department</label>
              <select name="choice">
                <option value="First">Mechanical</option>
                <option value="second" >CSE</option>
                <option value="third">EEE</option>
                <option value="third">ECE</option>
              </select>
            </div>
            <div>
              <div className='email'><label htmlFor="">STUDENTS LIST</label></div>
            <ol>
                <li>Abhishek <input class="radio" type="radio"/></li>
                 <li>Anvitha <input  class="radio" type="radio"/></li>
                 <li>Nithesh <input  class="radio"type="radio"/></li>
                 <li>Vamsi <input  class="radio"type="radio"/></li>
                 <li>Thushara <input  class="radio"type="radio"/></li>
            </ol>
            </div>

            <div className='submit'>
              <button>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Attendance;

