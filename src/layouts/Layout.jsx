import styles from "./Layout.module.css"

function Layout({children}) {
  return (
    <>
        <header className={styles.header}>
            <h1>Weather App</h1>
            <p>
                <a href="">BotoCamp</a> | React.js Full Course
            </p>
        </header>
        {children}
        <footer className={styles.footer}>
            <p>Developed By Hasan Naderi</p>
        </footer>
    </>
  )
}

export default Layout