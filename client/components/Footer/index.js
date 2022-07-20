import styles from '../../styles/Home.module.css'
import Image from 'next/image'


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a href="https://github.com/jacksonkasi0" target="_blank" >
                Powered by &nbsp;
                <span className="font-semibold">
                    Jackson Kasi
                </span>
            </a>
        </footer>)
}
export default Footer;