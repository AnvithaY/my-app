
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class Deleting extends Component {
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
      fullName: '',
      eventfullName: '',
      email: '',
      location:'',
      date:'',
      hrs:'',
      choicedept:'',
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

  handleDelete = (event) => {
    event.preventDefault();
    
    if(validateForm(this.state.errors))// && !(this.state.fullName=='' || this.state.eventfullName==''||this.state.email==''||this.state.location==''||this.state.hrs=='')) {
      {console.info('Valid Form')
      console.log(this.state.fullName)
      fetch('http://localhost:3001/del',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            fullName:this.state.fullName
            
        })
        }).then(res=> res.json())
        .then(data=>{this.setState({response:JSON.parse(data)},function(){console.log(this.state)})})
        .catch(err=>console.log(err))


    }else{
      console.error('Invalid Form')
      alert("Fill all details")
    }
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
          <h2>Delate an event</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName"> Lecturer Name</label>
              <input type='text' name='fullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            
            <div className='email'>
              <label htmlFor="eventname">Event Name</label>
              <input type='text' name='eventfullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            
            
            <div className='email'>
              <label htmlFor="department">Department</label>
              <select name="choicedept">
                <option value="First">Mechanical</option>
                <option value="second" >CSE</option>
                <option value="third">EEE</option>
                <option value="third">ECE</option>
              </select>
            </div>
            <div>
              <label htmlFor=""></label>
            </div>
            <div className='submit'>
              <button onClick={this.handleDelete}>DELETE</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Deleting;
