import { useState } from "react";
import { useParams } from "react-router-dom";
import { notes } from "../Data/Data";

function NoteEdit() {
  const params = useParams();
  const note = notes[params.id - 1];

  const [titleCounter, setTitleCounter] = useState(note.title.length);
  const [contentCounter, setContentCounter] = useState(note.content.length);

  const handleTitleChange = (e) => {
    setTitleCounter(e.target.value.length);
  };

  const handleContentChange = (e) => {
    setContentCounter(e.target.value.length);
  };

  const maxTitleLength = 100;
  const maxContentLength = 2000;

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Piezīmes izveidošana</h1>
      <div className="px-10">
        <form className="flex flex-col">
          <label>Nosaukums</label>
          <input type="text" className="system-input mb-1" defaultValue={note.title} maxLength={maxTitleLength} onChange={handleTitleChange} />
          <p className="mb-4 text-end">
            {titleCounter}/{maxTitleLength}
          </p>
          <label>Saturs</label>
          <textarea className="system-input min-h-[400px] mb-1 resize-none" defaultValue={note.content} maxLength={maxContentLength} onChange={handleContentChange}></textarea>
          <p className="mb-4 text-end">
            {contentCounter}/{maxContentLength}
          </p>
          <button type="submit" className="h-12 px-3 system-button bg-system-blue hover:bg-system-green text-white shadow-sm">
            Izveidot
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteEdit;
