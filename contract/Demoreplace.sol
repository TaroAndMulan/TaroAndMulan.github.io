pragma solidity >=0.5.8;

contract Demo {
    event Echo(string message);
    uint dog = <[1]> ;
    function echo(string calldata message) external {
        emit Echo(message);
    }
}