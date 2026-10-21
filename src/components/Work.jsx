import { ArrowRight } from "lucide-react";
import jobs from "../galleryData.json";

const selected = [jobs[19], jobs[7], jobs[17]];
export default function Work() {
  return (
    <section className="work" id="work">
      <p className="eyebrow">SELECTED WORK</p>
      <h2>
        CLEAN LINES.
        <br />
        SMOOTH RESULTS.
      </h2>
      <p className="muted">
        Real projects. Careful preparation. A finish that makes a difference.
        Take a look at our recent plastering and repair work.
      </p>
      <div className="workGrid">
        {selected.map((job) => (
          <a
            className="project"
            href="#/work"
            key={job.id}
            aria-label={"View our work: " + job.title}
          >
            <img
              className="projectImage"
              src={import.meta.env.BASE_URL + job.photos.at(-1).src}
              alt={job.title}
              loading="lazy"
            />
            <div className="projectShade" />
            <div className="projectText">
              <span>{job.category.toUpperCase()}</span>
              <h3>{job.title}</h3>
              <p>
                Explore our work <ArrowRight size={15} />
              </p>
            </div>
          </a>
        ))}
      </div>
      <div className="workMore">
        <p>See the progress. Explore the details.</p>
        <a href="#/work" className="btn light">
          SEE MORE OF OUR WORK <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
