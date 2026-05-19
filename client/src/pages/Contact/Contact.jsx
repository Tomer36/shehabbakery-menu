import { MapPin, Clock, Phone } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
  </svg>
);
import { useLang } from '../../LangContext';
import s from './Contact.module.scss';
import Header from '../../components/Header/Header';

const content = {
  he: {
    title:       'צור קשר',
    location:    'מיקום',
    city:        'שפרעם',
    waze:        'פתח ב-Waze',
    hours:       'שעות פעילות',
    days:        'שני – שבת',
    time:        '07:00 – 18:30',
    phone:       'טלפון',
    call:        'התקשר עכשיו',
    instagram:   'אינסטגרם',
    follow:      'עקבו אחרינו',
  },
  ar: {
    title:       'تواصل معنا',
    location:    'الموقع',
    city:        'شفاعمرو',
    waze:        'افتح في Waze',
    hours:       'ساعات العمل',
    days:        'الاثنين – السبت',
    time:        '07:00 – 18:30',
    phone:       'هاتف',
    call:        'اتصل الآن',
    instagram:   'انستغرام',
    follow:      'تابعونا',
  },
};

export default function Contact() {
  const lang = useLang();
  const t = content[lang];

  return (
    <div className={s.page}>
      <Header />

      <main className={s.main}>
        <h2 className={s.heading}>{t.title}</h2>

        <div className={s.card}>
          <div className={s.icon}><MapPin size={22} strokeWidth={1.8} /></div>
          <div className={s.cardInfo}>
            <span className={s.label}>{t.location}</span>
            <span className={s.value}>{t.city}</span>
            <a className={s.link} href="https://waze.com/ul/hsvc48762v" target="_blank" rel="noreferrer">
              {t.waze}
            </a>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.icon}><Clock size={22} strokeWidth={1.8} /></div>
          <div className={s.cardInfo}>
            <span className={s.label}>{t.hours}</span>
            <span className={s.value}>{t.days}</span>
            <span className={s.value}>{t.time}</span>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.icon}><Phone size={22} strokeWidth={1.8} /></div>
          <div className={s.cardInfo}>
            <span className={s.label}>{t.phone}</span>
            <span className={s.value}>04-9502496</span>
            <a className={s.link} href="tel:04-9502496">{t.call}</a>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.icon}><InstagramIcon /></div>
          <div className={s.cardInfo}>
            <span className={s.label}>{t.instagram}</span>
            <span className={s.value}>@shehab_bakery</span>
            <a className={s.link} href="https://www.instagram.com/shehab_bakery/" target="_blank" rel="noreferrer">
              {t.follow}
            </a>
          </div>
        </div>
      </main>

      <footer className={s.footer}>
        © 2026 Powered by{' '}
        <a href="https://web-reflect.com/" target="_blank" rel="noreferrer">Web Reflect</a>
      </footer>
    </div>
  );
}
