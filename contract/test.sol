pragma solidity >=0.5.8;

contract Demo {
    event Echo(string message);

    function echo(string calldata message) external {
        emit Echo(message);
    }

uint rent;


    function pay_rent() public payable {
        require(msg.value >= rent);
        uint excess = msg.value - rent;
        if (excess > 0) 
        payable(msg.sender).transfer(excess);
    }

}


