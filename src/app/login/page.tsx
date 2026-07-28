import LoginForm from "../components/forms/LoginForm";

export default function login() {
	return (
		<div className="relative w-full h-screen bg-no-repeat bg-bottom overflow-hidden md:h-[85dvh] bg-gradient-to-br from-red-500 via-red-600 to-neutral-900 bg-cover">
			<div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-10">
				<div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-900 dark:border-neutral-800 ">
					<div className="p-6 space-y-4 md:space-y-9 sm:p-8 ">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
							Sign in with Access Code
						</h1>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}
