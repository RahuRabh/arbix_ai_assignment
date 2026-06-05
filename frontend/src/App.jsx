import { useState } from "react";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  marginBottom: "1rem",
  boxSizing: "border-box",
  fontSize: "14px",
};

function App() {
  const [form, setForm] = useState({
    land_area_acres: "",
    crop_type: "",
    repayment_history_score: "",
    annual_income_band: "2-5L",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/score",
        {
          land_area_acres: Number(form.land_area_acres),
          crop_type: form.crop_type,
          repayment_history_score: Number(
            form.repayment_history_score
          ),
          annual_income_band: form.annual_income_band,
        }
      );

      setResult(response.data);
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(JSON.stringify(err.response.data.detail));
      } else {
        setError("Unable to process request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "0.5rem",
            color: "#111827",
          }}
        >
          Agricultural Credit Scoring
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "2rem",
          }}
        >
          Enter applicant details to generate a credit score and
          explainability reasons.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Land Area (Acres)</label>

          <input
            type="number"
            name="land_area_acres"
            value={form.land_area_acres}
            onChange={handleChange}
            placeholder="e.g. 5"
            style={inputStyle}
            required
          />

          <label>Crop Type</label>

          <input
            type="text"
            name="crop_type"
            value={form.crop_type}
            onChange={handleChange}
            placeholder="e.g. Rice"
            style={inputStyle}
            required
          />

          <label>Repayment History Score (0-100)</label>

          <input
            type="number"
            name="repayment_history_score"
            value={form.repayment_history_score}
            onChange={handleChange}
            placeholder="e.g. 85"
            style={inputStyle}
            required
          />

          <label>Annual Income Band</label>

          <select
            name="annual_income_band"
            value={form.annual_income_band}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="<2L">Less than 2L</option>
            <option value="2-5L">2L - 5L</option>
            <option value="5-10L">5L - 10L</option>
            <option value=">10L">Greater than 10L</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Calculating..." : "Generate Score"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
            }}
          >
            <strong>Error:</strong>
            <div>{error}</div>
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              borderRadius: "12px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#111827",
              }}
            >
              Credit Score: {result.score}/100
            </h2>

            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <strong>Request ID:</strong>
              <br />
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#6b7280",
                }}
              >
                {result.request_id}
              </span>
            </div>

            <div>
              <strong>Reason Codes</strong>

              <ul
                style={{
                  marginTop: "0.5rem",
                }}
              >
                {result.reason_codes.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                marginTop: "1rem",
                color: "#6b7280",
                fontSize: "0.9rem",
              }}
            >
              Generated at: {result.timestamp}
            </div>
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#9ca3af",
            fontSize: "0.9rem",
          }}
        >
          Built using React + FastAPI
        </p>
      </div>
    </div>
  );
}

export default App;