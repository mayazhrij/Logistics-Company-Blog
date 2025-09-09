"use Client";

import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PostProps {
    id: string;
    author: string;
    date: string;
    thumbnail?: string;
    authorEmail?: string;
    title: string;
    content: string;
    links?: string[];
    category?: string;
}

export default async function Post ({
    id,
    author,
    date,
    thumbnail,
    authorEmail,
    title,
    content,
    links,
    category,
} : PostProps) {
    const session = await getServerSession(authOptions);

    const isEditable = session && session?.user?.email === authorEmail;

    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        month: "short", 
        day: "numeric",
        year: "numeric",
    };

    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return (
    <div className="my-4 border-b py-8">
        <div className="mb-4">
            {author ? (
                <>
                Posted by: <span className="font-bold">{author}</span> on {formattedDate}
                </>
            ) : (
                <>
                Posted on {formattedDate}
                </>
            )}
        </div>

        <div className="w-full h-72 relative">
            {thumbnail ? (
                <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover rounded-md object-center"
                />
        ) : (
                <Image
                src={'/thumbnail-placeholder.png'}
                alt={title}
                fill
                className="object-cover rounded-md object-center"
                />
            )}
        </div>

        {category && <Link
            className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold
            rounded-md mt-4 block"
            href={`categories/${category}`}
            >
                {category}
            </Link>}

        <h2>{title}</h2>
        <p className="content">{content}</p>

        {links && (
            <div className="my-4 flex flex-col gap-3">
                {links.map((link, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5"
                            >
                            <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                            <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                        </svg>

                        <Link className="link" href={link}>
                            {link}
                        </Link>
                    </div>
                ))}
            </div>
        )}

        {
            isEditable && (
                <div className="flex font-bold gap-3 py-2 px-4 rounded-md bg-slate-200 w-fit">
                    <Link href={`/edit-post/${id}`}>Edit</Link>
                    <DeleteButton id={id}/>
                </div>
            )
        }

    </div>
    );
}