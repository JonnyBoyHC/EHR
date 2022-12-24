'use strict';
// Creating Web3 Instance
import Web3 from 'web3';
// Importing Contract Details
import {
  ACAbi as abi,
  ACAddr as contractAddr,
  coinbaseAddr,
  // node_ip_http as node,
  node_ip_ws as node_ws,
} from './chain0SecDetails109.js';

let args = process.argv.slice(2);

// import Web3WsProvider from 'web3-providers-ws';
// // const Web3WsProvider = require('web3-providers-ws');
// // const web3 = new Web3WsProvider('ws://192.168.191.109:8543', options);
// const options = {
//   timeout: 30000, // ms

//   // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
//   headers: {
//     authorization: 'mpuc:cloudcom1234',
//   },

//   clientConfig: {
//     // Useful if requests are large
//     maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
//     maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

//     // Useful to keep a connection alive
//     keepalive: true,
//     keepaliveInterval: 60000, // ms
//   },

//   // Enable auto reconnection
//   reconnect: {
//     auto: true,
//     delay: 5000, // ms
//     maxAttempts: 5,
//     onTimeout: false,
//   },
// };

const web3 = new Web3(node_ws);

// Creating instance connection to the chain
export const init = async () => {
  // Creating connection to the node
  // const web3 = new Web3(node);
  // const web3 = new Web3.setProvider('ws://192.168.191.109:8543');

  // web3.setProvider('ws://localhost:8543');
  // Creating connection to the contract
  const contractAccess = new web3.eth.Contract(abi, contractAddr);
  // Requesting to Read from chain
  const result = await contractAccess.methods
    .isDoctor('0x28ef6f1EB6DF3F90A8C9Fe3b7E48C1905105E8E9')
    .call({ from: coinbaseAddr });

  console.log(result);
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
