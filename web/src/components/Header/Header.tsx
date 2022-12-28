import styles from './styles.module.css';
import Logo from '../../assets/Logo.png';

export function Header() {
   return (
      <header className={styles.header}>
         <img src={Logo} alt="Logo To Do List" />
      </header>
   );
}
