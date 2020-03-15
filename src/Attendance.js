
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
      },
      Abhishek:false,
      Anvitha:false,
      Asritha:false,
      Nithesh:false,
      Vamsi:false,
      Aditi:false,
      Thushara:false,
      Nayana:false,
      Sayannah:false,
      Gayathri:false
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
    
    if(this.state.errors.erroravail == 0 && validateForm(this.state.errors) && !(this.state.fullName=='' || this.state.eventfullName==''||this.state.email==''||this.state.location==''||this.state.hrs=='')&&this.state.fullName.length>5) {
      console.log('Valid Form')
      console.log(this.state.fullName)
      fetch('http://localhost:3001/attendance',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          Abhishek:this.state.Abhishek,
          Anvitha:this.state.Anvitha,
          Asritha:this.state.Asritha,
          Nithesh:this.state.Nithesh,
          Vamsi:this.state.Vamsi,
          Aditi:this.state.Aditi,
          Thushara:this.state.Thushara,
          Nayana:this.state.Nayana,
          Sayannah:this.state.Sayannah,
          Gayathri:this.state.Gayathri
        
        })
        }).then(res=> res.json())
        .then(data=>{this.setState({response:JSON.parse(data)},function(){console.log(this.state)})})
        .catch(err=>console.log(err))


    }else{
      console.error('Invalid Form')
      alert("Fill all details/Rectify Errors")
    }
  }

  handleClick = (e) =>{
    const r=[e.target.name]
    var s=r[0]
    this.state[s]=!this.state[s]
    console.log(this.state)
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
              <input type='text' name='eventfullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            
            
            <div className='email'>
              <label htmlFor="department">Department</label>
              <select name="choicedept">
                <option value="Mechanical">Mechanical</option>
                <option value="CSE" >CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
            <div>
              <div className='email'><label htmlFor="">UPLOAD</label></div>
            {/* <table>
              <tr>
                <th>Students</th>
                <th>Present/Absent</th>
              </tr>
              <tr>
                <td>1)Abhishek</td>
                <td><input id='1' type="checkbox" name="Abhishek" onClick={(e)=>this.handleClick(e)}/></td>
              </tr>
              <tr>
                <td>2)Anvitha</td>
                <td><input id='2' type="checkbox" name="Anvitha"  onClick={(e)=>this.handleClick(e)}/></td>
              </tr>
              <tr>
                <td>3)Nithesh</td>
                <td><input id='3' type="checkbox" name="Nithesh"  onClick={(e)=>this.handleClick(e)}/></td>
              </tr>
              <tr>
                <td>4)Vamsi</td>
                <td><input id='4' type="checkbox" name="Vamsi"  onClick={(e)=>this.handleClick(e)}/></td>
              </tr>
              <tr>
                <td>5)Thushara</td>
                <td><input id='5' type="checkbox" name="Thushara"  onClick={(e)=>this.handleClick(e)}/></td>
              </tr>
              <tr>
                <td>6)Aditi</td>
                <td><input type="checkbox" name="Aditi"  onClick={(e)=>this.handleClick(e)}/></td>
              </tr>
              <tr>
                <td>7)Nayana</td>
                <td><input type="checkbox" name="Nayana" onClick={(e)=>this.handleClick(e)} /></td>
              </tr>
              <tr>
                <td>8)Asritha</td>
                <td><input type="checkbox" name="Asritha" onClick={(e)=>this.handleClick(e)} /></td>
              </tr>
              <tr>
                <td>9)Sayannah</td>
                <td><input type="checkbox" name="Sayannah" onClick={(e)=>this.handleClick(e)} /></td>
              </tr>
              <tr>
                <td>10)Gayathri</td>
                <td><input type="checkbox" name="Gayathri" onClick={(e)=>this.handleClick(e)} /></td>
              </tr>
            </table>
            
     */
     }
                

            </div>

            <div className='submit'>
              <button onClick={this.handleAttendance}>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Attendance;

