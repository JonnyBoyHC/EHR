'use strict';
import fs from 'fs';
import xlsx from 'xlsx';
// Opening log file
let wb = xlsx.readFile('./readNWrite5-Chains.xlsx');
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

  compare2() {
    let forDeletion = [];
    if (this.list1.length !== 0) {
      for (var x = 0; x < this.list1.length; x++) {
        for (var y = 0; y < this.list2.length; y++) {
          if (JSON.stringify(this.list1[x]) === JSON.stringify(this.list2[y])) {
            forDeletion.push(this.list1[x]);
          }
        }
      }

      this.finalResults = this.list1.filter((item) => !forDeletion.includes(item));

      if (this.finalResults.length === 0) {
        this.finalResults = this.list1;
      }
    } else if (this.list2.length !== 0) {
      for (var x = 0; x < this.list2.length; x++) {
        for (var y = 0; y < this.list1.length; y++) {
          if (JSON.stringify(this.list2[x]) === JSON.stringify(this.list1[y])) {
            forDeletion.push(this.list2[x]);
          }
        }
      }

      this.finalResults = this.list2.filter((item) => !forDeletion.includes(item));

      if (this.finalResults.length === 0) {
        this.finalResults = this.list2;
      }
    } else {
      return this.finalResults = [];
    }
    return this.finalResults;
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
const network104 = new Web3Connection(node104, abi104, contractAddr104, coinbaseAddr104);
const network105 = new Web3Connection(node105, abi105, contractAddr105, coinbaseAddr105);
const network106 = new Web3Connection(node106, abi106, contractAddr106, coinbaseAddr106);

const init = async () => {

  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log('####################################################################################');
    console.log('####################################################################################');
    console.log('Retrieving Patient ID: ', i);

    console.log(`<<==========================<< 103 -- > Patient ID: ', ${i}  >>==========================>>`);
    console.log(`Start Reading 102 TimeStamp: ${network102.readingTime()}`);
    const result102 = await network102.accessNetwork(i);

    console.log(`Start Reading 103 TimeStamp: ${network103.readingTime() - network102.startReadingTime}`);
    const result103 = await network103.accessNetwork(i);

    console.log(`Start Reading 104 TimeStamp: ${network104.readingTime() - network103.startReadingTime}`);
    const result104 = await network104.accessNetwork(i);

    console.log(`Start Reading 105 TimeStamp: ${network105.readingTime() - network104.startReadingTime}`);
    const result105 = await network105.accessNetwork(i);

    console.log(`Start Reading 106 TimeStamp: ${network106.readingTime() - network105.startReadingTime}`);
    const result106 = await network106.accessNetwork(i);

    console.log('<<=====================<<   Comparing...   >>=====================>>');
    const comparison32 = new Comparison(result103, result102);
    console.log(`Start Comparing TimeStamp: ${comparison32.comparingTime()}`);
    comparison32.compare()
    console.log(comparison32.results);

    const comparison42 = new Comparison(result104, result102);
    console.log(`Start Comparing TimeStamp: ${comparison42.comparingTime()}`);
    comparison42.compare()
    console.log(comparison42.results);

    const comparison52 = new Comparison(result105, result102);
    console.log(`Start Comparing TimeStamp: ${comparison52.comparingTime()}`);
    comparison52.compare()
    console.log(comparison52.results);

    const comparison62 = new Comparison(result106, result102);
    console.log(`Start Comparing TimeStamp: ${comparison62.comparingTime()}`);
    comparison62.compare()
    console.log(comparison62.results);

    const comparison432 = new Comparison(comparison32.results, comparison42.results);
    console.log(`Start Comparing TimeStamp: ${comparison432.comparingTime()}`);
    comparison432.compare2()
    console.log(comparison432.finalResults);

    const comparison652 = new Comparison(comparison52.results, comparison62.results);
    console.log(`Start Comparing TimeStamp: ${comparison652.comparingTime()}`);
    comparison652.compare2()
    console.log(comparison652.finalResults);

    const comparison65432 = new Comparison(comparison432.finalResults, comparison652.finalResults);
    console.log(`Start Comparing TimeStamp: ${comparison65432.comparingTime()}`);
    comparison65432.compare2()
    console.log(comparison65432.finalResults);

    console.log('<<=======================<<   Writing...   >>=======================>>');

    const startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (comparison65432.finalResults.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < comparison65432.finalResults.length; j++) {
      console.log(comparison65432.finalResults[j].HadmID);
      network102.contractAccess.methods
        .addNewPatient(i, [
          +comparison65432.finalResults[j].HadmID,
          +comparison65432.finalResults[j].AdmitTime,
          +comparison65432.finalResults[j].DischTime,
          +comparison65432.finalResults[j].DeathTime,
          comparison65432.finalResults[j].Admission_Type,
          comparison65432.finalResults[j].Admission_Location,
          comparison65432.finalResults[j].Discharge_Location,
          comparison65432.finalResults[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }

    let endTimeStamp = new Date().getTime();
    console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
    let timeDifference = endTimeStamp - network102.startReadingTime;
    console.log(`Time Differences: ${timeDifference}\n`);
    console.log(`Total Number of Records to write: ${comparison65432.finalResults.length}\n`);

    // Writing to log file
    let newRow = [
      [
        i,
        network102.startReadingTime,
        network103.startReadingTime,
        network104.startReadingTime,
        network105.startReadingTime,
        comparison32.startComparingTime,
        startWritingTime,
        endTimeStamp,
        timeDifference,
        comparison65432.finalResults.length,
      ],
    ];

    xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
  }
  xlsx.writeFile(wb, './readNWrite5-Chains.xlsx');

  console.log('Done!!!\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });