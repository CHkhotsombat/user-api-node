import multer from 'multer'

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