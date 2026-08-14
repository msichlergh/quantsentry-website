import Image from "next/image";

import styles from "./CodexaTestimonials.module.css";

const imageRoot =
  "/sites/codexa-framer-website-9c43da05/root-8a5edab2/images";

const testimonials = [
  {
    quote:
      "Setup was fast and seamless — our entire workflow became instantly cleaner and more organized.",
    name: "Sarah Lewis",
    role: "Backend Developer",
    image: "testimonial-sarah.png",
  },
  {
    quote:
      "We replaced multiple internal tools with one platform and doubled our delivery speed with confidence.",
    name: "James Parker",
    role: "Product Engineer",
    image: "testimonial-james.png",
  },
  {
    quote:
      "Real-time insights reveal issues early, helping us ship fixes much faster and more reliably.",
    name: "Anika Reddy",
    role: "Software Developer",
    image: "testimonial-anika.png",
  },
  {
    quote:
      "Built-in automation saved us hours of scripting and eliminated manual workflows completely.",
    name: "David Kim",
    role: "Tech Lead",
    image: "testimonial-david.png",
  },
  {
    quote:
      "Shared environments keep our team aligned effortlessly without conflicts or unnecessary friction.",
    name: "Laura Martinez",
    role: "Engineering Manager",
    image: "testimonial-laura.png",
  },
  {
    quote:
      "The platform feels reliable and fast — we scale with less overhead and far greater stability.",
    name: "Omar Ali",
    role: "Full-Stack Developer",
    image: "testimonial-omar.png",
  },
] as const;

const trustLogos = Array.from(
  { length: 7 },
  (_, index) => `${imageRoot}/trusted-logo-0${index + 1}.png`,
);

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className={styles.card}>
      <div>
        <div className={styles.stars} aria-label="5 out of 5 stars">
          <span aria-hidden="true">★★★★★</span>
        </div>
        <blockquote>“{testimonial.quote}”</blockquote>
      </div>

      <footer>
        <Image
          src={`${imageRoot}/${testimonial.image}`}
          width={45}
          height={45}
          alt=""
        />
        <div>
          <cite>{testimonial.name}</cite>
          <span>{testimonial.role}</span>
        </div>
      </footer>
    </article>
  );
}

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={styles.logoSet} aria-hidden={duplicate || undefined}>
      {trustLogos.map((logo, index) => (
        <Image
          key={logo}
          src={logo}
          width={96}
          height={96}
          alt={duplicate ? "" : `Trusted team ${index + 1}`}
        />
      ))}
    </div>
  );
}

export function CodexaTestimonials() {
  return (
    <section className={styles.section} aria-labelledby="codexa-testimonials-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p>TESTIMONIALS</p>
          <h2 id="codexa-testimonials-title">Trusted by developers</h2>
        </header>

        <div className={styles.content}>
          <div className={styles.grid}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>

          <div className={styles.trustStrip}>
            <p>TRUSTED BY TEAMS WORLDWIDE</p>
            <div className={styles.marquee}>
              <div className={styles.marqueeTrack}>
                <LogoSet />
                <LogoSet duplicate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
