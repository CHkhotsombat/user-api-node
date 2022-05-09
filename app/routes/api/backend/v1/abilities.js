import express from 'express'
import { sequelize } from '../../../../models'
import * as AbilityService from '../../../../services/ability.service'
import {
  errorValidateFailed,
  pagination,
  responseSuccess,
  responseWithPaging,
} from '../../../../utils/apiHelpers'
import * as AbilityEntity from './entities/ability.entity'
import { createAbilitySchema } from './schema/ability.schema'

export const router = express.Router()

router.get('/', getAbilityList)
router.post('/', createAbility)
router.get('/:id', findById)
router.put('/:id', updateAbility)

export async function getAbilityList(req, res, next) {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)
    const results = await AbilityService.getAbilityList({
      limit,
      offset,
    })

    responseWithPaging(res, { results, page, pageSize })
  } catch (error) {
    next(error)
  }
}

export async function createAbility(req, res, next) {
  const tx = await sequelize.transaction()

  try {
    const errors = createAbilitySchema(req.body)
    if (errors) return next(errorValidateFailed({ errors: errors.details }))

    // error if exist
    let existAbility = await AbilityService.findOne({ name: req.body.name }, { tx })
    if (existAbility) {
      return next(errorValidateFailed({ message: 'Name is already exists.' }))
    }

    existAbility = await AbilityService.findOne({ code: req.body.code }, { tx })
    if (existAbility) {
      return next(errorValidateFailed({ message: 'Code is already exists.' }))
    }

    await AbilityService.createAbility(req.body, { tx })
    await tx.commit()

    responseSuccess({ res, status: 201 })
  } catch (error) {
    await tx.rollback()
    next(error)
  }
}

export async function findById(req, res, next) {
  try {
    const ability = await AbilityService.findById(req.params.id)

    responseSuccess({ res, status: 200, data: AbilityEntity.abilityDetail(ability) })
  } catch (error) {
    next(error)
  }
}

export async function updateAbility(req, res, next) {
  const tx = await sequelize.transaction()

  try {
    const ability = await AbilityService.findById(req.params.id, { tx })

    const errors = createAbilitySchema(req.body)
    if (errors) return next(errorValidateFailed({ errors: errors.details }))

    // error if exist
    let existAbility = await AbilityService.findOne({ name: req.body.name }, { tx })

    if (existAbility && ability.id != existAbility.id) {
      return next(errorValidateFailed({ message: 'Name is already exists.' }))
    }

    existAbility = await AbilityService.findOne({ code: req.body.code }, { tx })

    if (existAbility && ability.id != existAbility.id) {
      return next(errorValidateFailed({ message: 'Code is already exists.' }))
    }

    await AbilityService.updateAbility(ability, req.body, { tx })
    await tx.commit()

    responseSuccess({ res, status: 200, data: AbilityEntity.abilityDetail(ability) })
  } catch (error) {
    await tx.rollback()
    next(error)
  }
}