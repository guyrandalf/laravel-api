import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"

export const UserForm = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState()
    const { setMessage } = useStateContext()
    const [user, setUser] = useState({
        id: null,
        email: '',
        password: '',
        password_confirmation: ''
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setMessage("User account update successfully")
                    navigate('/users')
                }).catch(err => {
                    const response = err.response
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/users/`, user)
                .then(() => {
                    setMessage("New User created successfully")
                    navigate('/users')
                }).catch(err => {
                    const response = err.response
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }
    }
    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div>
                {loading && (
                    <div>Loading...</div>
                )}
            </div>
            {!loading &&
                <form className="flex form-container" onSubmit={onSubmit}>
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
                            <input onChange={e => setUser({ ...user, name: e.target.value })} value={user.name} type="text" className="input-fields" id="name" placeholder="enter your name" />
                        </div>
                        <div className="form-group grid">
                            <label htmlFor="email">Email address</label>
                            <input onChange={e => setUser({ ...user, email: e.target.value })} value={user.email} type="email" className="input-fields" id="email" placeholder="enter your email" />
                        </div>
                        <div className="form-group grid">
                            <label htmlFor="password">Password</label>
                            <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" className="input-fields" id="password" placeholder="enter your password" />
                        </div>
                        <div className="form-group grid">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input onChange={e => setUser({ ...user, password_confirmation: e.target.value })} type="password" className="input-fields" id="cpassword" placeholder="confirm your password" />
                        </div>
                        <div className="form-group grid">
                            <label htmlFor=""></label>
                            <button className="btn btn-auth">
                                {user.id && <>Save</>}
                                {!user.id && <>Create</>}
                            </button>
                        </div>
                    </div>
                </form>
            }
        </>
    )
}
