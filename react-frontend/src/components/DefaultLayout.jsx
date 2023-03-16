import { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

const DefaultLayout = () => {
  const { user, token, message, setMessage, setUser, setToken } = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (e) => {
    e.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])

  return (
    <div id='defaultLayout'>
      <aside>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <form onSubmit={onLogout}>
              <button className='btn btn-logout'>Logout</button>
            </form>
          </li>
        </ul>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
          </div>
        </header>
        <main>
          {message &&
            <div style={{color: 'red'}}>
              {message}
            </div>
          }
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout