import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import SocialIcon from '../components/SocialIcon.jsx';
import { TEAM } from '../data/team.js';
import { Emphasis, TitleCase } from '../components/CopyStyle.jsx';

const initials = (name) => name.split(/\s+/).filter(Boolean).map(part => part[0]).slice(0, 2).join('');

function TeamDescription({ member }) {
  const position = member.description.indexOf(member.highlight);
  if (position < 0) return <Emphasis>{member.description}</Emphasis>;
  return <Emphasis>{member.description.slice(0, position)}<strong><TitleCase>{member.highlight}</TitleCase></strong>{member.description.slice(position + member.highlight.length)}</Emphasis>;
}

export default function Team() {
  return (
    <>
      <Seo title="Our Team" />
      <header className="wrap team-intro">
        <div className="label">Our Team</div>
        <h1>The People Behind Anvexa</h1>
        <p>Meet the team working across security, operations, product engineering and customer support.</p>
      </header>
      <section className="wrap team-section" aria-label="Anvexa team members">
        <div className="team-grid">
          {[...TEAM].sort((a, b) => a.order - b.order).map((member, index) => (
            <Reveal as="article" className="ab team-card" key={member.linkedin} delay={(index % 4) * 70}>
              <svg className="team-border-trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x=".5" y=".5" width="99" height="99" rx="4" vectorEffect="non-scaling-stroke" /></svg>
              <div className="team-portrait">
                {member.photo
                  ? <img src={member.photo} alt={member.name} width="320" height="320" loading="lazy" style={{ objectPosition: member.photoPosition || 'center top', transform: member.photoScale ? `scale(${member.photoScale})` : undefined, transformOrigin: member.photoOrigin || 'center center' }} />
                  : <span className="team-initials" aria-hidden="true">{initials(member.name)}</span>}
              </div>
              <div className="team-card-content">
                <h2>{member.name}</h2>
                <p className="team-role"><strong><TitleCase>{member.role}</TitleCase></strong></p>
                <p className="team-description"><TeamDescription member={member} /></p>
                <a className="team-linkedin" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn (opens in a new tab)`}>
                  <SocialIcon name="linkedin" /> <span className="team-link-label">LinkedIn Profile</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
