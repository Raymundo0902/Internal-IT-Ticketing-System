"use client";
import { useActionState } from "react";
import { login } from "../../actions/loginAction";

export default function LoginForm() {
	const [, formAction, isPending] = useActionState(login, {
		success: false,
		error: "",
	});

	return (
		<form className="space-y-4 md:space-y-6" action={formAction}>
			<label
				htmlFor="password"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				Password
			</label>
			<input
				type="password"
				name="password"
				id="password"
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Password"
				required
			/>

			{isPending ? (
				<button
					type="submit"
					disabled
					className="w-full text-white bg-gray-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Logging In ...
				</button>
			) : (
				<button
					type="submit"
					className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Log In
				</button>
			)}
		</form>
	);
}
