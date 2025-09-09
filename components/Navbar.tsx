'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Navbar () {
    const { status, data: session } = useSession();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if ( popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setIsPopupVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside)

        if (!isPopupVisible) {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isPopupVisible]);

    return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
        <div>
            <Link href={"/"}>
                <h1 className="text-4xl font-bold tracking-tighter text-blue-800">BNR Logistic</h1>
            </Link>
            <p className="text-sm">We Provide Many Solutions According <br /> To Your Business Needs.</p>
        </div>

        {status === 'authenticated' ? (
            <>
            <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-blue-200 p-6 shadow-lg
            rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopupVisible ? 'flex' : 'hidden'}`}
            >
            <div
            className="font-bold"
            >
                {session?.user?.name}
            </div>
            <div>
            {session?.user?.email}
            </div>
                <Link
                onClick={() => setIsPopupVisible(false)}
                className="hover:underline"
                href={"/dashboard"}>
                    Dashboard
                </Link>
                <Link
                onClick={() => setIsPopupVisible(false)}
                className="hover:underline"
                href={"/create-post"}>
                    Create Post
                </Link>
                <button onClick={() => signOut()}
                className="btn">
                    Sign Out
                </button>
            </div>

            <div className="flex gap-2 items-center">
                <Link className="hidden md:flex gap-2 items-center mr-6" href={"/create-post"}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    <span>Create</span>
                </Link>
                <Image
                src={session?.user?.image || ""}
                width={36}
                height={36}
                alt="Profile Image"
                className="rounded-full cursor-pointer"
                onClick={() => setIsPopupVisible((prev) => !prev)}
                />
            </div>
            </>
        ) : (
            <div className="flex items-center">
                <Link className="btn" href={"/sign-in"}>
                    Sign In
                </Link>
            </div>
        )}
    </div>
    );
}