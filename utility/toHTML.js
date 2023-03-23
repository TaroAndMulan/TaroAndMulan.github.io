

export function convertTemplateToHTML(template){
    return template.replaceAll(/\[\[.*?\]\]/ig,'_____');
}

/*
const dog = `
<div class="openlaw-paragraph paragraph-1"><p class="no-section"><br />สัญญาซื้อขนม  </p></div><div class="openlaw-paragraph paragraph-2"><p class="no-section">ข้อ 1. ผู้ขายตกลงขายและผู้ซื้อตกลงซื้อขนมของผู้ขาย <br />จำนวน <span class="markdown-variable markdown-variable-จำนวนสินค้า">[[จำนวนสินค้า]]</span> ชิ้น<br />รวมเป็นเงิน <span class="markdown-variable markdown-variable-จำนวนเงิน">[[จำนวนเงิน]]</span> บาท <br />โดยผู้ซื้อจะมารับสินคา้ที่ซื้อขายดงักล่าวในข้อนี้ด้วยตนเอง<br />ภายในกำหนด <span class="markdown-variable markdown-variable-ภายใน">[[ภายใน]]</span>วัน นับตั้งแต่วันทำสัญญานี้</p></div><div class="openlaw-paragraph paragraph-3"><p class="no-section">ข้อ 2. ในวันที่ทำสัญญานี้ผู้ซื้อได้ชำระค่ามัดจำ เป็นเงิน <span class="markdown-variable markdown-variable-เงินมัดจำ">[[เงินมัดจำ]]</span> บาท<br /> ให้แก่ผู้ขายไว้เป็นเงินสดเป็นเช็คของธนาคาร <br /><span class="markdown-variable markdown-variable-ชื่อธนาคาร">[[ชื่อธนาคาร]]</span> <br />เช็คเลขที่ <span class="markdown-variable markdown-variable-เลขที่ธนาคาร">[[เลขที่ธนาคาร]]</span> ลงวันที่ <span class="markdown-variable markdown-variable-วันที่">[[วันที่]]</span><br />สำหรับราคาสินค้าส่วนที่เหลือนั้นผู้ซื้อตกลงชำระใหแก่ผู้ขายภายในวันที่ <span class="markdown-variable markdown-variable-กำหนดชำระเงิน">[[กำหนดชำระเงิน]]</span></p></div><div class="openlaw-paragraph paragraph-4"><p class="no-section">ข้อ 3. หากคู่สัญญาฝ่ายหนึ่งฝ่ายใดผิดสัญญา ให้อีกฝ่ายหนึ่งมีสิทธิบอกเลิกสัญญา<br />และมีสิทธิเรียกร้องค่าเสียหายจากฝ่ายที่ผิดสัญญาได้ตามความเป็นจริง<br /></p></div><div class="openlaw-paragraph paragraph-5"><p class="no-section">ลงชื่อ <span class="markdown-variable markdown-variable-ชื่อผู้ขาย">[[ชื่อผู้ขาย]]</span> ผู้ขาย<br /></p></div><div class="openlaw-paragraph paragraph-6"><p class="no-section">ลงชื่อ <span class="markdown-variable markdown-variable-ชื่อผู้ซื้อ">[[ชื่อผู้ซื้อ]]</span> ผู้ซื้อ</p></div>
`

const dog2=` wtf is this [[shit]] OMG pls [[work]]`
console.log(dog2);
console.log(convertTemplateToHTML(dog2));

function isValidTemplate(template){
    var lb = 0;
    var rb = 0;
    for(let j=0;j<template.length;j++){
        //if(template[j]==0)
    }
}
*/