import type { AvroSerdesType } from './AvroSerdes'
import type { ProtoSerdesType } from './ProtoSerdes'
import { SchemaType, Serdes } from './@types'

const serdesTypeFromSchemaTypeMap: Record<string, Serdes> = {}

export const serdesTypeFromSchemaType = async (schemaType: SchemaType): Promise<Serdes> => {
  const schemaTypeStr = schemaType.toString()

  if (!serdesTypeFromSchemaTypeMap[schemaTypeStr]) {
    let serdes
    switch (schemaType) {
      case SchemaType.AVRO: {
        const { AvroSerdes }: { AvroSerdes: AvroSerdesType } = await import('./AvroSerdes')
        serdes = new AvroSerdes()
        break
      }
      case SchemaType.PROTOBUF: {
        const { ProtoSerdes }: { ProtoSerdes: ProtoSerdesType } = await import('./ProtoSerdes')
        serdes = new ProtoSerdes()
        break
      }
      default:
        throw new Error()
    }
    serdesTypeFromSchemaTypeMap[schemaTypeStr] = serdes
  }
  return serdesTypeFromSchemaTypeMap[schemaTypeStr]
}
