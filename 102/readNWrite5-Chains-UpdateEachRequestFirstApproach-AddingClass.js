'use strict';
import fs from 'fs';
import xlsx from 'xlsx';
// Opening log file
let wb = xlsx.readFile('./readNWrite4-Chains.xlsx');
let ws = wb.Sheets['Sheet1'];

let args = process.argv.slice(2);
let startNo = args[0];
let stopNo = args[1];

// Creating Web3 Instance
import Web3 from 'web3';
// Importing Contract Details
import {
  admStrCtrlAbi as abi102,
  admStrCtrl as contractAddr102,
  coinbaseAddr as coinbaseAddr102,
  node_ip_port as node102,
} from './storageDetails102.js';

import {
  admStrCtrlAbi as abi103,
  admStrCtrl as contractAddr103,
  coinbaseAddr as coinbaseAddr103,
  node_ip_port as node103,
} from '../103/storageDetails103.js';

import {
  admStrCtrlAbi as abi104,
  admStrCtrl as contractAddr104,
  coinbaseAddr as coinbaseAddr104,
  node_ip_port as node104,
} from '../104/storageDetails104.js';

import {
  admStrCtrlAbi as abi105,
  admStrCtrl as contractAddr105,
  coinbaseAddr as coinbaseAddr105,
  node_ip_port as node105,
} from '../105/storageDetails105.js';

import {
  admStrCtrlAbi as abi106,
  admStrCtrl as contractAddr106,
  coinbaseAddr as coinbaseAddr106,
  node_ip_port as node106,
} from '../106/storageDetails106.js';

// Sleep Function
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
console.log('Total Patients: ', +stopNo + 1 - +startNo);

class Web3Connection {
  constructor(nodeIP, abi, contractAddr, coinbaseAddr) {
    this.coinbaseAddr = coinbaseAddr;
    this.web3 = new Web3(nodeIP);
    this.contractAccess = new this.web3.eth.Contract(abi, contractAddr);
  }

  async accessNetwork(_subjectID) {
    return await this.contractAccess.methods.getAllRecords(_subjectID).call({ from: this.coinbaseAddr });
  }

}

const init = async () => {

  const beginTimeStamp = new Date().getTime();
  console.log(`Beginning TimeStamp: ${beginTimeStamp}\n`);

  const network102 = new Web3Connection(node102, abi102, contractAddr102, coinbaseAddr102);
  const network103 = new Web3Connection(node103, abi103, contractAddr103, coinbaseAddr103);
  const network104 = new Web3Connection(node104, abi104, contractAddr104, coinbaseAddr104);
  const network105 = new Web3Connection(node105, abi105, contractAddr105, coinbaseAddr105);
  const network106 = new Web3Connection(node106, abi106, contractAddr106, coinbaseAddr106);

  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log('####################################################################################');
    console.log('####################################################################################');
    console.log('Retrieving Patient ID: ', i);

    console.log('<<==========================<<   103   >>==========================>>');
    const startReadingTime103 = new Date().getTime();
    console.log(`Start Reading 103 TimeStamp: ${startReadingTime103}\n`);

    const result102 = await network102.accessNetwork(args[i]);
    console.log('Total Records on 102: ', result102);


    const result103 = [await network103.accessNetwork(args[i])];
    console.log('Total Records on 103: ', result103, '\n');


  }

  console.log('Done!!!\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });