let login = prompt('Enter your login here','login');
let pass;
let userGreeting;
let adminGreeting;

if(new Date().getHours() < 20) {
  userGreeting = "Good day, dear User!";
  adminGreeting = "Good day, dear Admin!";
  } else {
  userGreeting = "Good evening, dear User!";
  adminGreeting = "Good evening, dear Admin!"
}


if(!login) {
    alert('Canceled');
  } else if(login.length < 4) {
    alert("I don't know any users having name length less than 4 symbols");
  } else if(login === 'User' || login === 'Admin') {
    pass = prompt('Enter your password here', 'your password');
      if(!pass) {
        alert('Canceled');
        } else if(login === "User" && pass === "UserPass") {
          alert(userGreeting);
        } else if(login === "Admin" && pass === "RootPass") {
        alert(adminGreeting);
      } else {
        alert('Wrong password');
      }
  } else {
  alert('I don’t know you');
} 



