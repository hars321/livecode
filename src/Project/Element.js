
import { Component } from 'react';

import './Element.css';

class Element extends Component{

  constructor(props){
    super(props)
      this.state={
        'name':'name'
      }
    }
    truncate=(str)=>{
      let word= str.toUpperCase();
      word=word[0];
      return word
    }
  render(){
    return (
      <div className="Element-parent">
        <div className="Element">
          <div className="Element-image-circle" >
            <h3 className="Element-image" >{this.truncate(this.state.name)}</h3>
          </div>
        </div>      
      </div>

    )
  }
}

export default Element;
