
export function modifyUrl(data){
    //get base url
    var base_url=window.location.origin
    
    //get complete url
    var url = window.location.search

    //get url parameters
    const urlParams = new URLSearchParams(url);
    
    //change url parameters
    if(data.project_id){
        urlParams.set("project_id",data.project_id)
    }
    if(data.directory){
        urlParams.set("directory",data.directory)
    }
    if(data.subdirectory){
        urlParams.set("subdirectory",data.subdirectory)
    }

    //return the new url
    var newUrl=base_url+'/?'+urlParams.toString()
    return newUrl
}

export function getParam(data){
    var url = window.location.search

    const urlParams = new URLSearchParams(url)

    return urlParams.get(data)
}