import TopPanel from "../NotesNotificationsBlocks/DetailTopPanel";

function Details({ info }) {
    if (info != null) {
        return (
            <div className="w-full flex flex-col items-center">
                <TopPanel title={info.title} createdAt={info.createdAtDate.toLocaleString()} />
                <div className="panel-width mt-3 break-words">
                    <p className="">{info.content}</p>
                </div>
            </div>
        );
    }
}

export default Details;
