import Link from "next/link";
import Image from "next/image";
import { getSession, logout } from "../actions/loginAction";
import LiveClock from "../components/Liveclock";

export default async function Navbar() {
	const session = await getSession();

	return (
		<div>
			<nav className="bg-white border-gray-200 dark:bg-neutral-900">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
					<Link
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<Image
							src="/company_logo.svg"
							height={60}
							width={60}
							alt="Acme Corp Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Acme Corp
							<br /> IT Support
						</span>
					</Link>
					<div className="flex items-center space-x-6 rtl:space-x-reverse">
						{session ? (
							<form
								action={async () => {
									"use server";
									await logout();
								}}
							>
								<button
									type="submit"
									className="cursor-pointer text-md text-red-600 font-bold dark:text-red-500 hover:underline"
								>
									Log out
								</button>
							</form>
						) : (
							<Link href="/login">
								<span className="text-md text-red-600 font-bold dark:text-red-600 hover:underline">
									Login
								</span>
							</Link>
						)}
					</div>
				</div>
			</nav>
			<nav className="bg-gray-50 dark:bg-neutral-900">
				<div className="max-w-screen-xl px-4 py-3 mx-auto">
					<div className="flex justify-between">
						<Link
							href="/"
							className=" justify-start text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							aria-current="page"
						>
							Home
						</Link>
						<LiveClock />
						<div className="item-phantom w-20"></div>
					</div>
				</div>
			</nav>
		</div>
	);
}
