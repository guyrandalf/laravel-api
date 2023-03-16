import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
export default function Register() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onRegister = (e) => {
    e.preventDefault()    
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }    

    axiosClient.post('/register', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        console.log(err);
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }
  return (
    <form className="flex form-container" onSubmit={onRegister}>
      <h1>Create a free account</h1>
      <div className="input-container">
        {
          errors && <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <div className="form-group grid">
          <label htmlFor="name">Fullname</label>
          <input ref={nameRef} type="name" className="input-fields" id="name" placeholder="enter your name" />
        </div>
        <div className="form-group grid">
          <label htmlFor="email">Email address</label>
          <input ref={emailRef} type="email" className="input-fields" id="email" placeholder="enter your email" />
        </div>
        <div className="form-group grid">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" className="input-fields" id="password" placeholder="enter your password" />
        </div>
        <div className="form-group grid">
          <label htmlFor="cpassword">Confirm Password</label>
          <input ref={passwordConfirmationRef} type="password" className="input-fields" id="cpassword" placeholder="confirm your password" />
        </div>
        <div className="form-group grid">
          <label htmlFor=""></label>
          <button className="btn btn-auth">Create account</button>
        </div>
        <p className='message'>Already Registered? <Link to='/login'>Login</Link></p>
      </div>
    </form>
  )
}
