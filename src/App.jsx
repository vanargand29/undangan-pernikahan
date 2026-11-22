import { useEffect, useRef, useState } from "react";
import GiftSection from "./components/GiftSection.jsx";
import InvitationContent from "./components/InvitationContent.jsx";
import InvitationCover from "./components/InvitationCover.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import RSVPForm from "./components/RSVPForm.jsx";
import WishForm from "./components/WishForm.jsx";
import { invitation } from "./content/invitation.js";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const invitationRef = useRef(null);

  useEffect(() => {
    if (isOpen) invitationRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  return (
    <>
      <InvitationCover
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
      />
      <main ref={invitationRef} tabIndex={-1} className={`invitation${isOpen ? " invitation--open" : ""}`} inert={!isOpen}>
        <InvitationContent />
        <RSVPForm />
        <WishForm />
        <GiftSection gift={invitation.gift} />
        <footer className="footer">
          <span aria-hidden="true">✳</span>
          <p>Terima kasih telah menjadi bagian dari cerita kami.</p>
          <small>{invitation.bride.shortName} &amp; {invitation.groom.shortName} · {invitation.year}</small>
        </footer>
      </main>
      <MusicPlayer
        audioSrc={invitation.audioSrc}
        available={invitation.audioAvailable}
        shouldPlay={isOpen}
      />
    </>
  );
}
