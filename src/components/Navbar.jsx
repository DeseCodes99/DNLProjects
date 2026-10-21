import logo from "../Gallery/Logo/blueDNLlogo.png";

export default function Navbar() {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <img src={logo} alt="DNL Plastering" />
      </a>
      <nav>
        <a href="#services">SERVICES</a>
        <a href="#work">OUR WORK</a>
        <a href="#about">ABOUT</a>
        <a className="navCta" href="#/contact">
          GET A FREE QUOTE
        </a>
      </nav>
    </header>
  );
}
