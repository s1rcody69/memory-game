export const SettingsModal = ({ settings, onChange, onClose, DIFFICULTY_CONFIG }) => {
  const themes = [
    { key: "flags",    label: "African Flags",    desc: "Country flags" },
    { key: "wildlife", label: "African Wildlife",  desc: "Photos of animals"  },
    { key: "fruits",   label: "Tropical Fruits",   desc: "Fruit emoji cards" },
  ];
 
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Settings</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
 
        <div className="settings-section">
          <h3 className="settings-section__title">Difficulty</h3>
          <div className="settings-options">
            {Object.entries(DIFFICULTY_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                className={`option-btn ${settings.difficulty === key ? "option-btn--active" : ""}`}
                onClick={() => onChange({ difficulty: key })}
              >
                <span className="option-btn__label">{cfg.label}</span>
                <span className="option-btn__desc">{cfg.pairs} pairs</span>
              </button>
            ))}
          </div>
        </div>
 
        <div className="settings-section">
          <h3 className="settings-section__title">Card Theme</h3>
          <div className="settings-options settings-options--col">
            {themes.map((t) => (
              <button
                key={t.key}
                className={`option-btn option-btn--row ${settings.theme === t.key ? "option-btn--active" : ""}`}
                onClick={() => onChange({ theme: t.key })}
              >
                <span className="option-btn__label">{t.label}</span>
                <span className="option-btn__desc">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
 
        <p className="settings-note">Changes apply when you start a new game.</p>
 
        <div className="modal__actions">
          <button className="btn btn--primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};