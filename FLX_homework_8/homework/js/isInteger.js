function isInteger(num) {
    return (typeof num === 'number') && (num%1 === 0)
  }

isInteger(5);
isInteger(5.1);