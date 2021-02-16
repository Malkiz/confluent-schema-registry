import { SchemaType, Serdes, AbstractSerdesType } from './@types'

const serdesTypeFromSchemaTypeMap: Record<string, Serdes> = {}

export const serdesTypeFromSchemaType = async (schemaType: SchemaType): Promise<Serdes> => {
  const schemaTypeStr = schemaType.toString()

  if (!serdesTypeFromSchemaTypeMap[schemaTypeStr]) {
    let serdesClass: AbstractSerdesType
    switch (schemaType) {
      case SchemaType.AVRO: {
        serdesClass = await import('./AvroSerdes')
        break
      }
      case SchemaType.JSON: {
        serdesClass = await import('./JsonSerdes')
        break
      }
      case SchemaType.PROTOBUF: {
        serdesClass = await import('./ProtoSerdes')
        break
      }
      default:
        throw new Error()
    }
    serdesTypeFromSchemaTypeMap[schemaTypeStr] = new serdesClass()
  }
  return serdesTypeFromSchemaTypeMap[schemaTypeStr]
}
