import { Link } from 'react-router-dom';
import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>

        <nav className={s.nav}>
          <Link to="/contact">צור קשר</Link>
        </nav>

        <Link className={s.brand} to="/">
          <img src="/bakery.png" alt="Shehab Bakery" />
        </Link>

        <Link to="/" className={s.menuLabel}>
          <span>Menu</span>
        </Link>

      </div>
    </header>
  );
}
