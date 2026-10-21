import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Plus } from "lucide-react";
import jobs from "../galleryData.json";

const photoUrl = (path) => import.meta.env.BASE_URL + path;
const filters = [
  "All work",
  "Ceilings",
  "Walls & windows",
  "Outdoor",
  "Room finishes",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const visible = jobs.filter(
    (job) => filter === "All work" || job.category === filter,
  );
  const job = selected && jobs.find((item) => item.id === selected.job);
  const photo = job?.photos[selected.index];
  const isOpen = Boolean(selected);
  useEffect(() => {
    const previous = document.title;
    document.title = "Our work | DNL Projects";
    return () => {
      document.title = previous;
    };
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  function openPhoto(event, jobId, index) {
    opener.current = event.currentTarget;
    setSelected({ job: jobId, index });
    dialog.current.showModal();
  }
  function step(direction) {
    setSelected((current) => ({
      ...current,
      index:
        (current.index + direction + job.photos.length) % job.photos.length,
    }));
  }
  return (
    <main id="top" className="galleryPage">
      <header className="galleryHero">
        <a href="#work" className="galleryBack">
          <ArrowLeft size={16} /> Back to home
        </a>
        <p className="eyebrow">DNL PROJECTS / OUR WORK</p>
        <h1>
          THE DETAILS.
          <br />
          <span>THE DIFFERENCE.</span>
        </h1>
        <div className="galleryIntro">
          <p>
            A closer look at our plastering and repair work. Explore each
            project, from work in progress to the finishing touches.
          </p>
          <span className="galleryCount">60 PHOTOS / 20 PROJECT GROUPS</span>
        </div>
      </header>
      <section className="galleryCollection" aria-label="Project photos">
        <div className="galleryFilters" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="galleryResults" aria-live="polite">
          {visible.length} project {visible.length === 1 ? "group" : "groups"} ·
          Select a photo to take a closer look
        </p>
        {visible.map((item) => (
          <section
            className="galleryJob"
            key={item.id}
            aria-labelledby={"job-" + item.id}
          >
            <div className="galleryJobHeading">
              <span className="galleryNumber">
                {String(item.id).padStart(2, "0")}
              </span>
              <div>
                <p className="eyebrow">{item.category}</p>
                <h2 id={"job-" + item.id}>{item.title}</h2>
              </div>
              <span className="galleryPhotoCount">
                {item.photos.length}{" "}
                {item.photos.length === 1 ? "photo" : "photos"}
              </span>
            </div>
            <div className="galleryPhotoGrid">
              {item.photos.map((image, index) => (
                <button
                  className="galleryPhoto"
                  key={image.src}
                  type="button"
                  onClick={(event) => openPhoto(event, item.id, index)}
                  aria-label={"Enlarge " + image.alt}
                >
                  <img
                    src={photoUrl(image.thumbnail)}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="480"
                  />
                  <span className="galleryPhotoLabel">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Plus size={18} />
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </section>
      <section className="galleryContact">
        <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
        <h2>Let’s get it finished.</h2>
        <a className="btn light" href="#/contact">
          GET A FREE QUOTE <ArrowRight size={17} />
        </a>
      </section>
      <dialog
        ref={dialog}
        className="galleryDialog"
        aria-label={job ? job.title + " photos" : "Project photo"}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
        onClose={() => {
          setSelected(null);
          opener.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" && job?.photos.length > 1) {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft" && job?.photos.length > 1) {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        <button
          className="galleryClose"
          type="button"
          autoFocus
          onClick={() => dialog.current.close()}
          aria-label="Close photo"
        >
          <X />
        </button>
        {photo && (
          <div className="galleryViewer">
            <img src={photoUrl(photo.src)} alt={photo.alt} />
            <div className="galleryViewerFooter">
              <div>
                <strong>{job.title}</strong>
                <p aria-live="polite">
                  Photo {selected.index + 1} of {job.photos.length}
                </p>
              </div>
              {job.photos.length > 1 && (
                <div className="galleryViewerControls">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                  >
                    <ArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
