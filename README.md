# Master Thesis: decentralized application for signing and enforcing legal contract (concept Demo not for production)
[MasterThesisPDF](/thesis.pdf)
I developed this project as part of my master thesis. This application allows users to creat and sign contracts or documents online with their decentralized identity (DID) signature such as Bitcoin or Ethereum private key. The signer can extracted information from their decentralized digital ID, i.e. verifiable credential (VC), and insert it into the contract. While the document itself is never exposed to the public, the information inside the contract and the signed signature can still be verified and authenticated by anyone directly from the blockchain. Once the contract is signed, the terms of the contract are translated into smart contract and deployed to Ethereum blockchain for enforcement. For more information, refer to the pdf file link aboved.

## example use case : LEASE AGREEMENT
scenario: The tenant want to rent the aparment.
### prerequisite for both party
1. The tenant and the landlord must have created their decentralized identity on one blockchain of their choice. (For our project, we support DIDs from ION, a layer 2 Bitcoin blockchain)
2. The tenant and the landlord should obtained the Verifiable credentials from the trusted issuer, for example, national ID in digital format operated on a blockchain by the goverment. Note that this verifiable credential must be issued to the decentralized identity that they use.
### signing
1. Both parties upload their Verifiable credentials to the application (our demo only support VC from microsoft entra)
2. The application will validated these verifiable credentials with the issuer. If verified, it can be insert into the contract.
3. For example, if the tenant uses their national ID verifiable credential, then he can insert his date of birth into the contract document. 
4. Once both parties finish drafting the contract, the application will ask them to signed the contract with their decentralized identity private key.
5. The term of the contract, for example, lease duration, montly payment, deposite fee, etc., will be published on the Ethereum blockchain as a smart contract.
6. The tenant can pay the rent in cryptocurrency manually on the blockchain himself, or through our web application.
7. If the tenant can not fullfil the terms of the contract, the smart contract will forcefully terminate the contract and notify the landlord.

### INSTALLATION
```
git clone https://github.com/TaroAndMulan/VCsignAlpha.git
cd VCsignAlpha
npm install
```

### RUNNING

* Run the react project
```
npm run dev 
```

* SETUP NGROK SERVER from the terminal
```
ngrok http 8080
```

* Acces the application from the web browser through the ngrok url obtain above

```
> chrome/edge/fireforx/safari -> [ngrok_url]/ 
```



