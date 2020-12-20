import { Component } from 'react';
// import Directory from './Directory'
import './Directory.css';

class Directory extends Component{

    constructor(props){
      super(props)
        this.state={
          
        }
      }
    
    render(){
        return(
            <div className="Directory-Parent">
                <div className="Directory">
                    <h4>#Directory</h4>
                </div>
            </div>
        )
    }
}

export default Directory;