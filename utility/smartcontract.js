export const address = "0x8bd126632b72715929B1FE7DaF1Ea92BD7D8d3B8";
export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_created_at",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_signed_at",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hashed",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_detail",
				"type": "string"
			}
		],
		"name": "create",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deleteAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_signed_at",
				"type": "string"
			}
		],
		"name": "sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contracts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "created_at",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "signed_at",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hashed",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "detail",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isSigned",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numberOfContract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveAll",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "created_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "signed_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashed",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "detail",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isSigned",
						"type": "bool"
					}
				],
				"internalType": "struct openThaiContract.Contract[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrievePending",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "created_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "signed_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashed",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "detail",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isSigned",
						"type": "bool"
					}
				],
				"internalType": "struct openThaiContract.Contract[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveSigned",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "created_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "signed_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashed",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "detail",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isSigned",
						"type": "bool"
					}
				],
				"internalType": "struct openThaiContract.Contract[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userToContractID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wave",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]