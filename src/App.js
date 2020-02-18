import React from 'react';
import './App.css';
import Adding from './Adding';

import Attendance from './Attendance';
import EventCoordinatorNotif from './EventCoordinatorNotif';
import Deleting from './Deleting';
import Modify from './Modify';
class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      no: 0,
    };
   }

  handleChange = e => {
    e.preventDefault();
    const {name} = e.target;
    switch (name) {
      case 'insertion':
          this.setState({no: 1});
        break;
      case 'deletion':
          this.setState({no: 2});
        break;
      case 'listing':
          this.setState({no: 4});
          break;
        case 'attendance':
            this.setState({no: 5});
            break;
        case 'notify':
              this.setState({no: 6});
              break;
      default:
        break;
    }
  }


  render(){
    if(this.state.no===0){
      return (
        <div>
          
        <div className='bar'><center>
         
        <h1>                      Guest Lecture Management              </h1></center>
        </div>
        <div className='w'>
        <div className='insertion'>
          <button className='but one myButton' name='insertion' onClick={this.handleChange}>Add a Guest Lecture</button>
        </div>
        <div className='deletion'>
          <button className='but two myButton' name='deletion' onClick={this.handleChange}>Delete an event</button>
        </div>
        <div className='listing'>
          <button className='but three myButton' name='listing' onClick={this.handleChange}>Modify an event</button>
        </div>
        <div className='listing'>
          <button className='but four myButton' name='attendance' onClick={this.handleChange}>Take Attendance</button>
        </div>
        <div className='listing'>
          <button className='but five myButton' name='notify' onClick={this.handleChange}>Send Notifications</button>
        </div>
        </div>
        </div>
     
      )}
    if(this.state.no===1){
      return (<Adding />);
    }
    if(this.state.no===2){
      return (<Deleting />);
    }
    if(this.state.no===4){
      return (<Modify />);
    }
    if(this.state.no===5){
      return (<Attendance />);
    }
    if(this.state.no===6){
      return (<EventCoordinatorNotif />);
    }
  }
}

export default App;
