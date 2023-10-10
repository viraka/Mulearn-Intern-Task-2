import React from 'react'
import styles from './Header.module.css'
import moon from '../../assets/moon.png'
import sun from '../../assets/sun.png'
interface Props {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

function toggleTheme(theme: string, setTheme: React.Dispatch<React.SetStateAction<string>>) {
    if (theme === "light") {
        setTheme("dark")
    } else {
        setTheme("light")
    }
}

const Header: React.FC<Props> = ({ theme, setTheme }) => {
    return (
        <div className={`${styles.header}`}>
            <p>TODO</p>
            <img src={theme == "light" ? moon : sun} alt="moon" onClick={() => toggleTheme(theme, setTheme)} className={styles.img} />
        </div>
    )
}

export default Header