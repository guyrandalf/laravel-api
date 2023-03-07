import { Link } from 'react-router-dom'
export default function Register() {
  const onRegister = (e) => {
    e.preventDefault()
    alert('register clicked')
  }
  return (
    <form className="flex form-container" onSubmit={onRegister}>
      <h1>Login to your account</h1>
      <div className="input-container">
        <div className="form-group grid">
          <label htmlFor="fullname">Fullname</label>
          <input type="fullname" className="input-fields" id="fullname" placeholder="enter your fullname" />
        </div>
        <div className="form-group grid">
          <label htmlFor="email">Email address</label>
          <input type="email" className="input-fields" id="email" placeholder="enter your email" />
        </div>
        <div className="form-group grid">
          <label htmlFor="password">Password</label>
          <input type="password" className="input-fields" id="password" placeholder="enter your password" />
        </div>
        <div className="form-group grid">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="input-fields" id="cpassword" placeholder="confirm your password" />
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
