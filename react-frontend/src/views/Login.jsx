import { Link } from 'react-router-dom'
export default function Login() {
  const onLogin = (e) => {
    e.preventDefault()
    alert('Login clicked')
  }
  return (
    <form className="flex form-container" onSubmit={onLogin}>
      <div className="input-container">
      <h1>Login to your account</h1>
        <div className="form-group grid">
          <label htmlFor="email">Email address</label>
          <input type="email" className="input-fields" id="email" placeholder="enter your email" />
        </div>
        <div className="form-group grid">
          <label htmlFor="password">Password</label>
          <input type="text" className="input-fields" id="password" placeholder="enter your password" />
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
