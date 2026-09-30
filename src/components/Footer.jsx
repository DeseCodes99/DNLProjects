import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer>
      <div>
        <div className="brand foot">
          DNL <span>PROJECTS</span>
        </div>
        <p>
          Plastering, gyprock installation and interior repairs across Sydney.
        </p>
      </div>
      <div>
        <b>NAVIGATE</b>
        <a href="#services">Services</a>
        <a href="#work">Our work</a>
        <a href="#about">About</a>
        <a href="#/contact">Contact us</a>
      </div>
      <div>
        <b>CONTACT</b>
        <a href="tel:+61450843823">0450 843 823</a>
        <a href="mailto:dnlprojects.nsw@gmail.com" className="footerEmail">dnlprojects.nsw@gmail.com</a>
        <a
          href="https://www.instagram.com/dnlprojects.nsw/?hl=en"
          target="_blank"
          rel="noreferrer"
        >
          <ArrowUpRight size={15} aria-hidden="true" /> Instagram
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61594108176021"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight size={15} aria-hidden="true" /> Facebook
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
      <div className="copyright">
        © 2026 DNL Projects
        <br />
        Sydney, NSW
      </div>
    </footer>
  );
}
