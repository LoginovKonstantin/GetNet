const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const mail = require('./mail');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
  Sample user
  { 
    email: 'abc@mail.ru', isConfirmed: false, password: 'asdf2asA', 
    hash: 'asdasdkLKAjdslad8asdk', time: 1231231234 
  }
 */
let users = [ ];

app.post('/api/signIn', (req, res) => {
  const { loginEmail, password } = req.body;
  if(isValidEmail(loginEmail)) {
    const userIdx = users.findIndex(u => u.email === loginEmail);
    const user = users[userIdx];
    if(user.isConfirmed && user.password === password) {
      res.send({ status: 'success' });  
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
  if(hash && users[userIdx] && !users[userIdx].isConfirmed) {
    users[userIdx].isConfirmed = true;
    res.send('Congratulation, email is confirmed');
  } else if(users[userIdx].isConfirmed) {
    res.send('This mail was confirmed');
  } else {
    res.status(403).send();
  }
})

app.post('/api/registration', (req, res) => {
  const { email } = req.body;
  const password = generator.generate({length: 10, numbers: true});
  const hash = generator.generate({length: 30, numbers: true});
  if(isValidEmail(email) && !isExist(email)) {
    console.log(req.get('host'));
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

function createUser(email, password, hash) {
  return {
    email,
    isConfirmed: false,
    password,
    hash,
    time: Date.now()
  }
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
