import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Tutoriais extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={style}>
          <AppBar
             style={{backgroundColor: '#63347f'}}
             title="Tutoriais"
           />
           <br/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  textAlign : 'center',
};

export default Tutoriais;