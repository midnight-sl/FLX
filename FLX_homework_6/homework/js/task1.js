const a = parseFloat(prompt('a = ', 'write a here'));
const b = parseFloat(prompt('b = ', 'write b here'));
const c = parseFloat(prompt('c = ', 'write c here'));

checkValue(a) || checkValue(b) || checkValue(c)
	? alert('Invalid input data.')
	: quadraticEquation(a, b, c);

function checkValue(value){
	return isNaN(value);
}

function quadraticEquation(a, b, c){
	const d = b*b - 4*a*c;
	let x, x1, x2;
	if(d > 0) {
		x1 = (-b + Math.sqrt(d)) / (2 * a);
		x2 = (-b - Math.sqrt(d)) / (2 * a);
		alert(`x1 = ${x1} and x2 = ${x2}`);
	} else if(d === 0) {
		x = -b / (2*a);
		alert(x)
	} else if(d < 0) {
		alert('no solution');
	} else {
		alert('Invalid input data.');
	}
}
