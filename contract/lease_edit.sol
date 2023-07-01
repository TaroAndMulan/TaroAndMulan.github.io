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
    uint ustatus;
    uint public paid;
    //3=rent 4=deposit 5=maxUnpaid 6=advanec
    uint rent;
    uint deposit;
    uint maxUnpaid;
    uint advance;

    constructor() {
        landlord = payable(msg.sender);
        tenant = payable(0x5095c1faA5CE2B8FE3615c05Bc475F0fCf5b80C9);
        startDate= $0 ;
        interval = $1 ;
        duration = $2;

        paid = 0;
        rent = $3 gwei;
        deposit = $4 gwei;
        maxUnpaid=$5 ;
        advance = $6 ;

        if(advance>0 || deposit>0){
            status = "inactive";
            ustatus=0;
        }
        else 
        {
            status = "active";
            ustatus=1;
        }

    }

    function pay_rent() public payable {
        require(msg.value >= rent);
        uint excess = msg.value - rent;
        paid = paid + 1;
        if (paid==duration)
        {
            setStatus("complete");
            ustatus=2;
        }

        if (excess > 0) 
        payable(msg.sender).transfer(excess);
    }

    function pay_deposit() public payable{
        require(msg.value>= deposit+rent*advance);
        paid = paid+advance;
        setStatus("active");
        ustatus=1;
    }

    function automate() public {
        if (ustatus==1) {
            uint _paid = (block.timestamp - startDate) / interval;
            if (paid + maxUnpaid < _paid+1) {
                terminate();
            } 
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
        setStatus("TERMINATED, tenant failed to pay rent on time");
        //landlord.transfer(address(this).balance);
    }

    function landlordwithdrawn() public {
        require(msg.sender == landlord);
        uint n = duration - paid;
        landlord.transfer(rent * n);
    }
    function detail() public view returns (uint[] memory , address[] memory , string memory ){
        uint[] memory s = new uint[] (9);
        s[0]=startDate;
         s[1]=interval;
         s[2]=duration;
         s[3]=rent;
         s[4]=deposit;
         s[5]=maxUnpaid;
         s[6]=advance;
         s[7]=paid;
        address[] memory a= new address[](2);
        a[0]=tenant;
        a[1]=landlord;
        return (s,a,status);
    }
}
