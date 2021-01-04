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
    componentDidMount=()=>{
        // var directory = this.props.directory
        // console.log(this.props.id)
        // var name = directory.name
        
        var subdirectories=this.props.data.subdirectories
        var count = subdirectories.length

        var arr=[]
        for(var i = 0 ; i < count ; i++){
            var subdirectory = <SubDirectory data = {subdirectories[i]} />
            arr.push(subdirectory)
        }

         this.setState({
             "name":this.props.name,
             "id":this.props.id,
             "data":this.props.data,
             "subdirectories":arr
         })
        // var url = window.location.search
        
        // const urlParams = new URLSearchParams(url);
        // const subdirectory = urlParams.get('subdirectory')
        // console.log("sub"+subdirectory)
    }
    render(){
        return(
            <div className="Directory-Parent" onClick={this.goto}>
                <div className="Directory">
                    <h4>#{this.state.name}</h4>
                </div>
               
                {this.state.subdirectories}
            </div>
        )
    }
}

export default Directory;