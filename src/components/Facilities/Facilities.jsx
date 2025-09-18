import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import "./facilities.css";

export default function Facilities({ titleLines, items, defaultVisible = 12 }) {
  const [expanded, setExpanded] = useState(false);
  const wrapRef = useRef(null);
  const [maxH, setMaxH] = useState("none");

  const visible = expanded ? items : items.slice(0, defaultVisible);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    // temporarily render all to measure collapsed height
    const el = wrapRef.current;
    if (!expanded) {
      // measure height of collapsed set by cloning
      const clone = el.cloneNode(true);
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.maxHeight = "none";
      el.parentNode.appendChild(clone);
      setMaxH(`${clone.scrollHeight}px`);
      el.parentNode.removeChild(clone);
    } else {
      setMaxH("2000px");
    }
  }, [expanded, items.length, defaultVisible]);

  return (
    <section className="fac-section py-6" aria-labelledby="facilities-title">
      <div className="container-lg">
        <div className="row g-4">
          <div className="col-lg-4">
            <h2 id="facilities-title" className="fac-title">
              {titleLines.map((l, i) => (
                <React.Fragment key={i}>
                  {l}
                  {i < titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
          </div>

          <div className="col-lg-8">
            <div
              className="fac-grid"
              ref={wrapRef}
              style={{ maxHeight: maxH }}
              id="facilities-list"
            >
              <ul className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 m-0 p-0 list-unstyled">
                {visible.map((f) => (
                  <li key={f.key} className="col">
                    <div className="fac-item">
                      <span className="fac-ico" aria-hidden="true">
                        {f.icon}
                      </span>
                      <span className="fac-label">{f.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {items.length > defaultVisible && (
              <button
                className="fac-toggle"
                aria-expanded={expanded}
                aria-controls="facilities-list"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "SHOW LESS FACILITIES" : "SHOW MORE FACILITIES"}
                <svg className="chev" width="14" height="14" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
