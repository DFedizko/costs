import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import styles from './Footer.module.css';

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <ul className={styles.social_list}>
          <li>
            <FaFacebook fontSize='2rem' />
          </li>
          <li>
            <FaInstagram fontSize='2rem' />
          </li>
          <li>
            <FaLinkedin fontSize='2rem' />
          </li>
        </ul>
        <p className={styles.copy_right}>
          <span>Costs</span> &copy; 2025
        </p>
      </footer>
    );
}

export default Footer;