const services = [
  [
    "01",
    "GYPROCK INSTALLATION",
    "Walls and ceilings measured, cut and fixed with clean, accurate lines.",
  ],
  [
    "02",
    "SETTING & SANDING",
    "Professional joint finishing for smooth surfaces that are ready for paint.",
  ],
  [
    "03",
    "REPAIRS & PATCHING",
    "Neat repairs for holes, cracks, damaged plasterboard and problem areas.",
  ],
  [
    "04",
    "CORNICE WORK",
    "Cornice installation, replacement and repairs with sharp joins and alignment.",
  ],
  [
    "05",
    "PAINTING",
    "Interior painting with careful preparation, clean coverage and a professional finish.",
  ],
];
export default function Services() {
  return (
    <section className="services" id="services">
      <p className="eyebrow dark">WHAT WE DO</p>
      <div className="sectionHead">
        <h2>OUR SERVICES</h2>
        <p>
          Practical plastering solutions for new work, renovations and repairs.
        </p>
      </div>
      <div className="serviceList">
        {services.map(([n, t, d]) => (
          <article key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
