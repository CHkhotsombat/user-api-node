import express from 'express'
import { internalServerError, pagination, responseWithPaging } from '../../../../utils/apiHelpers'
import * as adminService from '../../../../services/admin.service'
export const router = express.Router()

router.get('/', getAdminList)

export async function getAdminList(req, res, next) {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)
    const results = await adminService.getAdminList({
      limit,
      offset,
    })

    responseWithPaging(res, { results, page, pageSize })
  } catch (error) {
    next(internalServerError(error))
  }
}
