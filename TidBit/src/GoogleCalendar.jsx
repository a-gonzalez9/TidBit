import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import load_dotenv from "dotenv";

load_dotenv();

const clientId =
  "538952701269-4efbddks690vovbc48im0vj08o859ggo.apps.googleusercontent.com";
const apiKey = "GEMINI_API_KEY";

export default function GoogleCalendar() {
  const [signedIn, setSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  gapi.load("client:auth2", () => {
    console.log("gapi loaded");
    gapi.client
      .init({
        apiKey: apiKey,
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/calendar.events.readonly",
      })
      .then(() => console.log("gapi client initialized"))
      .catch((err) => console.error("gapi client init failed", err));
  });
}, []);


  const handleSignIn = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  if (!authInstance) {
    alert("Google API not initialized yet.");
    return;
  }

  authInstance.signIn().then(
    () => {
      console.log("Signed in successfully");
      setSignedIn(true);
      fetchEvents();
    },
    (err) => console.error("Sign-in error", err)
  );
};

const fetchEvents = () => {
  gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 50,
      orderBy: "startTime",
    })
    .then((response) => {
      const gEvents = response.result.items.map((ev) => ({
        title: ev.summary || "No title",
        start: ev.start.dateTime || ev.start.date,
        end: ev.end.dateTime || ev.end.date,
      }));
      console.log("Fetched events:", gEvents);
      setEvents(gEvents);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch events error:", err);
      setLoading(false);
    });
};


  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        My Tasks & Calendar
      </h1>

      {!signedIn && (
        <button
          onClick={handleSignIn}
          style={{
            backgroundColor: "#0077ff",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Connect Google Calendar
        </button>
      )}

      {loading && <p>Loading events, one moment please...</p>}

      {signedIn && events.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      )}
    </div>
  );
}
