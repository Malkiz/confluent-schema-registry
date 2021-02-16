import { Resolver } from 'avsc'

export enum SchemaType {
  AVRO = 'AVRO',
  JSON = 'JSON',
  PROTOBUF = 'PROTOBUF',
  UNKNOWN = 'UNKNOWN',
}

export const schemaTypeFromString = (schemaTypeString: string) => {
  switch (schemaTypeString) {
    case 'AVRO':
    case undefined:
      return SchemaType.AVRO
    case 'JSON':
      return SchemaType.JSON
    case 'PROTOBUF':
      return SchemaType.PROTOBUF
    default:
      return SchemaType.UNKNOWN
  }
}

export interface Serdes {
  serialize(schema: ConfluentSchema, payload: any, opts?: {}): Buffer
  deserialize(schema: ConfluentSchema, buffer: Buffer, opts?: {}): any
}

export abstract class AbstractSerdes implements Serdes {
  abstract serialize(schema: ConfluentSchema, payload: any, opts?: {}): Buffer
  abstract deserialize(schema: ConfluentSchema, buffer: Buffer, opts?: {}): any
}

export type AbstractSerdesType = Object extends AbstractSerdes

export interface AvroSchema {
  toBuffer: (payload: object) => Buffer // FIXME:
  fromBuffer(buffer: Buffer, resolver?: Resolver, noCheck?: boolean): any
  isValid: (payload: object, opts: { errorHook: (path: any) => void }) => void // FIXME:
  name: string | undefined
}

export interface ConfluentSubject {
  name: string
}

export interface ConfluentSchema {
  type: SchemaType
  schemaString: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T = {}> {
      toMatchConfluentEncodedPayload(args: { registryId: number; payload: Buffer }): R
    }
  }
}
