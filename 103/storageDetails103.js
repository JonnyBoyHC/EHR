// Node IP and port no
export const node_ip_port = 'http://192.168.191.103:8545';

// User Account Address
export const coinbaseAddr = '0x1cfE18476d6811c17E135958937353D907e8d389';

// Contract Address
export const storageAddr = '0x2A8426d51E2C022d4631B0A519669a2C02B8bb29';

// Access Control Address
export const ACAddr = '0x65a583CB7CCe4FF07215BE0a89E2117F5C73E36A';

// Admission Storage Control
export const admStrCtrl = '0x87B6615C1Bc90132043D5F8f7c81D7cd0830cc0D';

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

export const acAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "checkDocClrLvl",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "checkObjClrLvl",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "isDoctor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "mustBeInternalDoc",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "setDoc2Active",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_clrLvl",
				"type": "bytes32"
			}
		],
		"name": "setMsgSenderClrLvl",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "setNewDoc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_ClrLvl",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_GrpOrg",
				"type": "bytes32"
			}
		],
		"name": "setNewDocClrRec",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_objAddr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_clrLvl",
				"type": "bytes32"
			},
			{
				"internalType": "enum Access_Control.ClearenceLevel",
				"name": "_clr",
				"type": "uint8"
			}
		],
		"name": "setNewObjClr",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleDocActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleDoctors",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const admStrCtrlAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_AccesssControlAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_AdmStrgAddr",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_subjectID",
				"type": "uint16"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "HadmID",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "AdmitTime",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "DischTime",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "DeathTime",
						"type": "int256"
					},
					{
						"internalType": "bytes32",
						"name": "Admission_Type",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Admission_Location",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Discharge_Location",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Insurance",
						"type": "bytes32"
					}
				],
				"internalType": "struct IStrgAccess.PatientRecords",
				"name": "addPnt",
				"type": "tuple"
			}
		],
		"name": "addNewPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_subjectID",
				"type": "uint256"
			}
		],
		"name": "getAllRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "HadmID",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "AdmitTime",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "DischTime",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "DeathTime",
						"type": "int256"
					},
					{
						"internalType": "bytes32",
						"name": "Admission_Type",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Admission_Location",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Discharge_Location",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Insurance",
						"type": "bytes32"
					}
				],
				"internalType": "struct IStrgAccess.PatientRecords[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_subjectID",
				"type": "uint256"
			}
		],
		"name": "getLatestOneRec",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "HadmID",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "AdmitTime",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "DischTime",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "DeathTime",
						"type": "int256"
					},
					{
						"internalType": "bytes32",
						"name": "Admission_Type",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Admission_Location",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Discharge_Location",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "Insurance",
						"type": "bytes32"
					}
				],
				"internalType": "struct IStrgAccess.PatientRecords",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
