"use client";

import Link from "next/link";

export default function Home() {
	return (
		<section className="bg-white dark:bg-neutral-950">
			<div className="py-8 mx-auto max-w-4/5 lg:py-16 mt-8">
				<div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-8 md:p-12 mb-8">
					<h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
						Acme Corp IT Support Team
					</h1>
					<p className="text-lg font-normal text-black-500 dark:text-gray-400 mb-6">
						Need Help? We&apos;re Here for You. Submit a ticket to get fast,
						friendly support from our IT team. Whether it&apos;s a technical
						issue, software question, or access problem — we&apos;re ready to
						help you get back on track.
					</p>
					<div className="text-center">
						<Link
							href="/login"
							className="mt-7 font-bold text-white  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold"
						>
							{" "}
							Submit a Ticket{" "}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
