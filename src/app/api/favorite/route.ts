import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST( req: Request, res: Response ) {
    try {
        const {dmtId, userId} = await req.json();
        const result = await prisma.favorite.create({
            data: {
                dmtId,
                userId: Number(userId),
            }
        })
        return Response.json({
            massage: 'Success',
        })
    } catch (error) {
        return new Response('Internal server error', { status: 500 });

    }
}