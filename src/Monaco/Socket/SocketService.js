
import {ENDPOINT} from '../../serverEndpoint';
import socketIOClient from "socket.io-client";

// var socket = io(url, {transports: ['websocket', 'polling', 'flashsocket']});
export const socket = socketIOClient(ENDPOINT);

   
  //  function gets triggered when subdirectory changes
  //  function starts listening to the socket
export function startSocket(){
    this.listenSocket();
  }

  export function emitJoinRoomEvent(channel){
    // join the current active room
    socket.emit("join_room",channel);
  }
   

  export function emitCode(data){
    socket.emit("code", data);
  }

  export function connectSocket(){
    socket.connect();
  }

  //  function gets triggered when subdirectory changes
  //  function stops listening to the socket
  export function turnOffSocket(){
    socket.disconnect() 
    socket.off();
  }

  export function emitCoordinates(data){
    socket.emit("coordinates", data);
  }
