import Like from '#models/like'
import { likeValidator } from '#validators/like'
import type { HttpContext } from '@adonisjs/core/http'

export default class LikesController {
    public async createLike({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(likeValidator)
        const create = await Like.create({
            postId: payload.postId,
            userId: auth.user!.id
        })
        response.status(201).json({
            message: 'Like created successfully',
            data: create
        })
    }

    public async deleteLike({params,response}: HttpContext) {
        const like = await Like.query().where('post_id',params.id).delete()
        response.status(200).json({
            message: 'Like deleted successfully',
            data: like
        })
    }

    public async getLIkeByPostId({params,response}: HttpContext) {
        const like = await Like.query().where('post_id',params.id)
        response.status(200).json({
            message: 'Like fetched successfully',
            data: like
        })
    }
}