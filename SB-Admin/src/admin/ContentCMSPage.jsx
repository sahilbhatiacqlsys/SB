import React, { useState, useRef } from "react";

// The 3 required pages: Terms and Conditions, Privacy Policy, About Us
const INITIAL_PAGES = [
  {
    id: "PAGE-1",
    title: "Terms and Conditions",
    slug: "terms-and-conditions",
    status: "published",
    updatedAt: "Today, 12:45 PM",
    icon: "⚖️",
    summary: "Complete legal agreement covering user rights, order policies, warranty, intellectual property, and service terms.",
    content: `# Terms and Conditions

Welcome to **SB (Sound & Beyond)**. By browsing, accessing, or purchasing from our website and services, you agree to be bound by the following Terms and Conditions.

---

### 1. General Agreement
* All users must be at least 18 years old or access the platform under parental supervision.
* We reserve the right to revise or update these terms at any time with immediate effect.

### 2. Orders, Pricing & Payments
* All listed prices include applicable taxes unless specified otherwise.
* SB reserves the right to decline, cancel, or refund any orders flagged for fraudulent behavior or technical pricing discrepancies.
* We accept all standard payment methods: Credit/Debit Cards, UPI, Net Banking, and approved Digital Wallets.

### 3. Shipping & Delivery Terms
* Orders are dispatched within 24 to 48 hours following payment confirmation.
* Transit times range between 2 to 5 business days depending on location.

### 4. Warranty & Return Policy
* Products include a standard **1-Year Limited Replacement Warranty** covering hardware manufacturing defects.
* Returns or exchanges must be initiated within 30 days of receiving the product.

### 5. Intellectual Property
All logos, acoustic technologies, visual media, graphics, and trademarks displayed on this site are the exclusive property of **SB**. Unauthorized duplication or distribution is strictly prohibited.

### 6. Dispute Resolution & Contact
If you have questions or concerns regarding our terms:
* Email: [legal@sb-tech.com](mailto:legal@sb-tech.com)
* Customer Helpdesk: \`support@sb-tech.com\``,
  },
  {
    id: "PAGE-2",
    title: "Privacy Policy",
    slug: "privacy-policy",
    status: "published",
    updatedAt: "Today, 12:40 PM",
    icon: "🛡️",
    summary: "Clear data collection, storage security, GDPR & CCPA privacy protection guidelines and user cookie preferences.",
    content: `# Privacy Policy

**Last Updated:** October 28, 2026

At **SB**, your privacy is of utmost importance to us. This Privacy Policy details how we collect, use, store, and safeguard your personal details when you interact with our website and products.

---

### 1. Information We Collect
We collect personal information that you voluntarily provide to us when you:
* **Account Registration**: Name, email address, password, and contact phone number.
* **Order Processing**: Shipping address, billing information, and transaction references (we do not store raw credit card credentials; all transactions are tokenized via PCI-DSS certified gateways).
* **Automated Data**: IP address, device hardware information, browser type, and cookie identifiers to enhance your browsing experience.

### 2. How We Utilize Your Information
* To fulfill, package, ship, and trace customer orders.
* To provide firmware updates, product recall notices, and warranty registrations.
* To detect and prevent fraudulent transactions and cyber security threats.
* To offer personalized product recommendations and occasional promotional offers (you can unsubscribe anytime).

### 3. Data Protection & Security
We employ industry-standard **AES-256 encryption**, HTTPS transport security, and restricted database access protocols to ensure your data stays safe from unauthorized breaches.

### 4. GDPR & CCPA Compliance
Under global privacy standards, you hold the legal right to:
1. Request a full export copy of your stored personal records.
2. Request permanent erasure ("Right to Be Forgotten") of your account.
3. Opt out of non-essential tracking cookies.

### 5. Privacy Office Inquiries
For data protection inquiries or to request data removal:
* Email: [privacy@sb-tech.com](mailto:privacy@sb-tech.com)`,
  },
  {
    id: "PAGE-3",
    title: "About Us",
    slug: "about-us",
    status: "published",
    updatedAt: "Today, 12:35 PM",
    icon: "🚀",
    summary: "Our company story, relentless acoustic innovation, team ethos, and vision for futuristic high-fidelity hardware.",
    content: `# About Us & Our Mission

Welcome to **SB (Sound & Beyond)**. We are an audio innovation lab and lifestyle engineering studio built for creators, audiophiles, and futuristic visionaries.

---

### Who We Are
Founded in 2024 by acoustic engineers and industrial designers, SB was created with a clear obsession: to bridge the gap between studio-grade audio fidelity and sleek cyber aesthetics.

> "Acoustic perfection is not an accident—it is an exact science sculpted with relentless passion."

### Our Core Values
* **Relentless Innovation**: We engineer bespoke acoustic chambers, beryllium dynamic drivers, and intelligent ambient cancellation systems.
* **Radical Transparency**: 100% recyclable packaging, conflict-free materials, and ethical component manufacturing.
* **Community-Obsessed**: Backed by over 250,000 audiophiles, music producers, and gamers across 45 countries.

### What Sets SB Apart
1. **Zero Compromise Build Quality**: Aerospace-grade aluminum alloys, titanium pivots, and memory comfort fit.
2. **True Sound Clarity**: Flat frequency curve tuning calibrated specifically for studio accuracy.
3. **Direct-to-Customer Value**: Premium performance without excessive markup.

### Connect With Our Team
* Headquarters: Cyber Square, Tech Boulevard
* General Inquiries: [hello@sb-tech.com](mailto:hello@sb-tech.com)
* Founder Office: [founders@sb-tech.com](mailto:founders@sb-tech.com)`,
  },
];

