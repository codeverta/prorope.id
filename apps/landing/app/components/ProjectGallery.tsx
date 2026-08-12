"use client";

import { useMemo, useState } from "react";

type Project = {
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
};

type ProjectGalleryProps = {
  projects: Project[];
};

const filters = ["All work", "Cleaning", "Inspection", "Maintenance", "Painting", "Training"] as const;

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All work");

  const visibleProjects = useMemo(
    () => projects
      .map((project, originalIndex) => ({ project, originalIndex }))
      .filter(({ project }) => activeFilter === "All work" || project.category === activeFilter),
    [activeFilter, projects],
  );

  return <>
    <div className="shell project-filter" role="group" aria-label="Project filters">
      <span>Filter</span>
      {filters.map(filter => <button
        type="button"
        className={activeFilter === filter ? "active" : ""}
        aria-pressed={activeFilter === filter}
        key={filter}
        onClick={() => setActiveFilter(filter)}
      >{filter}</button>)}
    </div>

    {visibleProjects.length > 0 ? <div className="shell project-grid" aria-live="polite">
      {visibleProjects.map(({ project, originalIndex }, visibleIndex) => <article
        className={visibleIndex % 3 === 0 ? "wide" : ""}
        key={project.title}
      >
        <div style={{ backgroundImage: `url(${project.image})` }}>
          <span>{String(originalIndex + 1).padStart(2, "0")}</span>
        </div>
        <p>{project.category} · {project.year}</p>
        <h2>{project.title}</h2>
        <small>{project.location}</small>
      </article>)}
    </div> : <p className="shell project-grid__empty" role="status">Belum ada proyek dalam kategori ini.</p>}
  </>;
}
