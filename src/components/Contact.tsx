import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Contact() {
  const cards = [
    {
      label: "Call or WhatsApp",
      value: site.phoneDisplay,
      href: `tel:${site.phoneE164}`,
      icon: <PhoneIcon />,
    },
    {
      label: "Email us",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <MailIcon />,
    },
    {
      label: "Follow on Facebook",
      value: "Tips, updates & more",
      href: site.facebook,
      icon: <FacebookIcon />,
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <div className="panel overflow-hidden">
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-bolt/10 blur-3xl"
            />
            <div className="relative">
              <Reveal>
                <p className="eyebrow">Get in touch</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-chalk sm:text-4xl">
                  Let&apos;s get your <span className="text-bolt">power sorted.</span>
                </h2>
                <p className="mt-4 max-w-sm text-chalk-dim">
                  Phone, WhatsApp or email — whatever&apos;s easiest. For breakdowns after
                  hours, call and we&apos;ll do our best to help.
                </p>

                <dl className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chalk-faint">
                      Hours
                    </dt>
                    <dd className="text-sm text-chalk">{site.hours.label}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chalk-faint">
                      After hours
                    </dt>
                    <dd className="flex items-center gap-2 text-sm text-chalk">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bolt opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-bolt" />
                      </span>
                      {site.hours.note}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="relative flex flex-col gap-3">
              {cards.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-ink-line bg-ink/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-bolt/50"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bolt/12 text-bolt transition-colors group-hover:bg-bolt group-hover:text-ink">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-chalk-faint">
                        {c.label}
                      </span>
                      <span className="block truncate font-display text-lg font-bold text-chalk">
                        {c.value}
                      </span>
                    </span>
                    <svg
                      className="ml-auto shrink-0 text-chalk-faint transition-transform group-hover:translate-x-1 group-hover:text-bolt"
                      width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-bolt mt-2 w-full !py-4">
                  Message us on WhatsApp
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5c0-1 1-2 2-2h1.5c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8 9c1 2 2.5 3.5 4.5 4.5l1.1-1c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V19c0 1-1 2-2 2C11 21 3 13 4 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3l.5-3H14V4.5c0-.8.3-1.5 1.5-1.5H17V.5C16.7.4 15.7.3 14.6.3 12.3.3 10.8 1.7 10.8 4.2V6H8v3h2.8v9h3.2V9Z" />
    </svg>
  );
}
