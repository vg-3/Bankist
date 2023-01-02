'use strict';

//  BANKIST APP

// DATA

const account1 = {
  owner: 'Varshith Gowda V',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    '2022-07-02T21:31:17.178Z',
    '2022-10-04T07:42:02.383Z',
    '2022-10-05T09:15:04.904Z',
    '2022-10-06T10:17:24.185Z',
    '2022-10-07T14:11:59.604Z',
    '2022-10-07T17:01:17.194Z',
    '2022-10-08T23:36:17.929Z',
    '2022-10-10T10:51:36.799Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Anish C Marpalli',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-07-02T21:31:17.178Z',
    '2022-10-04T07:42:02.383Z',
    '2022-10-05T09:15:04.904Z',
    '2022-10-06T10:17:24.185Z',
    '2022-10-07T14:11:59.604Z',
    '2022-10-08T17:01:17.194Z',
    '2022-10-09T23:36:17.929Z',
    '2022-10-10T10:51:36.799Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// const account3 = {
//   owner: 'Siddharth G Bhat',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Hardik T P',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

const accounts = [account1, account2];

// ELEMENTS

const labelWelcome = document.querySelector('.welcome');
// console.log(labelWelcome.textContent);

const labelDate = document.querySelector('.date');
// console.log(labelDate.textContent);

const labelBalance = document.querySelector('.balance__value');
// console.log(labelBalance.textContent);

const labelSumIn = document.querySelector('.summary__value--in');
// console.log(labelSumIn.textContent);

const labelSumOut = document.querySelector('.summary__value--out');
// console.log(labelSumOut.textContent);

const labelSumInterest = document.querySelector('.summary__value--interest');
// console.log(labelSumInterest.textContent);

const labelTimer = document.querySelector('.timer');
// console.log(labelTimer.textContent);

const containerApp = document.querySelector('.app');
//
const containerMovements = document.querySelector('.movements');
//
// BUTTONS
const btnLogin = document.querySelector('.login__btn');

//
const btnTransfer = document.querySelector('.form__btn--transfer');

//
const btnLoan = document.querySelector('.form__btn--loan');

//
const btnClose = document.querySelector('.form__btn--close');

//
const btnSort = document.querySelector('.btn--sort');

//
const inputLoginUserName = document.querySelector('.login__input--user');
//
const inputLoginPin = document.querySelector('.login__input--pin');
//
const inputTransferTO = document.querySelector('.form__input--to');
//
const inputTransferAmount = document.querySelector('.form__input--amount');
//
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
//
const inputCloseUsername = document.querySelector('.form__input--user');
//
const inputClosePin = document.querySelector('.form__input--pin');
//
//
//
//
//
//FORMATTING CURRENCIES

//
//
//
//
//
//

// DISPLAY MOVEMENTS

//
const formatMovementsDate = function (date, locale) {
  const clacDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (24 * 60 * 60 * 1000)));

  const daysPassed = clacDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
//
//
// DISPLAY MOVEMENTS
//
//
//
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // console.log(acc.movementsDates[i]);
    const date = new Date(acc.movementsDates[i]);
    // console.log(date);
    const dispalyDate = formatMovementsDate(date, acc.locale);
    // currency converter
    const formattedMov = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(mov);
    //
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date"> ${dispalyDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//
//
//
//
// DISPLAY BALANCE
//
//
//
//
//

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

// display summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = ` ${incomes}€`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(value => value > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = ` ${interest}€`;
};
//
//
//
//
// DISPLAY MOVEMENTS END
//
//
//
//

// USER NAME GENERATION

const createUserames = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.charAt(0))
      .join('');
  });
};

createUserames(accounts);

// END OF USER NAME GENERATION

//
// ENENT HANDLERS

const updateUI = function (acc) {
  // display movements
  displayMovements(acc);

  // display balance
  calcDisplayBalance(acc);

  // display Summary
  calcDisplaySummary(acc);
};

// LOGOUT TIMER

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // print the remaining time

    labelTimer.textContent = `${min}:${sec}`;

    // desc timer

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 100;

  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//
//
// FAKE ACCOUTN LOGIN
//
//

let currentAccount, timer;
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//
//
//
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUserName.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display ui and message
    labelWelcome.textContent = `Welcome back,  ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // current date and time
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth()}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // clear input flieds
    // inputLoginPin.value = '';
    // inputLoginUserName.value = '';

    inputLoginPin.value = inputLoginUserName.value = '';
    inputLoginPin.blur();
    // START TIMER
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogoutTimer();
    //
    updateUI(currentAccount);
  }
});

//transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTO.value
  );
  inputTransferAmount.value = inputTransferTO.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // pushing amount

    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // pushing dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toDateString());

    // updaate ui
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

//
// const date = new Date();
// console.log(date);
// console.log(date.toISOString());

//
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add to array
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // update ui
      updateUI(currentAccount);
      // reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2000);

    // clear form
  }
  inputLoanAmount.value = '';
});

//
//
//
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUser = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);

  if (
    currentAccount.username === closeUser &&
    currentAccount.pin === closePin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // delete aaccout
    accounts.splice(index, 1);

    // hide ui
    containerApp.style.opacity = 0;
  }
  inputTransferAmount.value = inputTransferTO.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// END EVENT HANDLERS

// console.log('1' + '23');
// console.log(Number('23'));
// console.log(+'23');

// console.log(Number.parseInt('34.09px'));
// console.log(isNaN(20));
// console.log(isNaN('10'));
// console.log(Number.isNaN('10'));
// console.log(isNaN('hi'));
// console.log(10/0);
// console.log(isFinite(+'20'));

// const randInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log(randInt(5, 9));

// console.log(Math.round(23.3));
// console.log(Math.round(23.5));
// console.log(Math.round(23.9));

// console.log(Math.ceil(24.9));

// console.log(Number.MAX_SAFE_INTEGER);
// console.log(Number.MIN_SAFE_INTEGER);

// console.log(2**53+1000);

// // console.log(new Date());
// const present = new Date();
// console.log(present);

// console.log(present.getDate());
// console.log(present.getDay());
// console.log(present.getFullYear());
// console.log(present.getMonth());
// console.log(present.toISOString());
// console.log(new Date(2017, 11, 1, 15, 30, 25));

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(Number(future));
// console.log(+future);

// const clacDaysPassed = (date1, date2) =>
//   (date2 - date1) / (24 * 60 * 60 * 1000);
// const daysPassed = clacDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(daysPassed);

// const num = 345676.65;
// const locale = navigator.language;
// console.log(locale);
// const option = {
//   style: 'currency',
//   currency: 'INR',
// };

// console.log(new Intl.NumberFormat('hi-IN', option).format(num));
// console.log(new Intl.NumberFormat('en-UK').format(num));
// console.log(new Intl.NumberFormat('en-GB').format(num));

// const timeOut = (name, age) =>
//   console.log(`My name is ${name} and im ${26} years old`);

// setTimeout(timeOut, 2000,"varshith",26);

// setInterval(function () {
//   const now = new Date().getSeconds();
//   console.log(now);
// }, 555);

// setInterval(function () {
//   const now = new Date();
//   const sec = now.getSeconds();
//   const option = {
//     minute: 'numeric',
//     hour: 'numeric',
//   };
//   console.log(new Intl.DateTimeFormat('en-UK', option).format(now) + ":"+sec);
// }, 1000);
