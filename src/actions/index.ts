"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: string, code: string) {
	await db.snippet.update({
		where: {
			id,
		},
		data: { code },
	});

	revalidatePath(`/snippets/${id}`);
	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: string) {
	await db.snippet.delete({
		where: { id },
	});

	revalidatePath("/");
	redirect("/");
}

export async function createSnippet(
	formState: { message: string; source: string },
	formData: FormData
) {
	try {
		// Validate user's input
		const title = formData.get("title") as string;
		const code = formData.get("code") as string;

		if (title.length < 3) {
			return {
				message: !title.length
					? "Please enter a title."
					: "Title must be at least 3 characters long.",
				source: "title",
			};
		}

		if (code.length < 10) {
			return {
				message: !code.length
					? "Please enter some code."
					: "Code must be at least 10 characters long.",
				source: "code",
			};
		}

		// Create a new record
		await db.snippet.create({
			data: {
				title,
				code,
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				message: err.message,
				source: "code",
			};
		} else {
			return {
				message: "Something went wrong",
				source: "code",
			};
		}
	}

	revalidatePath("/");
	redirect("/");
}
