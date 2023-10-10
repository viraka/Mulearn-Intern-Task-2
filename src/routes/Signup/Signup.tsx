import React, { useRef } from 'react'
import styles from './Signup.module.css'
import { register } from '../../components/Auth'

const Signup: React.FC = () => {

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const divRef = useRef<HTMLDivElement | null>(null)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const username = usernameRef.current!.value
        const password = passwordRef.current!.value
        const confirmPassword = confirmPasswordRef.current!.value

        if (password !== confirmPassword) {
            if (divRef.current) {
                divRef.current.textContent = "Passwords don't match"
            }
        }
        else {
            const bool = register(username, password)
            if (bool) {
                alert("Account created successfully")
            }
            else {
                if (divRef.current) {
                    divRef.current.textContent = "Username already exists"
                }
            }
        }
    }

    return (
        <>
            <div className="signup">
                <h1>Sign Up</h1>
                <form className={styles.signupform} onSubmit={handleSubmit}>
                    <div className={`${styles.username} ${styles.field}`}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" ref={usernameRef} className={styles.Sinput} /><br />
                    </div>
                    <div className={`${styles.password} ${styles.field}`}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" ref={passwordRef} className={styles.Sinput} /><br />
                    </div>
                    <div className={`${styles.password} ${styles.field}`}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" ref={confirmPasswordRef} className={styles.Sinput} /><br />
                    </div>
                    <button type="submit">Signup</button>
                    <div className="red-danger" ref={divRef}></div>
                </form>

                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </>
    )
}

export default Signup