import { ArrowDown, ArrowRight } from "lucide-react";
export default function Hero() {
  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="heroContent">
        <p className="eyebrow">PROFESSIONAL PLASTERING · SYDNEY</p>
        <h1>
          QUALITY FINISHES.
          <br />
          FAIR PRICES.
        </h1>
        <p className="lead">
          Professional plasterboard installation, setting, sanding and repairs
          for Sydney homes, renovations and commercial projects.
        </p>
        <div className="actions">
          <a className="btn light" href="#/contact">
            GET A FREE QUOTE <ArrowRight size={17} />
          </a>
          <a className="textBtn" href="#work">
            VIEW OUR WORK <ArrowDown size={17} />
          </a>
        </div>
      </div>
      <div className="tags">
        <span>RESIDENTIAL</span>
        <span>COMMERCIAL</span>
        <span>RENOVATIONS</span>
        <span>REPAIRS</span>
      </div>
    </section>
  );
}
