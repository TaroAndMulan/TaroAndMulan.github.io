pragma solidity >=0.5.8;

contract Lease {
    address payable tenant;
    address payable landlord;

    uint payDate;
    //0=startDate  1=interval 2=duration
    uint startDate;
    uint interval;
    uint duration;
    string public status;
    uint public paid;
    //3=rent 4=deposit 5=maxUnpaid 6=advanec
    uint rent;
    uint deposit;
    uint maxUnpaid;
    uint advance;

    constructor() {
        landlord = payable(msg.sender);
        startDate= block.timestamp;
        interval = 5 minutes;
        duration = 10;

        paid = 0;
        rent = 1 gwei;
        deposit = 2 gwei;
        maxUnpaid=0;
        advance = 0;

        if(advance>0 || deposit>0){
            status = "inactive";
        }
        else 
        status = "active";
    }

    function pay_rent() public payable {
        require(msg.value >= rent);
        uint excess = msg.value - rent;
        paid = paid + 1;
        if (paid==duration)
        setStatus("complete");
        if (excess > 0) 
        payable(msg.sender).transfer(excess);
    }

    function pay_deposit() public payable{
        require(msg.value>= deposit+rent*advance);
        paid = paid+advance;
        setStatus("active");
    }

    function automate() public {
        if (keccak256(abi.encodePacked(status))==keccak256(abi.encodePacked("active"))) {
            uint _paid = (block.timestamp - startDate) / interval;
            if (paid + maxUnpaid > _paid) {
                if (paid == duration) {
                    setStatus("complete");
                    tenant.transfer(address(this).balance);
                } else {
                    setStatus("active");
                }
                landlordwithdrawn();
            } else terminate();
        }
    }

    function setStatus(string memory _status) public {
        status = _status;
    }

    function getStatus() public view returns (string memory) {
        return status;
    }

    function nextDate(uint _date) public view returns (uint) {
        return _date + interval;
    }

    function iDate(uint i) public view returns (uint) {
        return startDate + (i - 1) * interval;
    }

    function terminate() internal {
        setStatus("TERMINATED, tenant failed to pay rent in time");
        landlord.transfer(address(this).balance);
    }

    function landlordwithdrawn() public {
        require(msg.sender == landlord);
        uint n = duration - paid;
        landlord.transfer(rent * n);
    }
    function detail() public view returns (uint[] memory , address[] memory ){
        uint[] memory s = new uint[] (8);
        s[0]=startDate;
         s[1]=interval;
         s[2]=duration;
         s[3]=paid;
         s[4]=rent;
         s[5]=deposit;
         s[6]=maxUnpaid;
         s[7]=advance;
        address[] memory a= new address[](2);
        a[0]=tenant;
        a[1]=landlord;
        return (s,a);
    }
}
