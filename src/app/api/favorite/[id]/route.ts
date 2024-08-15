import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const data = await prisma.favorite.findMany({
            where: {
                userId: Number(params.id),
            },
            select: {
                id: true,
                dormitory: {
                    select: {
                        id: true,
                        name: true,
                        engname: true,
                        price: true,
                        reviewScore: true,
                        dormitory_img: {
                            select: {
                                url: true,
                            },
                            take: 1
                        },
                    }
                }
            }
        })

        if (!data) {
            return new Response('Dormitory not found', { status: 404 });
        }

        return Response.json(data);
    } catch (error) {
        // console.error('Error fetching dormitory:', error);
        return new Response('Internal server error', { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        await prisma.favorite.delete({
            where: {
                id: Number(params.id)
            }
        })
        return new Response('Success', { status: 200 });
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    }
}