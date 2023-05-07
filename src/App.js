import { useEffect } from "react";
import { useState } from "react";

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
          {isListening ? <span>listening</span>: <span>notlistening</span>}
          <button id="top"
            onClick={() => {
              setIslistening(prevState => !prevState)
            }}
          >Start/Stop</button>
          <button onClick={handleSaveNote} disabled={!note}>Save Note</button>
          <p>{note}</p>
        </div>

        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
