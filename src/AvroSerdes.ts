import { AvroSchema, ConfluentSchema, Serdes } from './@types'
import avro from 'avsc'

export class AvroSerdes implements Serdes {
  public serialize(schema: ConfluentSchema, payload: any): Buffer {
    const avroSchema: AvroSchema = avro.Type.forSchema(JSON.parse(schema.schemaString))
    return avroSchema.toBuffer(payload)
  }

  public deserialize(schema: ConfluentSchema, buffer: Buffer): any {
    const avroSchema: AvroSchema = avro.Type.forSchema(JSON.parse(schema.schemaString))
    return avroSchema.fromBuffer(buffer)
  }
}

type AvroSerdesType = typeof AvroSerdes
export type { AvroSerdesType };
