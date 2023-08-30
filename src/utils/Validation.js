export const EmailValidator = (email) => {
    const pattern =/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return pattern.test(email);
}
export const PasswordValidator = (password,cpassword) => {
    return password === cpassword;
}
export const CheckCardInput = ({seller,buyer,sellingDate,dueDate,dueDay,weight,outPercentage,outWeight,netWeight,price,lessPercentage,totalAmount,brokerage,brokerageAmt}) =>{
    if(seller.trim().length < 2) return "Seller Name should be minimum 2 character long";
    if(buyer.trim().length < 2) return "Buyer Name should be minimum 2 minimum 2 character long";
    if(sellingDate.length!=10) return "Enter Selling Date";
    if(dueDate.length!=10) return "Enter due Date";
    if(weight<=0) return "Enter Weight";
    if(outPercentage<=0 || outPercentage>100) return "Enter Out Percentage Properly";
    if(price<=0) return "Enter Price";
    if(lessPercentage<=0 || lessPercentage>100) return "Enter Less Percentage Properly";
    if(brokerage<=0 || brokerage>100) return "Enter Brockerage Percentage Properly";

    return "Success"
}