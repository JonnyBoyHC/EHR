'use strict';
import xlsx from 'xlsx';
// const xlsx = require('xlsx');
// Opening log file
let wb = xlsx.readFile('./writeCounts103_13001-14000.xlsx');
let ws = wb.Sheets['Sheet1'];

// Creating Web3 Instance
import Web3 from 'web3';
// Importing Contract Details
import {
  admStrCtrlAbi as abi,
  admStrCtrl as contractAddr,
  coinbaseAddr,
  node_ip_port as node,
} from './storageDetails103.js';

const init = async () => {
  const web3 = new Web3(node);
  const contractAccess = new web3.eth.Contract(abi, contractAddr);

  // Variable Conversion
  let tempCvrt;
  function hexToAsciiConversion(hexi) {
    const tempPad = web3.utils.padRight(hexi, 64);
    tempCvrt = web3.utils.hexToAscii(tempPad);
    return tempCvrt;
  }

  let result = []
  let results = []

  let starting_ID = 13001
  let ending_ID = 14000

  for (let i = starting_ID; i <= ending_ID; i++) {
    // for (let i = 0; i <= 10; i++) {
    result = await contractAccess.methods
      .getAllRecords(i)
      .call({ from: coinbaseAddr });
    results.push(result)
    result = []
  }
  // console.log(results)

  // Printing results
  for (let i = 0; i < results.length; i++) {
    // console.log(results[i])

    if (results[i].length !== 0) {
      console.log(i)
      for (let j = 0; j < results[i].length; j++) {
        // console.log(results[i][j])
        // Writing to log file
        let newRow = [
          [starting_ID + i, +results[i][j].HadmID],
        ];
        console.log(newRow)

        xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
        xlsx.writeFile(wb, './writeCounts103_13001-14000.xlsx');
      }
    } else {
      console.log(i)
    }
  }



};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
