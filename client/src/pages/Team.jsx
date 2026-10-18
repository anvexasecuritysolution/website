import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import SocialIcon from '../components/SocialIcon.jsx';
import { TEAM } from '../data/team.js';
import { TitleCase } from '../components/CopyStyle.jsx';

const initials = (name) => name.split(/\s+/).filter(Boolean).map(part => part[0]).slice(0, 2).join('');

function TeamDescription({ member }) {
  const phrases = member.highlights || [];
  const parts = phrases.reduce((segments, phrase) => segments.flatMap((segment) => {
    if (typeof segment !== 'string') return segment;
    return segment.split(phrase).flatMap((text, index) => index
      ? [<strong key={`${phrase}-${index}`}><TitleCase>{phrase}</TitleCase></strong>, text]
      : [text]);
  }), [member.description]);
  return <>{parts.map((part, index) => <span key={index}>{part}</span>)}</>;
}

export default function Team() {
  return (
    <>
      <Seo title="Our Team" />
      <Reveal as="header" className="wrap team-intro team-intro-animated">
        <div className="label">Our Team</div>
        <h1>The People Behind Anvexa</h1>
        <p>Meet the <strong>People Behind Anvexa</strong>, combining backgrounds in <strong>Cyber Security, Software Development and Business Operations</strong>. We work together to understand your requirements, assess security risks, guide <strong>Practical Fixes</strong> and verify agreed changes while keeping your <strong>Business Priorities</strong> in focus.</p>
      </Reveal>
      <section className="wrap team-section" aria-label="Anvexa team members">
        <div className="team-grid">
          {[...TEAM].sort((a, b) => a.order - b.order).map((member, index) => (
            <Reveal className="team-reveal-wrapper" key={member.linkedin} delay={(index % 4) * 70}>
              <article className="ab team-card team-motion-selected">
              <div className="team-portrait">
                <div className="team-photo-stage">
                {member.photo
                  ? <img src={member.photo} alt={member.name} width="320" height="320" loading="lazy" style={{ objectPosition: member.photoPosition || 'center top', transform: member.photoScale ? `scale(${member.photoScale})` : undefined, transformOrigin: member.photoOrigin || 'center center' }} />
                  : <span className="team-initials" aria-hidden="true">{initials(member.name)}</span>}
                </div>
              </div>
              <div className="team-card-content">
                <h2>{member.name}</h2>
                <p className="team-role"><strong><TitleCase>{member.role}</TitleCase></strong></p>
                <p className="team-description"><TeamDescription member={member} /></p>
                <a className="team-linkedin" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn (opens in a new tab)`}>
                  <SocialIcon name="linkedin" /> <span className="team-link-label">LinkedIn Profile</span>
                </a>
              </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
