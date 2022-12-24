// Node IP and port no
export const node_ip_port = 'http://192.168.191.104:8545';

// User Account Address
export const coinbaseAddr = '0x2429760656F8BCDc6B1827a9b1CF233A5C7E87BD';

// Contract Address
export const storageAddr = '0x04daEb41D1986c8F295572Af7EF9Ee532d8A45b4';

// Contract abi
export const storageAbi = [
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_subjectID',
        type: 'uint16',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HadmID',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'AdmitTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DischTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DeathTime',
            type: 'int256',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Type',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Discharge_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Insurance',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Admission_Storage.PatientRecords',
        name: 'addPnt',
        type: 'tuple',
      },
    ],
    name: 'addPatient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_subjectID',
        type: 'uint256',
      },
    ],
    name: 'getAllRecords',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HadmID',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'AdmitTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DischTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DeathTime',
            type: 'int256',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Type',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Discharge_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Insurance',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Admission_Storage.PatientRecords[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_subjectID',
        type: 'uint256',
      },
    ],
    name: 'getLatestOneRec',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HadmID',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'AdmitTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DischTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DeathTime',
            type: 'int256',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Type',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Discharge_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Insurance',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Admission_Storage.PatientRecords',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
