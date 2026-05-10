import { useState } from "react";

const analyzeReview = async (reviewText, rating, hotelName) => {
  const response = await fetch("/api/ai/analyze-review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewText, rating, hotelName }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.message);
  return data.result;
};

const ScoreBar = ({ label, score, color }) => (
  <div style={{ marginBottom: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
      <span style={{ fontSize: "12px", color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: "12px", fontWeight: "600", color }}>{score}/100</span>
    </div>
    <div style={{ background: "#f3f4f6", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: "99px", transition: "width 1s ease" }} />
    </div>
  </div>
);

const getScoreColor = (score) => {
  if (score >= 75) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
};

const getVerdictConfig = (verdict) => {
  if (verdict === "GENUINE") return { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d", icon: "✓", label: "Genuine Review" };
  if (verdict === "SUSPICIOUS") return { bg: "#fffbeb", border: "#fde68a", text: "#b45309", icon: "⚠", label: "Suspicious" };
  return { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c", icon: "✕", label: "Likely Fake" };
};

const ReviewAnalyzer = ({ reviewText, rating, hotelName = "this hotel", reviewerName = "Guest" }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeReview(reviewText, rating, hotelName);
      setResult(data);
      setOpen(true);
    } catch (e) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verdict = result ? getVerdictConfig(result.verdict) : null;

  return (
    <div style={{ marginTop: "10px", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .analyze-btn:hover { background: #111 !important; color: #fff !important; }
      `}</style>

      {!result && !loading && (
        <button className="analyze-btn" onClick={handleAnalyze} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "500", color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "99px", padding: "4px 12px", cursor: "pointer", transition: "all 0.2s" }}>
          🛡️ Verify with AI
        </button>
      )}

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#6b7280" }}>
          <div style={{ width: "14px", height: "14px", border: "2px solid #e5e7eb", borderTopColor: "#111", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
          AI is analyzing...
        </div>
      )}

      {error && <p style={{ fontSize: "12px", color: "#dc2626", margin: "4px 0 0" }}>{error}</p>}

      {result && open && (
        <div style={{ marginTop: "10px", borderRadius: "14px", border: `1px solid ${verdict.border}`, background: verdict.bg, overflow: "hidden", animation: "fadeSlide 0.35s ease" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${verdict.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#fff", border: `2px solid ${getScoreColor(result.overallScore)}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: getScoreColor(result.overallScore), lineHeight: 1 }}>{result.overallScore}</span>
                <span style={{ fontSize: "8px", color: "#9ca3af", lineHeight: 1 }}>/ 100</span>
              </div>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "700", color: verdict.text, background: "#fff", border: `1px solid ${verdict.border}`, borderRadius: "99px", padding: "2px 10px" }}>
                  {verdict.icon} {verdict.label}
                </div>
                <p style={{ fontSize: "11px", color: "#6b7280", margin: "3px 0 0" }}>by {reviewerName}</p>
              </div>
            </div>
            <button onClick={() => { setOpen(false); setResult(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "18px" }}>×</button>
          </div>

          <div style={{ padding: "14px 14px 4px" }}>
            <ScoreBar label="Specific Details" score={result.specificityScore} color={getScoreColor(result.specificityScore)} />
            <ScoreBar label="Sentiment Match" score={result.sentimentConsistencyScore} color={getScoreColor(result.sentimentConsistencyScore)} />
            <ScoreBar label="Natural Language" score={result.languageNaturalnessScore} color={getScoreColor(result.languageNaturalnessScore)} />
            <ScoreBar label="Detail Richness" score={result.detailRichnessScore} color={getScoreColor(result.detailRichnessScore)} />
          </div>

          <div style={{ padding: "0 14px 14px" }}>
            <p style={{ fontSize: "12px", color: "#374151", lineHeight: "1.6", margin: "6px 0 10px", padding: "8px 10px", background: "#fff", borderRadius: "8px", border: "1px solid #f3f4f6" }}>{result.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {result.strongPoints?.length > 0 && (
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "600", color: "#16a34a", marginBottom: "4px" }}>✓ STRONG POINTS</p>
                  {result.strongPoints.map((p, i) => <p key={i} style={{ fontSize: "11px", color: "#374151", margin: "2px 0" }}>• {p}</p>)}
                </div>
              )}
              {result.weakPoints?.length > 0 && (
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "600", color: "#dc2626", marginBottom: "4px" }}>✕ WEAK POINTS</p>
                  {result.weakPoints.map((p, i) => <p key={i} style={{ fontSize: "11px", color: "#374151", margin: "2px 0" }}>• {p}</p>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewAnalyzer;