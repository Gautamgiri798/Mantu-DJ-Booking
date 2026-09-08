import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * 1. Party DJ: Modern DJ Turntable with circular platter, center spindle, tone-arm, and pitch control.
 */
export function DJTurntableIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="3" width="20" height="18" rx="3" />
      <circle cx="10" cy="12" r="5.5" />
      <circle cx="10" cy="12" r="1.75" />
      <circle cx="10" cy="12" r="0.5" fill="currentColor" />
      <path d="M19 7v5l-3 2" />
      <circle cx="19" cy="6" r="1" />
      <line x1="18" y1="16" x2="18" y2="19" />
      <circle cx="15.5" cy="17.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

/**
 * 2. Reception / Wedding DJ: Interlocking elegant wedding rings with diamond facet & sparkle.
 */
export function WeddingRingsIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9" cy="14" r="5.2" />
      <circle cx="15.2" cy="13" r="5.2" />
      <path d="M15.2 4.5l-1.8 3.3h3.6l-1.8-3.3z" />
      <line x1="15.2" y1="2" x2="15.2" y2="3.5" />
      <line x1="12" y1="3" x2="13" y2="4.2" />
      <line x1="18.4" y1="3" x2="17.4" y2="4.2" />
    </svg>
  );
}

/**
 * 3. Birthday DJ: Tiered celebration birthday cake with candles and flames.
 */
export function BirthdayCakeIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 21h20" />
      <path d="M4 21v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
      <path d="M4 17c1.5 1 2.5-1 4 0s2.5-1 4 0 2.5-1 4 0 2.5-1 4 0" />
      <path d="M7 14V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5" />
      <line x1="10" y1="7" x2="10" y2="4.5" />
      <line x1="14" y1="7" x2="14" y2="4.5" />
      <path d="M10 3.5c-.6-.7 0-1.5 0-1.5s.6.8 0 1.5z" fill="currentColor" />
      <path d="M14 3.5c-.6-.7 0-1.5 0-1.5s.6.8 0 1.5z" fill="currentColor" />
    </svg>
  );
}

/**
 * 4. College / Farewell DJ: Graduation mortarboard cap with hanging tassel.
 */
export function GraduationCapIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
      <path d="M22 10v6l-1.5 1" />
    </svg>
  );
}

/**
 * 5. Club / Night Party DJ: Faceted mirror disco ball with luminous rays.
 */
export function DiscoClubIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="1" x2="12" y2="4" />
      <circle cx="12" cy="12" r="7.5" />
      <line x1="4.5" y1="12" x2="19.5" y2="12" />
      <path d="M6 8.5h12" />
      <path d="M6 15.5h12" />
      <path d="M8.5 6v12" />
      <path d="M12 4.5v15" />
      <path d="M15.5 6v12" />
      <path d="M3 5l1 1-1 1-1-1z" fill="currentColor" />
      <path d="M21 7l.8.8-.8.8-.8-.8z" fill="currentColor" />
      <path d="M20 18l.8.8-.8.8-.8-.8z" fill="currentColor" />
    </svg>
  );
}

/**
 * 6. Corporate Event DJ: Keynote presentation screen and executive speech podium.
 */
export function CorporateEventIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="11" rx="2" />
      <path d="M7 8l3 3 3-2 4 4" />
      <path d="M12 14v6" />
      <path d="M8 20h8" />
      <circle cx="12" cy="6" r="0.75" fill="currentColor" />
    </svg>
  );
}

/**
 * 7. Sangeet DJ: Musical notes with rhythmic celebration dance wave.
 */
export function SangeetMusicIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="14" r="3" />
      <path d="M10 17V6l10-3v11" />
      <path d="M10 9.5l10-3" />
      <path d="M2 11c1-1 2-1 3 0s2 1 3 0" />
      <path d="M18 19c1-1 2-1 3 0" />
    </svg>
  );
}

/**
 * 8. Wedding DJ: Royal matrimony mandap with sacred ceremonial arch and wedding rings.
 */
