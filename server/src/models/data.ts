import * as fs from 'fs'
import * as path from 'path'

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data.json'), 'utf8'))

export default data
