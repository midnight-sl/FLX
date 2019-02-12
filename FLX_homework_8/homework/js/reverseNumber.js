function reverseNumber(num) {
  const sign = Math.sign(num);
  let simpleNum = num * sign;
  let convertedNum = '' + simpleNum;
  let numString = '';
  for ( let i = convertedNum.length -1; i >= 0; i--) {
    numString += convertedNum[i]
  } 
  convertedNum = +numString * sign;
  return convertedNum ;
}

console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(100000));

