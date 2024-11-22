function NoteCreate() {
    return (
    <div className="panel-width my-14">
        <h1 className="page-title">Piezīmes izveidošana</h1>
            <div className="px-10">
                <form className="flex flex-col">
                    <label>Nosaukums</label>
                    <input type="text" className="system-input mb-4" />
                    <label>Saturs</label>
                    <textarea className="system-input min-h-[400px] mb-4 resize-none"></textarea>
                    <button type="submit" className="h-12 px-3 system-button bg-system-blue hover:bg-system-green text-white shadow-sm">Izveidot</button>
                </form>
            </div>
        </div>
    );
}

export default NoteCreate;