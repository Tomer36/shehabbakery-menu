import s from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={s.hero}>
      <span className={s.title}>Shehab Bakery</span>
      <span className={s.tagline}>· מאפייה ביתית · טריות בכל ביס</span>
    </div>
  );
}
