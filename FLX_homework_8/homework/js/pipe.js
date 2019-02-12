function addOne(x) {
    return x + 1;
  }
function addFive(x){
  return x + 5;
}

function pipe(num, ...args) {
  num = arguments[0];
  for (let i = 0; i < args.length; i++){
    num = args[i](num);
  }
  return num;
}

pipe(1, addOne);
pipe(1, addOne, addOne);
pipe(5, addOne, addOne, addFive);
