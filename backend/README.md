const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fsopen:${password}@atlascluster.sautxcm.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Django for Python Node for JavaScript',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmllbCBMaW9ucyIsImlkIjoiNjRiNTRkMWFjN2JkYmQwMzcyN2RlYTc5IiwiaWF0IjoxNjg5NjA2MDQxfQ.JfTjD8mKyTsEGRPdeSaEwl2QcvFWJpGfgYJIg9m5-kw