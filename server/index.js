const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const mail = require('./mail');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  // simple test
  // {
  //   email: 'acro221996@yandex.ru',
  //   isConfirmed: true,
  //   password: 'j5mhhRjgdqaa',
  //   hash: '2i7NzvtZeZVQDDUPcWrCZM8WBb2RDA',
  //   time: 1562828965157,
  //   profile: { firstName: '', secondName: '' },
  //   orders: fakeOrders(),
  //   balance: { current: 0, history: fakeHistory() }
  // }
];

app.post('/api/changePassword', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const userIdx = users.findIndex(u => u.email === email);
  if (
    userIdx !== -1 &&
    oldPassword === users[userIdx].password &&
    oldPassword !== newPassword
  ) {
    users[userIdx].password = newPassword;
    res.send({ status: 'success' })
  } else {
    res.send({ status: 'failed' })
  }
})

app.post('/api/changeProfile', (req, res) => {
  const { firstName, secondName, email } = req.body;
  console.log(req.body)
  const userIdx = users.findIndex(u => u.email === email);
  if (userIdx !== -1) {
    users[userIdx].profile.firstName = firstName;
    users[userIdx].profile.secondName = secondName;
    res.send({ status: 'success' })
  } else {
    res.send({ status: 'failed' })
  }
})

app.post('/api/signIn', (req, res) => {
  const { loginEmail, password } = req.body;
  if (isValidEmail(loginEmail)) {
    const userIdx = users.findIndex(u => u.email === loginEmail);
    const user = users[userIdx];
    if (userIdx !== -1 && user.isConfirmed && user.password === password) {
      res.send({ status: 'success', user, userIdx });
    } else {
      res.send({ status: 'error' });
    }
  } else {
    res.send({ message: 'this mail is exist' });
  }
})

app.get('/api/confirmation', (req, res) => {
  const { hash } = req.query;
  const userIdx = users.findIndex(u => u.hash === hash);
  if (userIdx !== -1 && hash && users[userIdx] && !users[userIdx].isConfirmed) {
    users[userIdx].isConfirmed = true;
    res.send('Congratulation, email is confirmed');
  } else if (users[userIdx].isConfirmed) {
    res.send('This mail was confirmed');
  } else {
    res.status(403).send();
  }
})

app.post('/api/registration', (req, res) => {
  const { email } = req.body;
  const password = generator.generate({ length: 10, numbers: true });
  const hash = generator.generate({ length: 30, numbers: true });
  if (isValidEmail(email) && !isExist(email)) {
    mail.send(email, password, hash, req.get('host'))
      .then(() => {
        users.push(createUser(email, password, hash));
        console.log('USERLIST: ', users);
        res.send({ message: 'check mail' });
      })
      .catch(() => res.send({ message: 'asdas' }));
  } else {
    res.send({ message: 'this mail is exist' });
  }
})

/*
  Sample user
  { 
    email: 'abc@mail.ru', 
    isConfirmed: false, 
    password: 'asdf2asA', 
    hash: 'asdasdkLKAjdslad8asdk', 
    time: 1231231234,
    profile: {
      firstName: '',
      secondName: ''
    },
    orders: [{
      operationName: ''
      time: 123123123,
      price: 1122
    }],
    balance: {
      current: 0,
      history: [{
        time: 123123123,
        operationName: 'asdfsad',
        sum: 2000
      }]
    }
  }
 */
function createUser(email, password, hash) {
  return {
    email,
    isConfirmed: false,
    password,
    hash,
    time: Date.now(),
    profile: {
      firstName: '',
      secondName: ''
    },
    orders: fakeOrders,
    balance: {
      current: 0,
      history: fakeHistory()
    }
  }
}

function fakeOrders() {
  return [
    { operationName: 'First buy', time: 1562836397840, price: 800 },
    { operationName: 'Sale 50% ', time: 1562836497840, price: 900 },
    { operationName: 'XMagazine', time: 1562836597840, price: 300 },
    { operationName: 'FooBazz', time: 1562836697840, price: 423 },
    { operationName: 'Bar', time: 1562836797840, price: 9000 },
    { operationName: 'Product shop', time: 1562836897840, price: 200 }
  ]
}
function fakeHistory() {
  return [
    { operationName: 'Receipt of funds', time: 1562836396840, sum: 800 },
    { operationName: 'First buy', time: 1562836397840, sum: -800 },
    { operationName: 'Receipt of funds', time: 1562836496840, sum: 900 },
    { operationName: 'Sale 50% ', time: 1562836497840, sum: -900 },
    { operationName: 'Receipt of funds', time: 1562836547840, sum: 300 },
    { operationName: 'XMagazine', time: 1562836597840, sum: -300 },
    { operationName: 'Receipt of funds', time: 1562836597840, sum: 423 },
    { operationName: 'FooBazz', time: 1562836697840, sum: -423 },
    { operationName: 'Receipt of funds', time: 1562836797840, sum: 9023 },
    { operationName: 'Bar', time: 1562836797840, sum: -9000 },
    { operationName: 'Receipt of funds', time: 1562835897840, sum: 500 },
    { operationName: 'Product shop', time: 1562836897840, sum: -200 }
  ]
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
function isExist(email) {
  return users.filter(u => u.email === email).length > 0;
}
app.listen(8088, function () {
  console.log('Listening on port 8088!');
});
