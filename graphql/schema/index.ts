import { printSchema } from 'graphql'
import builder from '../builder'
import './shopitem'
import './category'
import './auth'
import './cart'
import './checkout'

const schema = builder.toSchema({})

/* writeFileSync(resolve(__dirname, '../../schesma.graphql'), printSchema(schema))
 */
export default schema
