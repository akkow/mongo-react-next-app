export function ErrorCard() {

    return (
        <div className="flex flex-col items-center py-60">
            <div className="card card-side bg-red-500 shadow-xl p-5">
                <div className="card-body">
                    <h2 className="card-title">Error!</h2>
                    <p>Klaida! Patikrinkite ar viską įvedėte ir ar viską gerai įvedėte.</p>
                </div>
            </div>
        </div>
    )

}