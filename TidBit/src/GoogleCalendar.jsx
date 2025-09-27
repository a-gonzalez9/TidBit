import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId = "538952701269-4efbddks690vovbc48im0vj08o859ggo.apps.googleusercontent.com";
const apiKey = "AIzaSyDdzALHQ_MnSHRwM6SYxR5z7qP_tU_r1hI";

export default function GoogleCalendar() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/calendar.events.readonly",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleAuth = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 5,
          orderBy: "startTime",
        })
        .then((response) => {
          const events = response.result.items;
          if (!events || events.length === 0) {
            alert("No upcoming events found.");
            return;
          }
          alert(
            events
              .map(
                (event) =>
                  `${event.summary} at ${
                    event.start.dateTime || event.start.date
                  }`
              )
              .join("\n")
          );
        });
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Google Calendar
      </h1>
      <button
        onClick={handleAuth}
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
    </div>
  );
}
