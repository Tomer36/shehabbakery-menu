import s from './Contact.module.scss';
import Header from '../../components/Header/Header';

export default function Contact() {
  return (
    <div className={s.page}>
      <Header />

      <main className={s.main}>
        <h2 className={s.heading}>צור קשר</h2>

        <div className={s.card}>
          <div className={s.cardInfo}>
            <span className={s.label}>מיקום</span>
            <span className={s.value}>שפרעם</span>
            <a className={s.link} href="https://waze.com/ul/hsvc48762v" target="_blank" rel="noreferrer">
              🗺 פתח ב-Waze
            </a>
          </div>
          <div className={s.icon}>📍</div>
        </div>

        <div className={s.card}>
          <div className={s.cardInfo}>
            <span className={s.label}>שעות פעילות</span>
            <span className={s.value}>שני – שבת</span>
            <span className={s.value}>07:00 – 18:30</span>
          </div>
          <div className={s.icon}>🕐</div>
        </div>

        <div className={s.card}>
          <div className={s.cardInfo}>
            <span className={s.label}>טלפון</span>
            <span className={s.value}>04-9502496</span>
            <a className={s.link} href="tel:04-9502496">
              📞 התקשר עכשיו
            </a>
          </div>
          <div className={s.icon}>📱</div>
        </div>

        <div className={s.card}>
          <div className={s.cardInfo}>
            <span className={s.label}>אינסטגרם</span>
            <span className={s.value}>@shehab_bakery</span>
            <a className={s.link} href="https://www.instagram.com/shehab_bakery/" target="_blank" rel="noreferrer">
              📸 עקבו אחרינו
            </a>
          </div>
          <div className={s.icon}>📷</div>
        </div>
      </main>

      <footer className={s.footer}>
        © 2026 Powered by{' '}
        <a href="https://web-reflect.com/" target="_blank" rel="noreferrer">Web Reflect</a>
      </footer>
    </div>
  );
}
