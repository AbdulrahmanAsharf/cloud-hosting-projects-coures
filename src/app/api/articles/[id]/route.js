import {  NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';

/**
 *  @method  GET
 *  @route   ~/api/articles/:id
 *  @desc    Get Single Article By Id
 *  @access  public
 */
export async function GET(request, { params }) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    },
                    orderBy: {
                        //createdAt: 'desc'
                    }
                }
            }
        });

        if (!article) {
            return NextResponse.json({ message: 'article not found' }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}


/**
 *  @method  PUT
 *  @route   ~/api/articles/:id
 *  @desc    Update Article
 *  @access  private (only admin can update article)
 */
export async function PUT(request, { params }) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            )
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!article) {
            return NextResponse.json({ message: 'article not found' }, { status: 404 });
        }

        const body = await request.json();
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        });

        return NextResponse.json(updatedArticle, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}

/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id
 *  @desc    Delete Article
 *  @access  private (only admin can delete article)
 */
export async function DELETE(request, { params }) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            )
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: { comments: true }
        });
        if (!article) {
            return NextResponse.json({ message: 'article not found' }, { status: 404 });
        }

        // deleting the article
        await prisma.article.delete({ where: { id: parseInt(params.id) } });

        return NextResponse.json({ message: 'article deleted' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}
