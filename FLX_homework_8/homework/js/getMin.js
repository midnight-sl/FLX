function getMin(...args) {
  let numbers = [...args];
  let minNum = numbers[0];
  for (let i=0; i < numbers.length; i++) {
    if(numbers[i] < minNum) {
      minNum = numbers[i];
    }
  }
  return minNum;
}

getMin(3,0,-3);