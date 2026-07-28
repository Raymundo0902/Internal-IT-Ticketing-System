"use client";

import { ticketSubmitAction } from "../../actions/ticketAction";
import { useActionState } from "react";
import { useState } from "react";
import RadioButton from "../RadioButton";
import PhoneNumberInput from "../PhoneInput";

export default function TicketForm() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = () => {
		console.log("Ticket Submitted");
		setSubmitted(true);
	};

	const handleResubmit = () => {
		// your ticket submit logic here (API call, etc.)
		console.log("Returning to Ticket Page");
		setSubmitted(false);
	};

	const [, formAction, isPending] = useActionState(ticketSubmitAction, {
		success: false,
		errors: null,
	});

	return (
		<>
			{!submitted && (
				<form
					className="max-w-3xl w-4/5 mx-auto dark:bg-zinc-900 p-5 rounded-md"
					onSubmit={handleSubmit}
					action={formAction}
				>
					<h3 className="my-2 font-semibold text-gray-900 dark:text-white">
						Department
					</h3>
					<ul className="flex flex-col sm:flex-row mb-5 sm:w-full items-center justify-between w-full text-sm font-medium text-gray-900 dark:bg-zinc-900 dark:border-neutral-600 dark:text-white rounded-mg">
						<RadioButton department="Office" />
						<RadioButton department="Sales" />
						<RadioButton department="Finance" />
						<RadioButton department="Parts" />
						<RadioButton department="Service" />
					</ul>

					<div className="flex justify-between">
						<div className="flex-1/2 pr-5">
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
							>
								Name
								<input
									required
									type="text"
									id="name"
									name="name"
									placeholder="Name"
									className="grow block w-full p-2 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-blue-500"
								/>
							</label>
						</div>
						<PhoneNumberInput />
					</div>

					<label
						htmlFor="email"
						className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
					>
						Email
					</label>
					<input
						required
						type="email"
						id="email"
						name="email"
						placeholder="youremail@email.com"
						className=" block w-full p-2 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-blue-500"
					/>

					<label
						htmlFor="location"
						className="block mb-1 text-sm font-bold text-gray-900 dark:text-white"
					>
						Select a Location
					</label>
					<select
						required
						defaultValue=""
						id="location"
						name="location"
						className="bg-gray-50 border mb-2 border-transparent outline border-r-8 outline-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="" hidden disabled>
							Select a location
						</option>
						<option value="Downtown Office">Downtown Office</option>
						<option value="North Branch">North Branch</option>
						<option value="South Branch">South Branch</option>
						<option value="East Branch">East Branch</option>
						<option value="West Branch">West Branch</option>
						<option value="Warehouse">Warehouse</option>
						<option value="Remote">Remote</option>
					</select>

					<label
						htmlFor="issue"
						className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
					>
						Issue
					</label>
					<textarea
						required
						rows={4}
						maxLength={500}
						id="issue"
						name="issue"
						placeholder="Please describe your issue here. Thank you!"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-red-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-red-500"
					/>

					{isPending ? (
						<button
							type="submit"
							disabled={isPending}
							className="mt-5 text-white bg-gray-400 hover:bg-red-00 focus:ring-4 focus:outline-none focus:ring-red-300
                      font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700
                      dark:focus:ring-red-800"
						>
							Submitting ...
						</button>
					) : (
						<button
							type="submit"
							disabled={isPending}
							className="mt-5 text-white bg-red-600 hover:bg-red-00 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
						>
							Submit
						</button>
					)}
				</form>
			)}

			{submitted && (
				<div>
					<div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-10">
						<div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
							<div className="p-6 space-y-4 md:space-y-9 sm:p-8 ">
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Successfully submitted your form. Thank you!
								</h1>
								<svg
									className="w-[48px] h-[48px] text-gray-800 dark:text-white mx-auto"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										fillRule="evenodd"
										d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
										clipRule="evenodd"
									/>
								</svg>

								<button type="submit" onClick={handleResubmit}>
									<span className="text-sm text-red-600 font-bold dark:text-red-500 hover:underline">
										Submit another ticket
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
