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
                    <button type="submit" className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">Izveidot</button>
                </form>
            </div>
        </div>
    );
}

export default NoteCreate;