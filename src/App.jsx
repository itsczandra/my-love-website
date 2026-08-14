import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const noMessages = [
  "NO 😭",
  "Are you sure? 👀",
  "Really? 😭",
  "Seriously? 😐",
  "Think again! 🥺",
  "Nice try 😏",
  "Love... really? 😭",
  "You can't escape me ❤️",
];

const activities = [
  {
    id: 1,
    title: "ISKINA PUSO & DIMSUM BREAK",
    emoji: "🥟",
    photo: "/photos/photo1.jpg",
    message:
      "Let's get lost, eat something good, and probably order one more round. ❤️",
  },
  {
    id: 2,
    title: "NIGHT WALK",
    emoji: "🚶🏻‍➡️",
    photo: "/photos/photo2.jpg",
    message:
      "Just you, me, random conversations, and nowhere we really need to be. 🌙",
  },
  {
    id: 3,
    title: "DINNER DATE",
    emoji: "🍽️",
    photo: "/photos/photo3.jpg",
    message:
      "Good food, good conversations, and maybe staying a little longer than planned. ❤️",
  },
  {
    id: 4,
    title: "BAR NIGHT OUT",
    emoji: "🍷",
    photo: "/photos/photo4.jpg",
    message:
      "Drinks, stories, stupid conversations... and probably one more drink. 😂❤️",
  },
  {
    id: 5,
    title: "MOVIE NIGHT OUT",
    emoji: "🎬",
    photo: "/photos/photo5.jpg",
    message:
      "You pick the movie. I'll bring the snacks. Deal? 🍿❤️",
  },
  {
    id: 6,
    title: "NETFLIX & CUDDLES",
    emoji: "🎬",
    photo: "/photos/photo6.jpg",
    message:
      "A movie we may or may not finish because the cuddles are more important. 🥹❤️",
  },
  {
    id: 7,
    title: "SWIMMING POOL",
    emoji: "🏊🏻",
    photo: "/photos/photo7.jpg",
    message:
      "Pool day. No work. No stress. Just you, me, and a little sunshine. 🌊",
  },
  {
    id: 8,
    title: "SURPRISE ME",
    emoji: "❤️",
    photo: "/photos/photo8.jpg",
    message:
      "Ohhh... you want me to decide? 👀 Okay, Love. I'll choose for you. ❤️",
  },
];