// Parser function that renders raw text, markdown, or HTML tags nicely
function renderMultiFormatText(raw) {
  if (!raw) return <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No content entered yet.</p>;

  // Check if string contains HTML tags
  const hasHtml = /<\/?(h[1-6]|p|div|ul|ol|li|strong|b|em|i|blockquote|pre|code|a|br|hr)[\s>]/i.test(raw);
  if (hasHtml) {
    return (
      <div
        className="cms-preview-rendered"
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }

  // Parse markdown-style formatting or plain text with line breaks
  const lines = raw.split("\n");
  const elements = [];
  let currentList = [];
  let listType = null;
  let inCodeBlock = false;
  let codeBlockLines = [];

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === "ol") {
        elements.push(<ol key={`ol-${elements.length}`}>{currentList}</ol>);
      } else {
        elements.push(<ul key={`ul-${elements.length}`}>{currentList}</ul>);
      }
      currentList = [];
      listType = null;
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockLines.length > 0) {
      elements.push(
        <pre key={`pre-${elements.length}`}>
          <code>{codeBlockLines.join("\n")}</code>
        </pre>
      );
      codeBlockLines = [];
    }
  };

  const formatInline = (text) => {
    if (!text) return "";
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushList();
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushList();
      elements.push(<hr key={`hr-${index}`} />);
      return;
    }

    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(<h1 key={`h1-${index}`}>{formatInline(trimmed.substring(2))}</h1>);
      return;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={`h2-${index}`}>{formatInline(trimmed.substring(3))}</h2>);
      return;
    }
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={`h3-${index}`}>{formatInline(trimmed.substring(4))}</h3>);
      return;
    }

    if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={`bq-${index}`}>
          {formatInline(trimmed.substring(2))}
        </blockquote>
      );
      return;
    }

    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      currentList.push(
        <li key={`li-${index}`}>{formatInline(trimmed.substring(2))}</li>
      );
      return;
    }

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (listType !== "ol") flushList();
      listType = "ol";
      currentList.push(
        <li key={`li-${index}`}>{formatInline(numMatch[2])}</li>
      );
      return;
    }

    flushList();
    elements.push(<p key={`p-${index}`}>{formatInline(line)}</p>);
  });

  flushList();
  if (inCodeBlock) flushCodeBlock();

  return <div className="cms-preview-rendered">{elements}</div>;
}

