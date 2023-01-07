'use strict';
import fs from 'fs';
import xlsx from 'xlsx';
// Opening log file
let wb = xlsx.readFile('./readNWrite2-Chains.xlsx');
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

  readingTime = () => {
    return this.startReadingTime = new Date().getTime();
  }
}

class Comparison {
  constructor(list1, list2) {
    this.list1 = list1;
    this.list2 = list2;
  }

  compare() {
    // let results = [];
    let forDeletion = [];
    for (let i = 0; i < this.list1.length; i++) {
      for (let j = 0; j < this.list2.length; j++) {
        if (JSON.stringify(this.list1[i]) === JSON.stringify(this.list2[j])) {
          forDeletion.push(this.list1[i]);
        }
      }
    }
    return this.results = this.list1.filter((item) => !forDeletion.includes(item));
  }

  comparingTime = () => {
    return this.startComparingTime = new Date().getTime()
  }

  writingTime = () => {
    return this.startWritingTime = new Date().getTime()
  }
}

const beginTimeStamp = new Date().getTime();
console.log(`Beginning TimeStamp: ${beginTimeStamp} \n`);

const network102 = new Web3Connection(node102, abi102, contractAddr102, coinbaseAddr102);
const network103 = new Web3Connection(node103, abi103, contractAddr103, coinbaseAddr103);

const init = async () => {

  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log('####################################################################################');
    console.log('####################################################################################');
    console.log('Retrieving Patient ID: ', i);

    console.log(`<<==========================<< 103 -- > Patient ID: ', ${i}  >>==========================>>`);
    console.log(`Start Reading 102 TimeStamp: ${network102.readingTime()}`);
    const result102 = await network102.accessNetwork(i);

    console.log(`Start Reading 103 TimeStamp: ${network103.readingTime()}`);
    const result103 = await network103.accessNetwork(i);

    console.log('<<=====================<<   Comparing...   >>=====================>>');
    const comparison32 = new Comparison(result103, result102);
    console.log(`Start Comparing TimeStamp: ${comparison32.comparingTime()}`);
    comparison32.compare()
    console.log(comparison32.results);

    console.log('<<=======================<<   Writing...   >>=======================>>');

    const startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (comparison32.results.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < comparison32.results.length; j++) {
      console.log(comparison32.results[j].HadmID);
      network102.contractAccess.methods
        .addNewPatient(i, [
          +comparison32.results[j].HadmID,
          +comparison32.results[j].AdmitTime,
          +comparison32.results[j].DischTime,
          +comparison32.results[j].DeathTime,
          comparison32.results[j].Admission_Type,
          comparison32.results[j].Admission_Location,
          comparison32.results[j].Discharge_Location,
          comparison32.results[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }

    let endTimeStamp = new Date().getTime();
    console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
    let timeDifference = endTimeStamp - network102.startReadingTime;
    console.log(`Time Differences: ${timeDifference}\n`);
    console.log(`Total Number of Records to write: ${comparison32.results.length}\n`);

    // Writing to log file
    let newRow = [
      [
        i,
        network102.startReadingTime,
        network103.startReadingTime,
        comparison32.startComparingTime,
        startWritingTime,
        endTimeStamp,
        timeDifference,
        comparison32.results.length,
      ],
    ];

    xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
  }
  // xlsx.writeFile(wb, './readNWrite2-Chains.xlsx');

  console.log('Done!!!\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });