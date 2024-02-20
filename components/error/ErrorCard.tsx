import Link from "next/link";

export function ErrorCard() {

    return (
        <>
        <div className="flex flex-col items-center py-4">
            <div className="card card-side bg-red-500 shadow-xl">
                <div className="card-body p-2 w-[500px] h-20">
                    <h1 className="text-white card-title flex flex-col items-center">Serverio klaida!</h1>
                    <h2 className="text-white flex flex-col items-center">Patikrinkite ar viską įvedėte gerai.</h2>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <Link className="hover:shadow-xl transition-all  rounded-xl text-md font-bold p-4 bg-green-500 text-white w-max" href="/auth/login">Prisijungti iš naujo.</Link>
        </div>
        </>
    )

}