export default function InvitationCover({ isOpen, onOpen }) {
  return (
    <section
      className={`cover${isOpen ? " cover--opening" : ""}`}
      aria-label="Sampul undangan pernikahan"
      aria-hidden={isOpen}
      inert={isOpen}
    >
      <img
        className="cover__image"
        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
        width="2200"
        height="1467"
        fetchPriority="high"
        alt=""
      />
      <div className="cover__shade" aria-hidden="true" />
      <div className="cover__copy">
        <p className="eyebrow cover__eyebrow">Sebuah hari istimewa</p>
        <h1>Undangan<br />Pernikahan</h1>
        <p className="cover__names">Alya <span>&amp;</span> Raka</p>
        <p className="cover__date">Senin, 18 Oktober 2027</p>
        <button className="button button--light" type="button" onClick={onOpen}>
          Buka Undangan <span aria-hidden="true">↓</span>
        </button>
      </div>
      <p className="cover__photo-note">Foto sampul masih contoh</p>
    </section>
  );
}
