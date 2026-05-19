import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../../LangContext';
import s from './Header.module.scss';

export default function Header() {
  const lang = useLang();
  const location = useLocation();
  const isContact = location.pathname.includes('contact');

  const heLink = isContact ? '/contact' : '/';
  const arLink = isContact ? '/ar/contact' : '/ar';

  return (
    <header className={s.header}>
      <div className={s.inner}>

        <nav className={s.nav}>
          <Link to={lang === 'he' ? '/contact' : '/ar/contact'}>
            {lang === 'he' ? 'צור קשר' : 'تواصل معنا'}
          </Link>
        </nav>

        <Link className={s.brand} to={lang === 'he' ? '/' : '/ar'}>
          <img src="/bakery.png" alt="Shehab Bakery" />
        </Link>

        <div className={s.langSwitch}>
          <Link to={heLink} className={`${s.langBtn} ${lang === 'he' ? s.langActive : ''}`}>עב</Link>
          <Link to={arLink} className={`${s.langBtn} ${lang === 'ar' ? s.langActive : ''}`}>عر</Link>
        </div>

      </div>
    </header>
  );
}
