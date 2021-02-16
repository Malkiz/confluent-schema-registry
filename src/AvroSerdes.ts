import { AvroSchema, ConfluentSchema, AbstractSerdes } from './@types'
import avro from 'avsc'

export default class AvroSerdes extends AbstractSerdes {
  private getAvroSchema(schema: ConfluentSchema) {
    const avroSchema: AvroSchema = avro.Type.forSchema(JSON.parse(schema.schemaString))
    return avroSchema
  }

  public serialize(schema: ConfluentSchema, payload: any): Buffer {
    return this.getAvroSchema(schema).toBuffer(payload)
  }

  public deserialize(schema: ConfluentSchema, buffer: Buffer): any {
    return this.getAvroSchema(schema).fromBuffer(buffer)
  }
}
