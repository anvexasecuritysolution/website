import {
  TriangleAlert, Link2, ClipboardList, Award, Search, ShieldCheck, Wrench, Radar, FileCheck2, Archive,
  Landmark, Lock, Building2, BadgeCheck, Megaphone, Mail, Phone, MapPin, Clock, RefreshCw, ScanSearch, ShieldAlert,
} from 'lucide-react';

const MAP = {
  alert: TriangleAlert, link: Link2, clipboard: ClipboardList, award: Award, search: Search, shield: ShieldCheck,
  wrench: Wrench, radar: Radar, filecheck: FileCheck2, vault: Archive, landmark: Landmark, lock: Lock,
  building: Building2, badge: BadgeCheck, megaphone: Megaphone, mail: Mail, phone: Phone, pin: MapPin,
  clock: Clock, refresh: RefreshCw, scan: ScanSearch, shieldalert: ShieldAlert,
};

// Blog topics → icon
export const TAG_ICON = { Compliance: 'clipboard', DPDP: 'lock', VAPT: 'scan', Monitoring: 'radar', Sector: 'landmark', AppSec: 'shieldalert' };

export default function Icon({ name, size = 22 }) {
  const C = MAP[name] || ShieldCheck;
  return <C size={size} strokeWidth={1.75} aria-hidden="true" />;
}
