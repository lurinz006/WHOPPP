import React, { useState, useEffect } from "react";
import { whopApi } from "../services/whopApi";
import { PixelEventRecord } from "../types";
import { Activity, ChevronDown, ChevronUp, CheckCircle, Terminal } from "lucide-react";

export const PixelTrackerHUD: React.FC = () => {
  const [events, setEvents] = useState<PixelEventRecord[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = whopApi.subscribeToPixelEvents((updatedEvents) => {
      setEvents(updatedEvents);
    });
    return unsubscribe;
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      maxWidth: "380px",
      width: "calc(100% - 40px)",
      background: "rgba(10, 15, 26, 0.94)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(245, 158, 11, 0.35)",
      borderRadius: "12px",
      boxShadow: "0 10px 35px rgba(0, 0, 0, 0.7), 0 0 15px rgba(245, 158, 11, 0.2)",
      overflow: "hidden",
      fontFamily: "monospace",
      fontSize: "0.78rem",
      transition: "all 0.3s ease"
    }}>
      {/* Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: "0.65rem 1rem",
          background: "rgba(245, 158, 11, 0.12)",
          borderBottom: isExpanded ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#10b981",
            display: "inline-block",
            boxShadow: "0 0 8px #10b981"
          }}></span>
          <span style={{ fontWeight: 700, color: "#f59e0b", letterSpacing: "0.04em" }}>
            WHOP PIXEL &amp; API HUD
          </span>
          <span style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "0.1rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.7rem",
            color: "#ffffff"
          }}>
            {events.length} Events
          </span>
        </div>

        <button
          style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex" }}
          aria-label="Toggle HUD"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {/* Events Body */}
      {isExpanded && (
        <div style={{ padding: "0.75rem", maxHeight: "260px", overflowY: "auto" }}>
          <div style={{ color: "#64748b", fontSize: "0.7rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Terminal size={12} />
            <span>whop.track() live console &bull; Required 3 events</span>
          </div>

          {events.length === 0 ? (
            <div style={{ color: "#94a3b8", padding: "0.8rem", textAlign: "center", fontStyle: "italic" }}>
              Awaiting interaction: view services, request an estimate, or start deposit...
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    borderLeft: `3px solid ${
                      evt.eventName === "estimate_requested" ? "#10b981" :
                      evt.eventName === "deposit_started" ? "#f59e0b" :
                      evt.eventName === "service_viewed" ? "#38bdf8" : "#a855f7"
                    }`,
                    borderRadius: "4px",
                    padding: "0.45rem 0.6rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.2rem" }}>
                    <span style={{
                      fontWeight: 700,
                      color:
                        evt.eventName === "estimate_requested" ? "#34d399" :
                        evt.eventName === "deposit_started" ? "#fbbf24" :
                        evt.eventName === "service_viewed" ? "#38bdf8" : "#c084fc"
                    }}>
                      whop.track("{evt.eventName}")
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#64748b" }}>{evt.timestamp}</span>
                  </div>

                  <div style={{ color: "#94a3b8", fontSize: "0.7rem", wordBreak: "break-all" }}>
                    {JSON.stringify(evt.payload).substring(0, 100)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
