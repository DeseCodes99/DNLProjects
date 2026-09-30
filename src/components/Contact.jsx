import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Phone, Mail, ArrowUpRight } from "lucide-react";
import { isContactConfigured, sendEnquiry } from "../contactDelivery";
import "../contact.css";

const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const lock = useRef(false);
  const feedback = useRef(null);
  const configured = isContactConfigured(config);
  useEffect(() => {
    const title = document.title;
    document.title = "Contact | DNL Projects";
    return () => { document.title = title; };
  }, []);
  useEffect(() => { if (status === "success" || status === "error") feedback.current?.focus(); }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (lock.current || !configured) return;
    const form = event.currentTarget;
    lock.current = true;
    setStatus("sending");
    try {
      await sendEnquiry(Object.fromEntries(new FormData(form)), config);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally { lock.current = false; }
  }

  return <main id="top" className="contactPage">
    <header className="contactHero">
      <a className="galleryBack" href="#top"><ArrowLeft size={16} /> Back to home</a>
      <p className="eyebrow">DNL PROJECTS / CONTACT</p>
      <h1>LET’S TALK<br /><span>ABOUT YOUR PROJECT.</span></h1>
      <p>From a small repair to a fresh start. Tell us what you have in mind and we’ll discuss the next steps.</p>
    </header>
    <div className="contactLayout">
      <aside className="contactDetails" aria-label="Contact details">
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>A good finish starts<br />with a conversation.</h2>
        <a className="contactMethod" href="tel:+61450843823"><Phone size={21} /><span><small>CALL US</small>0450 843 823</span></a>
        <a className="contactMethod" href="mailto:dnlprojects.nsw@gmail.com"><Mail size={21} /><span><small>EMAIL US</small>dnlprojects.nsw@gmail.com</span></a>
        <div className="contactArea"><small>SERVICE AREA</small><p>Sydney, NSW</p><p>Residential, commercial, renovations and repairs.</p></div>
        <div className="contactSocials">
          <a href="https://www.instagram.com/dnlprojects.nsw/?hl=en" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={18} /> Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61594108176021" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={18} /> Facebook</a>
        </div>
        <a className="contactPortfolio" href="#/work">Explore our recent work <ArrowRight size={17} /></a>
      </aside>
      <section className="contactFormPanel" aria-labelledby="enquiry-title">
        <p className="eyebrow">TELL US WHAT YOU NEED</p>
        <h2 id="enquiry-title">Send an enquiry.</h2>
        <p className="contactHint">Share a few details about your job. Fields marked * are required.</p>
        {!configured && <p className="contactNotice" role="status">Online enquiries are coming soon. For now, please <a href="tel:+61450843823">call 0450 843 823</a> or <a href="mailto:dnlprojects.nsw@gmail.com">email us directly</a>.</p>}
        <form onSubmit={submit}>
          <fieldset disabled={!configured || status === "sending" || status === "success"}>
            <div className="contactFields">
              <label>Your name *<input name="name" autoComplete="name" required maxLength={100} /></label>
              <label>Email address *<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
              <label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
              <label>Suburb <span>(optional)</span><input name="suburb" autoComplete="address-level2" maxLength={100} /></label>
              <label className="contactWide">What can we help with?<select name="service" defaultValue="General enquiry"><option>General enquiry</option><option>Gyprock installation</option><option>Setting and sanding</option><option>Repairs and patching</option><option>Cornice work</option><option>Painting</option></select></label>
              <label className="contactWide">Your message *<textarea name="message" rows={6} required minLength={10} maxLength={5000} placeholder="Tell us about the work, the location and your preferred timing." /></label>
            </div>
            <div className="contactTrap" aria-hidden="true"><label>Leave this blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <p className="contactPrivacy">Your details will be used to respond to your enquiry. Please do not include sensitive personal information.</p>
            <button className="contactSubmit btn" type="submit">{status === "sending" ? "SENDING…" : "SEND ENQUIRY"}<ArrowRight size={17} /></button>
          </fieldset>
          {status === "success" && <div className="contactFeedback success" role="status" ref={feedback} tabIndex={-1}><strong>Thank you—your enquiry has been submitted.</strong><p>Please check your inbox and spam folder for an acknowledgement. This confirms submission, not that your message has been read.</p><button type="button" onClick={() => setStatus("idle")}>Send another enquiry</button></div>}
          {status === "error" && <div className="contactFeedback error" role="alert" ref={feedback} tabIndex={-1}><strong>We couldn’t confirm your submission.</strong><p>Your message is still here. Check your inbox before retrying, or <a href="tel:+61450843823">call 0450 843 823</a> or <a href="mailto:dnlprojects.nsw@gmail.com">email us directly</a>.</p></div>}
        </form>
      </section>
    </div>
  </main>;
}
