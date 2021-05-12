import './App.css';
import UserForm from './Form'
import axios from 'axios'
import * as yup from 'yup'
import React, { useState, useEffect } from 'react'
import { schema } from './formSchema'
import User from './User'


const initialUser = [];
const initialFormValues = {
  first_name: '',
  email: '',
  password: '',
  service: false,
}

const initialFormErrors = {
  first_name: '',
  email: '',
  password: '',
}

const initialDisabled = true;


export default function App() {

const [values, setValues] = useState(initialFormValues)
const [errors, setErrors] = useState(initialFormErrors)
const [disabled, setDisabled] = useState(initialDisabled)
const [user, setUser] = useState(initialUser)

const [ID, setID] = useState(7)

const getUsers = () => {
  axios.get("https://reqres.in/api/users")
  .then(({data}) => setUser(data.data))
  .catch(err => console.log('Error getting users:', err))

  console.log(user)
}



const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(({data}) => setUser([data, ...user]))
  .catch(err => console.log('Error posting new User', err))
}

const inputChange = (name, value) => {
  yup.reach(schema, name)
  .validate(value)
  .then(() => setErrors({
    ...errors,
    [name]: ''
  }))
  .catch(err => setErrors({
    ...errors,
    [name]: err.errors[0]
  }))
  setValues({
    ...values,
    [name]: value 
  })
}

const formSubmit = () => {
  const newUser = {
    id: ID,
    first_name: values.first_name.trim(),
    email: values.email.trim(),
    password: values.password.trim(),
  }
  postNewUser(newUser)
  console.log(newUser)
  console.log(user)
  setValues(initialFormValues)
  setID(ID + 1)
}

useEffect(() => {
  getUsers()
}, [])


useEffect (() => {
  schema.isValid(values)
  .then(valid => setDisabled(!valid))
}, [values])

  return (
    <div className="App">
      <header><h1>Create New Account</h1></header>

      <UserForm
        values = {values}
        change = {inputChange}
        submit = {formSubmit}
        disabled = {disabled}
        error = {errors}
        />
      {
        user.map(user => {
         
         return(
          <User details = {user} />
         )
        })
      }

    </div>
  );
}
