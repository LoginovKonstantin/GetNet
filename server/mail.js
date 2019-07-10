const nodemailer = require('nodemailer');

const SERVICE_MAIL = 'yandex';
const USER_MAIL = ''; // abcs@yandex.ru
const PASSWORD_MAIL = ''; // LKJsdsalkjda

const transporter = nodemailer.createTransport({
  service: SERVICE_MAIL,
  auth: { user: USER_MAIL, pass: PASSWORD_MAIL }
 });
 
function send(email, password, hash, host) {
  const from = 'acro221996@yandex.ru';
  const mailOptions = {
    from: from,
    to: email,
    subject: 'CONFIRMATION',
    html: '<div>Your login (email): ' + email + '</div>' +
      '<div>Your password: ' + password + '</div>'+
      '<p>Click <a href="http://' + host + '/api/confirmation/?hash=' + hash + '">here</a> ' +
      'and confirm email.</p>'
  };
  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
        console.log(err);
        rej('error');
      } else {
        console.log(info);
        res('success');
      }
    });
  })
}

module.exports = {
  send
}