export default function ContentCMSPage() {
  const [pages, setPages] = useState(INITIAL_PAGES);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Editor mode tab: "write" or "preview"
  const [editorMode, setEditorMode] = useState("write");

  // Textarea ref for inserting formatting tokens at cursor position
  const textareaRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    status: "published",
  });

  const handleOpenEdit = (page) => {
    setItemToEdit(page);
    setEditorMode("write");
    setFormData({
      title: page.title,
      slug: page.slug,
      summary: page.summary || "",
      content: page.content || "",
      status: page.status || "published",
    });
    setShowModal(true);
  };

  // Helper to insert markdown or formatting tokens around selection
  const insertFormatting = (prefix, suffix = "", defaultText = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = formData.content || "";
    const selectedText = currentVal.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);

    setFormData({ ...formData, content: newVal });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setPages(
      pages.map((p) =>
        p.id === itemToEdit.id
          ? {
              ...p,
              title: formData.title,
              slug: formData.slug,
              summary: formData.summary,
              content: formData.content,
              status: formData.status,
              updatedAt: "Just now",
            }
          : p
      )
    );

    setShowModal(false);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: "1.75rem" }}>
        <div className="page-header-left">
          <h1 className="page-title">CMS & Content Studio</h1>
          <p className="page-subtitle">
            Manage Terms & Conditions, Privacy Policy, and About Us. Accepts text in any format (Raw text, Markdown, HTML).
          </p>
        </div>
      </div>

      {/* The 3 Dedicated Cards for Terms, Privacy, and About Us */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {pages.map((page) => (
          <div
            key={page.id}
            style={{
              background: "var(--bg-card, #111422)",
              border: "1px solid var(--border, rgba(139, 92, 246, 0.2))",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    fontSize: "1.75rem",
                    background: "rgba(139, 92, 246, 0.15)",
                    padding: "0.5rem 0.65rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {page.icon}
                </span>
                <div>
                  <h3 style={{ margin: 0, color: "#fff", fontSize: "1.15rem", fontWeight: 700 }}>
                    {page.title}
                  </h3>
                  <code
                    style={{
                      color: "var(--purple-light, #a78bfa)",
                      fontSize: "0.78rem",
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginTop: "3px",
                      display: "inline-block",
                    }}
                  >
                    /{page.slug}
                  </code>
                </div>
              </div>

              <span className={`status-badge status-${page.status === "published" ? "active" : "draft"}`}>
                <span className="status-dot" />
                {page.status.toUpperCase()}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: "0.86rem", color: "var(--text-secondary, #94a3b8)", lineHeight: 1.5 }}>
              {page.summary}
            </p>

            <div
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.78rem",
                color: "var(--text-muted, #64748b)",
              }}
            >
              <span>Format: <strong style={{ color: "var(--purple-light, #c084fc)" }}>Markdown / HTML / Text</strong></span>
              <span>Updated: {page.updatedAt}</span>
            </div>

            <div style={{ marginTop: "auto", display: "flex", gap: "0.75rem" }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1, padding: "0.6rem 1rem", fontSize: "0.9rem" }}
                onClick={() => handleOpenEdit(page)}
              >
                ✏️ Edit Content & Format
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Content Modal with Multi-Format Support */}
      {showModal && itemToEdit && (
        <div className="page-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="page-modal-card page-modal-large" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="page-modal-header">
                <div className="page-modal-title">
                  <span>{itemToEdit.icon}</span> Edit {itemToEdit.title}
                  <span style={{ fontSize: "0.82rem", color: "var(--purple-light)", fontWeight: 500, marginLeft: "0.5rem" }}>
                    — /{itemToEdit.slug}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: "0.45rem 1rem", fontSize: "0.84rem" }}>
                    💾 Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                      padding: "0 0.3rem",
                      lineHeight: 1,
                    }}
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="page-modal-body">
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>Page Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label>URL Slug / Route</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>Short Summary / Subtitle</label>
                    <input
                      type="text"
                      placeholder="Summary of this policy..."
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label>Publication Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="published">Published (Live on Website)</option>
                      <option value="draft">Draft (Under Review)</option>
                    </select>
                  </div>
                </div>

                {/* Multi-Format Rich Text Editor */}
                <div className="form-field-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label>
                      Content Body (Accepts All Formats: Raw Text, Markdown, HTML Tags, Lists, Headings)
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "var(--purple-light)" }}>
                      ✨ Paste in any format without losing formatting
                    </span>
                  </div>

                  <div className="cms-editor-container">
                    {/* Formatting Toolbar */}
                    <div className="cms-editor-topbar">
                      <div className="cms-toolbar-group">
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Bold text (**bold**)"
                          onClick={() => insertFormatting("**", "**", "Bold Text")}
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Italic text (*italic*)"
                          onClick={() => insertFormatting("*", "*", "Italic Text")}
                        >
                          <em>I</em>
                        </button>
                        <div className="cms-tool-divider" />
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Heading 1 (# Heading)"
                          onClick={() => insertFormatting("# ", "", "Main Heading 1")}
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Heading 2 (## Heading)"
                          onClick={() => insertFormatting("## ", "", "Subheading 2")}
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Heading 3 (### Heading)"
                          onClick={() => insertFormatting("### ", "", "Section 3")}
                        >
                          H3
                        </button>
                        <div className="cms-tool-divider" />
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Bullet list (* item)"
                          onClick={() => insertFormatting("* ", "", "List item")}
                        >
                          • List
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Numbered list (1. item)"
                          onClick={() => insertFormatting("1. ", "", "Ordered item")}
                        >
                          1. List
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Quote block (> Quote)"
                          onClick={() => insertFormatting("> ", "", "Important quote or notice")}
                        >
                          ❝ Quote
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Hyperlink [Text](URL)"
                          onClick={() => insertFormatting("[", "](https://example.com)", "Link label")}
                        >
                          🔗 Link
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Inline code or pre block"
                          onClick={() => insertFormatting("`", "`", "code_snippet")}
                        >
                          &lt;/&gt; Code
                        </button>
                        <button
                          type="button"
                          className="cms-tool-btn"
                          title="Horizontal separator"
                          onClick={() => insertFormatting("\n---\n", "", "")}
                        >
                          — Divider
                        </button>
                      </div>

                      {/* Switch between Write and Live Preview */}
                      <div className="cms-view-toggle">
                        <button
                          type="button"
                          className={`cms-view-tab ${editorMode === "write" ? "active" : ""}`}
                          onClick={() => setEditorMode("write")}
                        >
                          ✍️ Write / Paste
                        </button>
                        <button
                          type="button"
                          className={`cms-view-tab ${editorMode === "preview" ? "active" : ""}`}
                          onClick={() => setEditorMode("preview")}
                        >
                          👁️ Live Preview
                        </button>
                      </div>
                    </div>

                    {/* Content Area: Write mode or Preview mode */}
                    {editorMode === "write" ? (
                      <textarea
                        ref={textareaRef}
                        className="cms-editor-textarea"
                        rows={16}
                        placeholder="Type or paste content in any format:
- Plain text paragraphs
- Markdown: # H1, ## H2, **bold**, *italic*, * bullet points
- HTML tags: <h1>, <p>, <strong>, <ul>, <li>, <a href='...'>
- Pasted terms and legal agreements..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      />
                    ) : (
                      renderMultiFormatText(formData.content)
                    )}
                  </div>

                  <div className="cms-format-chips">
                    <span>Supported Formats:</span>
                    <span className="cms-format-badge">Plain Text</span>
                    <span className="cms-format-badge">Markdown (#, **, *, -)</span>
                    <span className="cms-format-badge">Raw HTML (&lt;p&gt;, &lt;h1&gt;, &lt;ul&gt;)</span>
                    <span className="cms-format-badge">Pasted Word / Docs</span>
                    <span className="cms-format-badge">Numbered &amp; Bullet Lists</span>
                  </div>
                </div>
              </div>

              <div className="page-modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  💾 Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
