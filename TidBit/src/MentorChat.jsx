// MentorPage.jsx
import { useState } from "react";

export default function MentorPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    // add user message
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setLoading(true);

    try {
      const response = await fetch("/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      // add AI message
      setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Montserrat" }}>
      {/* Sidebar handled by Layout.jsx */}

      {/* Mentor main area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        {/* Output area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {/* AI + User messages (2/3 width) */}
          <div
            style={{
              flex: "2",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2
              style={{
                fontFamily: "qurova",
                fontSize: "1.8rem",
                marginBottom: "1rem",
                textAlign: "center", // centered title
              }}
            >
              support bit
            </h2>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {messages.map((msg, idx) =>
                msg.sender === "ai" ? (
                  <div
                    key={idx}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "#dcd0ff",
                      color: "black",
                      padding: "0.6rem 1rem",
                      borderRadius: "12px",
                      maxWidth: "70%",
                      fontSize: "1rem",
                    }}
                  >
                    {msg.text.split("\n").map((line, i) =>
                      line.trim().startsWith("-") ||
                      line.trim().startsWith("*") ? (
                        <li key={i} style={{ marginLeft: "1.2rem" }}>
                          {line.replace(/^[-*]\s*/, "")}
                        </li>
                      ) : (
                        <div key={i} style={{ marginBottom: "0.5rem" }}>
                          {line}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div
                    key={idx}
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "#3c1c7a",
                      color: "white",
                      padding: "0.6rem 1rem",
                      borderRadius: "12px",
                      maxWidth: "70%",
                      fontSize: "1rem",
                    }}
                  >
                    {msg.text}
                  </div>
                )
              )}

              {loading && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: "#dcd0ff",
                    color: "black",
                    padding: "0.6rem 1rem",
                    borderRadius: "12px",
                    fontSize: "1rem",
                  }}
                >
                  Thinking...
                </div>
              )}
            </div>
          </div>

          {/* Empty space (1/3 width for balance / future use) */}
          <div style={{ flex: "1" }}></div>
        </div>

        {/* Input box at bottom */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            marginTop: "1rem",
            borderTop: "1px solid #ccc",
            padding: "0.5rem",
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your support bit..."
            style={{
              flex: 1,
              borderRadius: "12px",
              border: "1px solid #ccc",
              padding: "0.75rem",
              fontSize: "1rem",
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#3c1c7a",
              color: "white",
              border: "none",
              padding: "0.75rem 1.25rem",
              borderRadius: "12px",
              marginLeft: "0.5rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
