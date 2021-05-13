import React from 'react'
import './App.css';

export default function UserForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        error,
      } = props

      const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }

      const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const inputValue = type === "checkbox" ? checked : value
        change(name, inputValue)
      }



    return (
        <div>
        <form className = 'form-container' onSubmit={onSubmit}> 
    
            <label className = 'form-element'>
                <span>Username: </span>
              <input
                value={values.first_name}
                onChange={onChange}
                name='first_name'
                type='text'
              />
            </label>
            <label className = 'form-element'>
                <span>Password: </span>
                <input value = {values.password}
                onChange={onChange}
                name = 'password'
                type = 'password'
                ></input>
            </label>
    
            <label className = 'form-element'>
                <span>Email: </span>
              <input
                value={values.email}
                onChange={onChange}
                name='email'
                type='email'
              />
            </label>
    
            <label>I agree to Terms of Service
              <input type="checkbox" checked={values.service} name="service" onChange={onChange} />
            </label>

         <div className='errors'>
             <div>{error.first_name}</div>
             <div>{error.email}</div>
             <div>{error.password}</div>
             <div>{error.service}</div>
        </div>

            <button id = 'sign-up' disabled={disabled}>Sign Up</button>
    
        </form>
        </div>
)
    }