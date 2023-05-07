import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faMicrophone,
    faMicrophoneSlash,
  } from "@fortawesome/free-solid-svg-icons";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuos = true;
mic.lang = 'en-US';

function App() {
  const [isListening, setIslistening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(
    () => {
      handleListen();
      // eslint-disable-next-line
    },[isListening]
  );

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('stop Mic on Click');
      }
    }
    mic.onstart = () => {
      console.log("mic is on");
    }
    mic.onresult = event => {
      const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
      console.log(transcript)
      setNote(transcript);
      mic.onerror = (e) => {
        console.log(e.error);
      }
    }

  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }
  return (
    <>
      <div className="container">
        <h1>Voice Notes</h1>
        <div className="box">
          <h2>Current note</h2>
          {isListening ? <span>listening...</span> : <span>mic is off</span>}
          <button
            id="top"
            onClick={() => {
              setIslistening((prevState) => !prevState);
            }}
          >
            {isListening ? (
              <FontAwesomeIcon icon={faMicrophone} className="mic" />
            ) : (
              <FontAwesomeIcon icon={faMicrophoneSlash} className="mic" />
            )}
          </button>
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <p className="note">
            {note ? note : <span className="default">Text will display here when you talk</span>}
          </p>
        </div>

        <div className="box notes">
          <h2>Notes</h2>
          <ul>
            {savedNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