function App() {
  const [screen, setScreen] = useState("intro");

  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState(null);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  function startWebsite() {
  setScreen("question");

  if (audioRef.current) {
    audioRef.current
      .play()
      .then(() => {
        setMusicPlaying(true);
      })
      .catch((error) => {
        console.log("Music could not start:", error);
      });
  }
}

  async function sendReply() {
    if (!reply.trim()) {
      alert("Write something first, Love ❤️");
      return;
    }

    try {
      await emailjs.send(
        "itsczandra",
        "template_ev0saz6",
        {
          name: "Kong",
          email: "",
          message: reply,
          activity: selectedActivity
            ? `${selectedActivity.emoji} ${selectedActivity.title}`
            : "No activity selected",
          time: new Date().toLocaleString(),
        },
        "Oiuzw8lF_WDSxHhJT"
      );

      setSent(true);
      setReply("");
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Oops! The message didn't send. 😭 Please try again.");
    }
  }

function handleNo() {
  const nextCount = noCount + 1;

  setNoCount(nextCount);

  if (nextCount >= 2) {
    const buttonWidth = 160;
    const buttonHeight = 60;
    const padding = 20;

    const maxX =
      window.innerWidth - buttonWidth - padding;

    const maxY =
      window.innerHeight - buttonHeight - padding;

    setNoPosition({
      left: Math.max(
        padding,
        Math.random() * maxX
      ),
      top: Math.max(
        padding,
        Math.random() * maxY
      ),
    });
  }
}

  function sayYes() {
    setScreen("activities");
  }

  function chooseActivity(activity) {
    setSelectedActivity(activity);
  }

  function closePhoto() {
    setSelectedActivity(null);
  }

  function lockDate() {
    setScreen("locked");
  }

  function openMessage() {
    setMessageOpen(true);
  }

  function sendReply() {
    if (!reply.trim()) return;

    /*
      EMAIL SENDING WILL BE CONNECTED LATER.
      For now, this simply shows the "sent" animation.
    */
    setSent(true);
  }

  return (
  <main className="app">

    <audio
      ref={audioRef}
      src="/music/Loving Is Easy.mp3"
      loop
      preload="auto"
    />

    {musicPlaying && (
      <button
        className="music-toggle"
        onClick={() => {
          if (!audioRef.current) return;

          if (audioRef.current.paused) {
            audioRef.current.play();
            setMusicPlaying(true);
          } else {
            audioRef.current.pause();
            setMusicPlaying(false);
          }
        }}
      >
        🎵
      </button>
    )}

    {/* rest of your website */}

      {/* =====================================================
          SCREEN 1 — FRONT PAGE
      ===================================================== */}
      {screen === "intro" && (
        <section className="screen intro-screen">

          <div className="pixel-heart">❤️</div>

          <p className="small-heading">
            HEY, LOVE... 👀
          </p>

          <h1>
            I made something
            <br />
            <span>just for you.</span>
          </h1>

          <p className="intro-text">
            There's something I've been wanting
            <br />
            to ask you...
          </p>

          <button className="main-button" onClick={startWebsite}>
            OPEN IT ❤️
          </button>

        </section>
      )}

      {/* =====================================================
    SCREEN 2 — THE QUESTION
===================================================== */}
{screen === "question" && (
  <section className="screen question-screen">

    <div className="pixel-heart">💌</div>

    <p className="small-heading">
      ONE LITTLE QUESTION...
    </p>

    <h1>
      Can I be
      <br />
      your date
      <br />
      forever?
    </h1>

    <div className="question-buttons">

      {/* YES BUTTON */}
      <button
        className="yes-button"
        onClick={sayYes}
      >
        YES ❤️
      </button>

      {/* NO BUTTON */}
      <button
        className="no-button"
        onClick={handleNo}
        style={
          noPosition
            ? {
                position: "fixed",
                left: `${noPosition.left}px`,
                top: `${noPosition.top}px`,
              }
            : {}
        }
      >
        {noMessages[Math.min(noCount, noMessages.length - 1)]}
      </button>

    </div>

  </section>
)}

      {/* =====================================================
          SCREEN 3 — ACTIVITY MENU
      ===================================================== */}
      {screen === "activities" && (
        <section className="screen activities-screen">

          <div className="top-message">
            💌
          </div>

          <p className="small-heading">
            OKAY, LOVE... ❤️
          </p>

          <h1 className="activity-heading">
            WHAT WOULD YOU
            <br />
            LIKE TO DO?
          </h1>

          <div className="activity-grid">

            {activities.map((activity) => (
              <button
                key={activity.id}
                className="activity-button"
                onClick={() => chooseActivity(activity)}
              >
                <span className="activity-emoji">
                  {activity.emoji}
                </span>

                <span>
                  {activity.title}
                </span>
              </button>
            ))}

          </div>

          <p className="hint">
            Pick one... 👀
          </p>

        </section>
      )}


      {/* =====================================================
          SCREEN 4 — DATE LOCKED
      ===================================================== */}
      {screen === "locked" && selectedActivity && (
        <section className="screen locked-screen">

          <div className="notification">
            💌 1 NEW MESSAGE
          </div>

          <p className="small-heading">
            DATE LOCKED IN ❤️
          </p>

          <h1>
            IT'S A DATE!
          </h1>

          <div className="locked-card">

            <img
              src={selectedActivity.photo}
              alt={selectedActivity.title}
              className="locked-photo"
            />

            <div className="locked-info">

              <span className="big-emoji">
                {selectedActivity.emoji}
              </span>

              <h2>
                {selectedActivity.title}
              </h2>

              <p>
                {selectedActivity.message}
              </p>

            </div>

          </div>

          <button
            className="message-button"
            onClick={openMessage}
          >
            💌 OPEN MY MESSAGE
          </button>

        </section>
      )}


      {/* =====================================================
          SCREEN 5 — MESSAGE
      ===================================================== */}
      {messageOpen && (
        <section className="message-overlay">

          <div className="message-window">

            {!sent ? (
              <>
                <div className="message-header">
                  <span>💌 1 NEW MESSAGE</span>

                  <button
                    className="close-message"
                    onClick={() => setMessageOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="message-body">

                  <p className="message-label">
                    FROM: DANG ❤️
                  </p>

                  <p className="message-label">
                    SUBJECT: For my Love
                  </p>

                  <div className="message-content">

                    <p>
                      Hi, Love. ❤️
                    </p>

                    <p>
                      I know we're going to have our little
                      adventure together...
                    </p>

                    <p>
                      But I wanted to make this little thing
                      just for you.
                    </p>

                    <p>
                      So you picked your date.
                      Good. 😌
                    </p>

                    <p className="final-question">
                      Can I be your date forever?
                    </p>

                    <p>
                      — Dang ❤️
                    </p>

                  </div>

                  <div className="reply-section">

                    <label>
                      REPLY TO DANG 💌
                    </label>

                    <textarea
                      value={reply}
                      onChange={(event) =>
                        setReply(event.target.value)
                      }
                      placeholder="Type your message here..."
                    />

                    <button
                    className="send-button"
                    onClick={sendReply}
                    disabled={sent}
                    >
                    SEND TO DANG ❤️
                    </button>

                  </div>

                </div>
              </>
            ) : (
              <div className="sent-message">

                <div className="sent-heart">
                  💗
                </div>

                <h2>
                  MESSAGE SENT!
                </h2>

                <p>
                  I'll be waiting for your reply,
                  Love. 🥹❤️
                </p>

                <button
                  className="send-button"
                  onClick={() => setMessageOpen(false)}
                >
                  CLOSE 💌
                </button>

              </div>
            )}

          </div>

        </section>
      )}


      {/* =====================================================
          PHOTO POP-UP
      ===================================================== */}
      {selectedActivity && screen === "activities" && (
        <div className="photo-overlay">

          <div className="photo-modal">

            <button
              className="modal-close"
              onClick={closePhoto}
            >
              ×
            </button>

            <div className="photo-frame">

              <img
                src={selectedActivity.photo}
                alt={selectedActivity.title}
              />

            </div>

            <p className="date-eyebrow">
              {selectedActivity.emoji} IT'S A DATE!
            </p>

            <h2>
              {selectedActivity.title}
            </h2>

            <p className="activity-message">
              {selectedActivity.message}
            </p>

            <button
              className="lock-button"
              onClick={lockDate}
            >
              LOCK IT IN ❤️
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default App;