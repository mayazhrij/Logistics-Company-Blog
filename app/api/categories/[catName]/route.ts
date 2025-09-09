import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismadb";


export const GET = async (request: NextRequest,
    {params}: {params: { catName: string }}
) => { const {catName} = params;
    try {
        const posts = await prisma.category.findUnique({
            where: { catName },
            include: {
                posts: { include: { author: true }, orderBy: {createdAt: "desc"}},
        },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch post" });
    }
};