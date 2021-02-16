import { ConfluentSchema, AbstractSerdes } from './@types'
import Ajv from 'ajv'

export default class JsonSerdes extends AbstractSerdes {
  private getJsonSchema(schema: ConfluentSchema, opts: any) {
    const ajv = new Ajv(opts)
    const validate = ajv.compile(JSON.parse(schema.schemaString))
    return validate
  }

  private validate(schema: ConfluentSchema, payload: any, opts: any) {
    const validate = this.getJsonSchema(schema, opts)
    if (!validate(payload)) {
      throw Error(validate.errors as any)
    }
  }

  public serialize(schema: ConfluentSchema, payload: any, opts: any): Buffer {
    this.validate(schema, payload, opts)
    return Buffer.from(JSON.stringify(payload))
  }

  public deserialize(schema: ConfluentSchema, buffer: Buffer, opts: any): any {
    const payload = JSON.parse(buffer.toString())
    this.validate(schema, payload, opts)
    return payload
  }
}
