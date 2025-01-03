import { useState } from "react";

function Create({ type }) {
  const [titleCounter, setTitleCounter] = useState(0);
  const [contentCounter, setContentCounter] = useState(0);

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
      {type === 0 ? <h1 className="page-title">Piezīmes izveidošana</h1> : <h1 className="page-title">Paziņojuma izveidošana</h1>}
      <div className="px-10">
        <form className="flex flex-col">
          <label>Nosaukums</label>
          <input type="text" className="system-input mb-1" maxLength={maxTitleLength} onChange={handleTitleChange} />
          <p className="mb-4 text-end">
            {titleCounter}/{maxTitleLength}
          </p>
          <label>Saturs</label>
          <textarea className="system-input min-h-[400px] mb-1 resize-none" maxLength={maxContentLength} onChange={handleContentChange}></textarea>
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

export default Create;
