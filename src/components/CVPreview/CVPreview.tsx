import type { Resume } from "@/types/resume";

interface CVPreviewProps {
  resume: Resume;
  lang?: "en" | "ar";
}

export function CVPreview({ resume, lang = "en" }: CVPreviewProps) {
  const c = resume.contact;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="min-h-[600px] max-w-[210mm] rounded border border-slate-200 bg-white p-8 text-base text-slate-800 print:border-0 print:shadow-none"
      style={{ fontFamily: lang === "ar" ? "var(--font-sans-ar)" : "var(--font-sans-en)" }}
    >
      <header className="border-b border-slate-300 pb-4">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          {c.fullName || "Your Name"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {[c.email, c.phone, c.location].filter(Boolean).join(" · ")}
        </p>
      </header>

      {resume.summary && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Summary
          </h2>
          <p className="mt-1 text-slate-700">{resume.summary}</p>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Skills
          </h2>
          <p className="mt-1 text-slate-700">
            {resume.skills.join(", ")}
          </p>
        </section>
      )}

      {resume.experience.filter((e) => e.jobTitle || e.company).length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Experience
          </h2>
          {resume.experience
            .filter((e) => e.jobTitle || e.company)
            .map((exp) => (
              <div key={exp.id} className="mt-4">
                <div className="flex justify-between">
                  <span className="font-medium">{exp.jobTitle}</span>
                  <span className="text-sm text-slate-500">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-slate-600">{exp.company}</p>
                <ul className="mt-1 list-disc pl-5">
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={`${exp.id}-${i}`}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
        </section>
      )}

      {resume.education.filter((e) => e.degree || e.institution).length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Education
          </h2>
          {resume.education
            .filter((e) => e.degree || e.institution)
            .map((ed) => (
              <div key={ed.id} className="mt-4">
                <div className="flex justify-between">
                  <span className="font-medium">{ed.degree}</span>
                  <span className="text-sm text-slate-500">
                    {ed.startDate} – {ed.endDate}
                  </span>
                </div>
                <p className="text-slate-600">{ed.institution}</p>
              </div>
            ))}
        </section>
      )}

      {resume.certifications.filter((c) => c.name || c.issuer).length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Certifications
          </h2>
          {resume.certifications
            .filter((c) => c.name || c.issuer)
            .map((cert) => (
              <div key={cert.id} className="mt-4">
                <span className="font-medium">{cert.name}</span>
                <span className="text-slate-600"> – {cert.issuer}</span>
                {cert.date && (
                  <span className="text-sm text-slate-500"> ({cert.date})</span>
                )}
              </div>
            ))}
        </section>
      )}

      {resume.projects?.filter((p) => p.name || p.description).length ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Projects
          </h2>
          {resume.projects
            ?.filter((p) => p.name || p.description)
            .map((p) => (
              <div key={p.id} className="mt-4">
                <span className="font-medium">{p.name}</span>
                <p className="text-slate-600">{p.description}</p>
              </div>
            ))}
        </section>
      ) : null}

      {resume.languages?.filter((l) => l.name).length ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Languages
          </h2>
          <p className="mt-1 text-slate-700">
            {resume.languages
              ?.filter((l) => l.name)
              .map((l) => `${l.name} (${l.proficiency})`)
              .join(", ")}
          </p>
        </section>
      ) : null}
    </div>
  );
}
