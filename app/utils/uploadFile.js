import multer from 'multer'
import { errorValidateFailed } from './apiHelpers'
import path from 'path'

export const uploadFile = ({ filePath, fieldName }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__basedir}/uploads/${filePath}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + randomSuffix() + file.originalname)
    },
  })

  return multer({ storage: storage }).single(fieldName)
}

export const uploadImage = ({ filePath, fieldName }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__basedir}/uploads/${filePath}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + randomSuffix() + file.originalname)
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

export const uploadPrivateFile = ({ filePath, fieldName }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__basedir}/private/${filePath}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + randomSuffix() + path.extname(file.originalname))
    },
  })

  return multer({ storage: storage }).single(fieldName)
}

export const uploadBufferFile = ({ fieldName }) => {
  const storage = multer.memoryStorage()

  return multer({ storage: storage }).single(fieldName)
}

const randomSuffix = () => (Date.now() + '-' + Math.round(Math.random() * 1E9))