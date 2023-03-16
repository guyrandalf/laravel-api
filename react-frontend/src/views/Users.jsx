import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMessage} = useStateContext()

  useEffect(() => {
    getUsers()
  }, [])

  const onDelete = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    axiosClient.delete(`/users/${user.id}`).then(() => {
      setMessage("User successfully deleted")
      getUsers()
    })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div>
        <h1>Users</h1>
        <Link to="/users/create" className="btn btn-add">Add new</Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Loading...
              </td>
            </tr>
          </tbody>}
          {!loading &&
            <tbody>
              {users.map(user => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link className="btn btn-edit" to={'/users/' + user.id}>Edit</Link>
                    <button className="btn btn-delete" onClick={e => onDelete(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>}
        </table>
      </div>
    </div>
  )
}
