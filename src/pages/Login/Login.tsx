import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../components/Api'
import styles from './Login.module.css'

const Login: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const divRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const username = usernameRef.current!.value
        const password = passwordRef.current!.value

        const response = await login(username, password)
        if (response !== "Incorrect credentials") {
            navigate(`/todo/${username}`)
        }
        else {
            if (divRef.current) {
                divRef.current.textContent = "Wrong username or password"
            }
        }
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.username} ${styles.field}`}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className={styles.Linput} ref={usernameRef} required /><br />
                </div>
                <div className={`${styles.password} ${styles.field}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className={styles.Linput} ref={passwordRef} required /><br />
                </div>
                <button type="submit">Login</button>
                <div className="red-danger" ref={divRef}></div>
            </form>

            <p className='p'>Don't have an account? <a href="/signup">Signup</a></p>
        </div>
    )
}

export default Login