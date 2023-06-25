pragma solidity >=0.5.8;

contract Factory {

    mapping(uint=>address) public userToContract;
    function add(uint i,address a) public {
        userToContract[i]=a;
    }
    function retrieve(uint i) public view returns(address){
        return userToContract[i];
    }



}
