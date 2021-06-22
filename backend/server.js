const express = require('express')
const nodemailer = require('nodemailer')
const libphonenumber = require('libphonenumber-js')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const Form = require('./models/FormModel')

const path = require('path')


dotenv.config()
connectDB()
const app = express()
app.use(express.json())

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'akshatsaraswat27@gmail.com',
    pass: '@ksh@ts@r@sw@t'
  }
});




app.post('/verify', async (req, res) => {
  const { name, email, number, dob } = req.body;

  const formExists = await Form.findOne({ email })

  if (formExists) {
    res.status(400)
    throw new Error('form exists')
  }


  if (libphonenumber.isValidPhoneNumber(number)) {

    var mailOptions = {
      from: 'akshatsaraswat27@gmail.com',
      to: email,
      subject: 'Welcome to the community',
      text: `Hey ${name}! Glad to have you on our community. `
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    const form = await Form.create({
      name,
      number,
      email,
      dob
    })

    if (form) {
      res.status(201).json({
        _id: form._id,
        name: form.name,
        email: form.email,
        number: form.number,
        dob: form.dob
      })
    } else {
      res.status(400)
      throw new Error("Form can't be created!!")
    };
  }
  else {
    res.send("Invalid Number")
  }
})

app.get('/getForms', async (req, res) => {
  const forms = await Form.find({});
  res.json(forms);
})


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
)