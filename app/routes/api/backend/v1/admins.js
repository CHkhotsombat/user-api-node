import express from 'express'
import {
  internalServerError,
  pagination,
  responseSuccess,
  responseWithPaging,
} from '../../../../utils/apiHelpers'
import * as adminService from '../../../../services/admin.service'
import * as adminEntity from './entities/admin.entity'

export const router = express.Router()

router.get('/', getAdminList)
router.get('/:id', findById)

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

export async function findById(req, res, next) {
  try {
    const admin = await adminService.findById(req.params.id)

    responseSuccess({ res, status: 200, data: adminEntity.adminDetail(admin) })
  } catch (error) {
    next(internalServerError(error))
  }
}