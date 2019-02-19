const tax = 0.005;
const maxCardNum = 3;

function UserCard(key) {
  this.key = key;
  this.balance = 100;
  this.transactionLimit = 100;
  this.historyLogs = [];

  this.getCardOptions = () => {
    const { balance ,
      transactionLimit,
      historyLogs,
      key
    } = this;
    console.log({balance, transactionLimit, historyLogs, key});
  }

  this.addToLogs = function (operationType, credits) {
    const operationTime = new Date().toLocaleString('en-US');
    const transactionLog = {
      operationType,
      credits,
      operationTime
    }
    this.historyLogs.push(transactionLog);
  };

  this.putCredits = function (amountToAdd) {
    this.balance += amountToAdd;
    this.addToLogs('Received credits', amountToAdd);
  };

  this.takeCredits = function (amountToReduce) {
    if (this.transactionLimit < amountToReduce) {
      console.error('Transaction exceeds limit');
      return false;
    } else if(this.balance < amountToReduce) {
      console.error('Not enough money to perform this operation');
      return false;
    } else { 
      this.balance -= amountToReduce;
      this.addToLogs('Withdrawal of credits', amountToReduce);
      return true;
    }
  };

  this.setTransactionLimit = function (newLimit) {
    this.transactionLimit = newLimit;
    this.addToLogs('Transaction limit change',newLimit);
  };

  this.transferCredits = function (amountToTransfer, cardNum) {
    const taxAmount = amountToTransfer * tax;
    this.amountToReduce = amountToTransfer + taxAmount ;
    if (this.amountToReduce < this.balance) {
      this.takeCredits(this.amountToReduce);
      cardNum.putCredits(amountToTransfer);
    } else {
      console.error('Not enough money to perform this operation');
    }
  }
}

class UserAccount {
  constructor(name) {
    this.name = name; 
    this.cards = [];
  }
  addCard() {
    let numOfUserCards = this.cards.length;
    if (numOfUserCards < maxCardNum) {
      this.cards.push(new UserCard(numOfUserCards + 1));
    } else {
      console.error('You already have 3 cards. That is maximum amount');
    }
  }
  getCardByKey(key) {
    return this.cards[key-1];
  }
}
 