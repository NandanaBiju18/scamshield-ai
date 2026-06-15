import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("history");
  return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {
  localStorage.setItem("history", JSON.stringify(history));
}, [history]);

  const analyzeMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://scamshield-ai-l2ra.onrender.com/analyze",
        {
          text: message,
        },
         {
    headers: {
      "Content-Type": "application/json"
    }
  }
      );

      setResult(response.data);
      setMessage("");

      setHistory((prev) => [
        {
          message,
          result: response.data,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 5));
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  const getColor = () => {
    if (!result) return "green";

    if (result.risk_score >= 80) return "red";
    if (result.risk_score >= 50) return "orange";
    return "green";
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>🛡️ ScamShield AI</h1>

      <textarea
        placeholder="Paste suspicious SMS, WhatsApp message, or Email..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          height: "180px",
          padding: "12px",
        }}
      />

      <br />
      <br />

      <button
        onClick={analyzeMessage}
        style={{
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        Analyze Message
      </button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "20px",
              background: getColor(),
              color: "white",
            }}
          >
            {result.label}
          </h2>

          <h3>Risk Score: {result.risk_score}/100</h3>

          <div
            style={{
              width: "100%",
              height: "20px",
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: `${result.risk_score}%`,
                height: "100%",
                background: getColor(),
              }}
            />
          </div>

          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  }}
>
  <h2>Recent Scans</h2>

  <button
    onClick={() => {
      setHistory([]);
      localStorage.removeItem("history");
    }}
    style={{
      padding: "8px 12px",
      cursor: "pointer",
    }}
  >
    Clear History
  </button>
</div>

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <p>{item.message}</p>

          <small>{item.time}</small>

          <br />

          <strong>{item.result.label}</strong>

          <p>Score: {item.result.risk_score}</p>
        </div>
      ))}
    </div>
  );
}

export default App;