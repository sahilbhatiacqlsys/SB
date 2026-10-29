// src/pages/DocumentsPage.jsx
import "./documents.css";

const DOCS = [
  { title: "Admin Panel SRS", url: "#" },
  { title: "Main Website SRS", url: "#" },
  { title: "API Specification", url: "#" },
];

export default function DocumentsPage() {
  return (
    <section className="documents-page card">
      <h2 className="section-title">Documents</h2>
      <ul className="doc-list">
        {DOCS.map(doc => (
          <li key={doc.title}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
