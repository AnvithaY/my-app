
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';


class Adding extends Component {
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
    (val) => val.length > 0
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

    this.setState({errors, [name]: value},function(){console.log(this.state)});
  }
  
  /*handleDelete = (event) => {
    event.preventDefault();
    
    if(validateForm(this.state.errors))// && !(this.state.fullName=='' || this.state.eventfullName==''||this.state.email==''||this.state.location==''||this.state.hrs=='')) {
      {console.info('Valid Form')
      console.log(this.state.fullName)
      fetch('http://localhost:3001/del',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            fullName:"Anvitha Yathigiri",
            
        })
        }).then(res=> res.json())
        .then(data=>{this.setState({response:JSON.parse(data)},function(){console.log(this.state)})})
        .catch(err=>console.log(err))


    }else{
      console.error('Invalid Form')
      alert("Fill all details")
    }
  }*/


  // fullName,email,location,date,hrs,choicedept
  handleSubmit = (event) => {
    event.preventDefault();
    
    if(validateForm(this.state.errors) && !(this.state.fullName=='' || this.state.eventfullName==''||this.state.email==''||this.state.location==''||this.state.hrs=='')) {
      console.info('Valid Form')
      console.log(this.state.fullName)
      fetch('http://localhost:3001/addtoDB',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            fullName:this.state.fullName,
            eventfullName:this.state.eventfullName,
            email:this.state.email,
            location:this.state.location,
            date:this.state.date,
            hrs:this.state.hrs,
            choicedept:this.state.choicedept
        })
        }).then(res=> res.json())
        .then(data=>{this.setState({response:JSON.parse(data)},function(){console.log(this.state)})})
        .catch(err=>console.log(err))


    }else{
      console.error('Invalid Form')
      alert("Fill all details")
    }
  }
// fullName,email,location,date,hrs,choicedept
  render() {
    const {errors} = this.state;
    return (<center>
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Adding a Guest Lecture</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName"> Name</label>
              <input type='text' name='fullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='email'>
              <label htmlFor="eventname">Event Name</label>
              <input type='text' name='eventfullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            <label className='email' >VENUE</label>
            <div className='email'>
              <label htmlFor="location">Location</label>
              <input type="text" name="location" onChange={this.handleChange}/>
            </div>
            <div className='email'>
              <label htmlFor="date">Date</label>
              <input type="date" name="date" onChange={this.handleChange}/>
            </div>      
            <div className='email'>
              <label htmlFor="hours">Hours Allocated</label>
              <input type="number" name="hrs" onChange={this.handleChange}/>
            </div>
            <div className='email'>
              <label htmlFor="department">Department</label>
              <select name="choicedept" onChange={this.handleChange}>
                <option value="Mechanical">Mechanical</option>
                <option value="CSE" >CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
            <div>
              <label htmlFor=""></label>
            </div>
            <div className='submit'>
              <button>ADD</button>
            </div>
          </form>
          
         

        </div>
      </div></center>
    );
  }
}
export default Adding;