export function RoyalWeddingIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 21V10a8 8 0 0 1 16 0v11" />
      <path d="M12 2v2" />
      <circle cx="12" cy="2" r="1" fill="currentColor" />
      <circle cx="9.5" cy="15" r="2.8" />
      <circle cx="14.5" cy="15" r="2.8" />
      <path d="M2 21h4" />
      <path d="M18 21h4" />
    </svg>
  );
}

/**
 * 9. Anniversary DJ: Interlocking milestone romance hearts with celebration star.
 */
export function AnniversaryMilestoneIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 7C6.5 4.5 3 6.5 3 9.5c0 4.5 6 8.5 6 8.5s6-4 6-8.5c0-3-3.5-5-6-2.5z" />
      <path d="M15 7c2.5-2.5 6-.5 6 2.5 0 4.5-6 8.5-6 8.5" />
      <path d="M12 2l.7 1.3L14 4l-1.3.7L12 6l-.7-1.3L10 4l1.3-.7z" fill="currentColor" />
    </svg>
  );
}

/**
 * 10. Private Party DJ: Private luxury villa and rooftop terrace lounge.
 */
export function PrivatePartyVillaIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <rect x="8" y="13" width="8" height="8" />
      <line x1="12" y1="13" x2="12" y2="21" />
      <circle cx="12" cy="7" r="1.5" />
      <path d="M12 5v.5" />
    </svg>
  );
}

/**
 * 11. Festival / Cultural Event DJ: Arena festival tent and stage with overhead laser beams.
 */
export function FestivalCulturalIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 20h20" />
      <path d="M12 3L3 18h18L12 3z" />
      <path d="M9 18c0-2 1.3-4 3-4s3 2 3 4" />
      <line x1="12" y1="3" x2="5" y2="1" strokeDasharray="1 1" />
      <line x1="12" y1="3" x2="19" y2="1" strokeDasharray="1 1" />
      <path d="M12 3v-2l3 1-3 1" fill="currentColor" />
    </svg>
  );
}

/**
 * 12. DJ + Live Performer: Studio/stage vocal condenser microphone with acoustic projection.
 */
export function LivePerformerIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="12" y1="2" x2="12" y2="13" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <path d="M2 8c0-1 .5-2 1.5-2.5" />
      <path d="M22 8c0-1-.5-2-1.5-2.5" />
    </svg>
  );
}

/**
 * 13. DJ + Sound & Lighting: Touring speaker line array stack + moving head beam spotlight.
 */
export function SoundLightingRigIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h20" />
      <path d="M4 3l2 3h12l2-3" />
      <rect x="15" y="6" width="6" height="5" rx="1.5" />
      <path d="M18 11l2 9h-6l2-9" strokeDasharray="1 1" />
      <rect x="3" y="7" width="8" height="3" rx="0.5" />
      <rect x="3.5" y="11" width="7.5" height="3" rx="0.5" />
      <rect x="4" y="15" width="7" height="3" rx="0.5" />
      <rect x="2" y="19" width="10" height="3" rx="1" />
      <circle cx="7" cy="20.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

/**
 * 14. Baraat DJ: Traditional Indian Wedding Dhol drum with tension ropes and sticks.
 */
export function BaraatProcessionIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="6" cy="12" rx="2" ry="5" />
      <ellipse cx="18" cy="12" rx="2" ry="5" />
      <path d="M6 7h12" />
      <path d="M6 17h12" />
      <path d="M6 7l6 10 6-10" />
      <path d="M6 17l6-10 6 10" />
      <path d="M3 6l3 3" />
      <path d="M2 5a1 1 0 0 1 1.5-.5" />
      <path d="M21 7l-3 3" />
    </svg>
  );
}

/**
 * Category Icon: Concerts & Stage
 */
export function ConcertStageIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 3l3 2" />
      <path d="M5.5 4L2 15h6L5.5 4z" strokeDasharray="1 1" />
      <path d="M20 3l-3 2" />
      <path d="M18.5 4L22 15h-6l2.5-11z" strokeDasharray="1 1" />
      <path d="M2 19l4-3h12l4 3" />
      <path d="M2 19v2h20v-2" />
      <circle cx="12" cy="9" r="2" />
      <path d="M12 11v5" />
      <path d="M10 16h4" />
    </svg>
  );
}
