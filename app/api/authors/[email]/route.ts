import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismadb";




export async function GET(request: NextRequest,
    { params }: { params: Promise<{ email: string }> }) {
    try {
        const {email}  = await params;
        const posts = await prisma.user.findUnique({
            where: { email },
            include: {
                posts: { orderBy: {createdAt: "desc"} },
        },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch post" });
    }
};
