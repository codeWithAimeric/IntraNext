import { doLogout } from "@/server/actions";

export default function LogoutButton() {
    return (
        <form action={doLogout}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                Logout
            </button>
        </form>

    )
}
