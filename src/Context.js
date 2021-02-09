import React,{Component} from 'react';
export const Context  = React.createContext();

export const ContextProvider=(props)=>{
    var object = {
        code:"user code...",

        setCode : function(data){
            this.code=data;
        },

        getCode : function(){
            return this.code;
        }
    }
    
    return(
        <Context.Provider value={object}>
            {props.children}
        </Context.Provider>
    )
}

