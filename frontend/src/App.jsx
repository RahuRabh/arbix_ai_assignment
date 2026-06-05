import { useState } from "react";
import axios from "axios";

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

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
      setError(
        err.response?.data?.detail
          ? JSON.stringify(err.response.data.detail)
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Arbix Credit Scoring</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="land_area_acres"
          placeholder="Land Area Acres"
          value={form.land_area_acres}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="crop_type"
          placeholder="Crop Type"
          value={form.crop_type}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="repayment_history_score"
          placeholder="Repayment Score"
          value={form.repayment_history_score}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="annual_income_band"
          value={form.annual_income_band}
          onChange={handleChange}
        >
          <option value="<2L">&lt;2L</option>
          <option value="2-5L">2-5L</option>
          <option value="5-10L">5-10L</option>
          <option value=">10L">&gt;10L</option>
        </select>

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Scoring..." : "Submit"}
        </button>
      </form>

      {error && (
        <>
          <h3>Error</h3>
          <p>{error}</p>
        </>
      )}

      {result && (
        <>
          <h2>Score: {result.score}</h2>

          <h3>Reason Codes</h3>

          <ul>
            {result.reason_codes.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;