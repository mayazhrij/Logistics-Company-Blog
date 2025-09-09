import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { Category } from "@prisma/client"; // optional, for type hinting

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ catName: string }> }
): Promise<Response> {
    try {
        const { catName } = await context.params;

        const categories: Category[] = await prisma.category.findMany({
            where: {
                catName
            },
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Sorry, something went wrong" },
            { status: 500 }
        );
    }
}
