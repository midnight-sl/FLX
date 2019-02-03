const price = parseFloat(prompt('Input price here '));
const discount = parseFloat(prompt('Write wanted discont')); 

valueValidation(price) || valueValidation(discount)
	? alert('Invalid input data.')
  : discountCount();

function valueValidation(value){
  return isNaN(value);
}

function checkRanges(variable, value){
  switch(variable){
    case 'price': return (value > 9999999 || value < 0);
    case 'discount': return (value < 0 || value > 99);
    default: return alert('Wrong parameter');
  }
}

function discountCount() { 
  let amountSaved = (price * (discount / 100)).toFixed(2);
  let amountWithDiscount = (price - amountSaved).toFixed(2);

  if(checkRanges('price', price)
    || checkRanges('discount', discount)) {
    alert('Invalid input data.');
  } else {    
    alert(`Price without discount: ${price} 
Discount: ${discount}%
Price with discount: ${amountWithDiscount}
Saved: ${amountSaved}`);
  }
}