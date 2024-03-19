import { _id } from "@next-auth/mongodb-adapter"


export function LoadingDelay() {

   
    return (
        <div className="hidden flex flex-col items-center py-80" role="status">
            <span className="loading loading-dots loading-lg w-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></span>
        </div>
    )
}