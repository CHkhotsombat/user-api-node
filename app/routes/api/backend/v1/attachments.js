import express from 'express'
import _ from 'lodash'
import { responseSuccess } from '../../../../utils/apiHelpers'
import { uploadPrivateFile } from '../../../../utils/uploadFile'
import { privatePath } from '../../../../utils/helpers'

export const router = express.Router()
export const uploadAttachment = uploadPrivateFile({
  filePath: '/attachments',
  fieldName: 'attachment',
})

router.post('/upload', uploadAttachment, uploadFile)
router.get('/download', downloadFile)

export function uploadFile (req, res, next){
  try {
    const filename = _.get(req, 'file.filename')
    const data = { fileName: filename }

    responseSuccess({ res, status: 200, data})
  } catch (error) {
    next(error)
  }
}

export function downloadFile (req, res, next) {
  try {
    const { fileName } = req.query

    const file = `${privatePath()}/attachments/${fileName}`

    // ** Download with rename file **
    // const extname = path.extname(fileName)
    // const newName = `ไฟล์เอ็กเซล์นี้มีประโยชน์${extname}`
    // res.download(file, newName)

    res.download(file)
  } catch (error) {
    next(error)
  }
}