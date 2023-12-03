"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import * as actions from "@/actions";
import { GoAlertFill } from "react-icons/go";

export default function SnippetCreatePage() {
	const [title, setTitle] = useState("");
	const [code, setCode] = useState("");
	const [formState, action] = useFormState(actions.createSnippet, {
		message: "",
		source: "",
	});

	return (
		<div className="grid grid-cols-12">
			<form
				action={action}
				className="col-span-12 md:col-start-3 md:col-span-8 xl:col-start-5 xl:col-span-4 p-10 border rounded-md mt-4 shadow-lg"
			>
				<h3 className="text-xl font-bold mt-4 mb-6">Create a snippet</h3>
				<div className="flex flex-col">
					<div className="flex flex-col gap-2">
						<label className="w-12 text-sm" htmlFor="title">
							Title
						</label>
						<input
							name="title"
							className={`border rounded-md p-2 w-full ${
								formState.message &&
								formState.source === "title" &&
								title.length < 3
									? "border-red-700 bg-red-50 focus:outline-red-700"
									: "bg-gray-50"
							}`}
							id="title"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<div className="min-h-[24px] w-full">
							{formState.message && formState.source === "title" ? (
								<div className="flex justify-start items-start text-sm text-red-500 min-h-full">
									<div className="pt-0.5">
										<GoAlertFill />
									</div>
									<p className="ml-1">{formState.message}</p>
								</div>
							) : null}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center text-sm">
							<label className="w-12" htmlFor="title">
								Code
							</label>
							<Link href="/snippets/new" className="text-[#2563EB]">
								forgot password?
							</Link>
						</div>
						<textarea
							name="code"
							className={`border rounded-md p-2 w-full resize-none ${
								formState.message &&
								formState.source === "code" &&
								code.length < 10
									? "border-red-700 bg-red-50 focus:outline-red-700"
									: "bg-gray-50"
							}`}
							id="code"
							onChange={(e) => setCode(e.target.value)}
						/>
						<div className="min-h-[24px] w-full">
							{formState.message && formState.source === "code" ? (
								<div className="flex justify-start items-start text-sm text-red-500 min-h-full">
									<div className="pt-0.5">
										<GoAlertFill />
									</div>
									<p className="ml-1">{formState.message}</p>
								</div>
							) : null}
						</div>
					</div>

					<button
						type="submit"
						className="w-full mt-1 mb-4 rounded p-2 bg-[#2563EB] text-white"
					>
						Create
					</button>
				</div>
			</form>
		</div>
	);
}
