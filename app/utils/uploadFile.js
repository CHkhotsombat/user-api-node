import multer from 'multer'
import { errorValidateFailed } from './apiHelpers'

export const uploadFile = ({ path, fieldName }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__basedir}/uploads/${path}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    },
  })

  return multer({ storage: storage }).single(fieldName)
}

export const uploadImage = ({ path, fieldName }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__basedir}/uploads/${path}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    },
  })

  return multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const whitelist = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
      ]
      if (!whitelist.includes(file.mimetype)) {
        cb(errorValidateFailed({ message: 'Upload image only!' }))
      } else {
        cb(null, true)
      }
    },
  }).single(fieldName)
}