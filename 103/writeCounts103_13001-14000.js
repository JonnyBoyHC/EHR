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

  for (let i = 13001; i <= 13050; i++) {
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
        let returnRequest = `
        HadmID: ${+results[i][j].HadmID}
        AdmitTime: ${new Date(+results[i][j].AdmitTime).toUTCString()}
        DischargeTime: ${new Date(+results[i][j].DischTime).toUTCString()}
        DeathTime: ${+results[i][j].DeathTime === 0
            ? 0
            : new Date(+results[i][j].DeathTime).toUTCString()
          }
        Admission Type: ${hexToAsciiConversion(results[i][j].Admission_Type)}
        Admission Location: ${hexToAsciiConversion(results[i][j].Admission_Location)}
        Discharge Location: ${hexToAsciiConversion(results[i][j].Discharge_Location)}
        Insurance: ${hexToAsciiConversion(results[i][j].Insurance)}\n`;
        console.log(returnRequest);

        // Writing to log file
        let newRow = [
          [i, beginEachTimeStamp, endEachTimeStamp, timeDifference],
        ];

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
