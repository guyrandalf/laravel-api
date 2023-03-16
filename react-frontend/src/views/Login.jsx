import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [errors, setErrors] = useState(null)
  const { setUser, setToken } = useStateContext()

  const onLogin = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null)

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        console.log(err);
        const response = err.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);            
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }
  return (
    <form className="flex form-container" onSubmit={onLogin}>
      <h1>Login to your account</h1>
      <div className="input-container">
        {
          errors && <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <div className="form-group grid">
          <label htmlFor="email">Email address</label>
          <input ref={emailRef} type="email" className="input-fields" id="email" placeholder="enter your email" />
        </div>
        <div className="form-group grid">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" className="input-fields" id="password" placeholder="enter your password" />
        </div>
        <div className="form-group grid">
          <label htmlFor=""></label>
          <button className="btn btn-auth">Login</button>
        </div>
        <p className='message'>Not Registered? <Link to='/register'>Create account</Link></p>
      </div>
    </form>
  )
}
