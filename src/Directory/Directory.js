import { Component } from 'react';
// import Directory from './Directory'
import './Directory.css';
import Monaco from '../Monaco/index'
import url, { modifyUrl } from '../url'
import SubDirectory from './SubDirectory'

class Directory extends Component{

    constructor(props){
      super(props)
        this.state={
          name:"directory",
          id:"",
          data:"",
          subdirectories:""
        }
      }
    goto=()=>{
        var data={"directory":this.state.id}
        var new_url = modifyUrl(data)
        window.history.replaceState(null, "New Page Title", new_url)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props!=prevProps){
            var subdirectories=this.props.subdirectories
        var count = subdirectories.length
        
        var arr=[]
        for(var i = 0 ; i < count ; i++){
            var subdirectory = <SubDirectory subdirectory_id={subdirectories[i]._id} directory_id={this.props.id} data = {subdirectories[i]} changeSubdirectory={this.props.changeSubdirectory} />
            arr.push(subdirectory)
        }

         this.setState({
             "name":this.props.name,
             "id":this.props.id,
             "data":this.props.data,
             "subdirectories":arr
         })
        }
    }
    componentDidMount=()=>{
        
        var subdirectories=this.props.subdirectories
        var count = subdirectories.length
        
        var arr=[]
        for(var i = 0 ; i < count ; i++){
            var subdirectory = <SubDirectory subdirectory_id={subdirectories[i]._id} directory_id={this.props.id} data = {subdirectories[i]} changeSubdirectory={this.props.changeSubdirectory} />
            arr.push(subdirectory)
        }

         this.setState({
             "name":this.props.name,
             "id":this.props.id,
             "data":this.props.data,
             "subdirectories":arr
         })
    }
    render(){
        return(
            <div className="Directory-Parent" onClick={this.goto}>
                <div id={this.props.directory_id} className="Directory">
                    <h4>#{this.state.name}</h4>
                </div>
               
                {this.state.subdirectories}
            </div>
        )
    }
}

export default Directory;