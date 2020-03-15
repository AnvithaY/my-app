import React,{Component} from 'react';

class Login extends Component {
  
constructor(props)
{

  super(props);
  this.state={
    name:'',
    rollno:''
  }
}

handleChange= (event) =>{
  event.preventDefault();
  const {name, value} = event.target;
this.setState({[name]:value});
console.log(this.state);
}

handleSubmit= (e)=>{
  e.preventDefault();
  if(this.state.name=="Marpu"&&this.state.password=="2")
  {
    alert("OK")
    this.props.changeno(0)
  }
  else{
    alert("WRONG USERNAME OR PASSWORD")
  }
}

  render(){
  return (
    <div className="App wrapper">
        <form className="form-wrapper" method='post' onSubmit={this.handleSubmit}>
        <h2>Login Page</h2>
            <div className='name'>
              <label htmlFor='name'>Enter Name:</label>
              <input type='text' name='name' onChange={this.handleChange}/>
            </div>
            <div className='rollno'>
              <label htmlFor='password'>Enter Password:</label>
              <input type='text' name='password' onChange={this.handleChange}/>
            </div> <br />
            <div className='submit' >
              <input type='submit'/>
            </div>            
        </form>               

     </div>
  );
}
}
export default Login;