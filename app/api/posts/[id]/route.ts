import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest,
    {params}: {params: Promise<{ id: string }> }
) { const {id} = await params;
    try {
        const post = await prisma.post.findUnique({ where: { id } });
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch post" });
    }
};

export async function PUT(req: NextRequest,
    {params}: {params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    
        if (!session) {
            return NextResponse.json({error: "Not authenticated"}, {status: 401});
        }

    const {title, content, links, selectedCategory, imageUrl, publicId} =
        await req.json();
    const {id} = await params;

    try {
        const post = await prisma.post.update({
            where: {id},
            data: {
                title,
                content,
                links,
                catName: selectedCategory,
                imageUrl,
                publicId,
            },
        });

        return NextResponse.json(post);

    } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error editing post" });
        
    }
};

export async function DELETE(
    req: NextRequest,
    {params}: {params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    const {id} = await params;
    try {
        const post = await prisma.post.delete({ where: { id } });
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting the post" });
    }
};