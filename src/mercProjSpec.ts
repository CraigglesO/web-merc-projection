/** Convert zoom-x-y to a singular number */
export function toID (zoom: number, x: number, y: number): bigint {
  return BigInt((((1 << zoom) * y + x) * 32) + zoom)
}

/** Convert a number or bigint to [zoom, x, y] */
export function fromID (idB: bigint): [zoom: number, x: number, y: number] {
  let id = Number(idB)
  const z = id % 32
  id = (id - z) / 32
  const x = id % (1 << z)
  const y = (id - x) / (1 << z)

  return [z, x, y]
}

export function children (
  zoom: number,
  x: number,
  y: number
): [blID: bigint, brID: bigint, tlID: bigint, trID: bigint] {
  return [
    toID(zoom + 1, x * 2, y * 2),
    toID(zoom + 1, x * 2 + 1, y * 2),
    toID(zoom + 1, x * 2, y * 2 + 1),
    toID(zoom + 1, x * 2 + 1, y * 2 + 1)
  ]
}

export function parentID (id: bigint): bigint {
  const [z, x, y] = fromID(id)
  return toID(z - 1, Math.floor(x / 2), Math.floor(y / 2))
}

export function contains (parentID: bigint, childID: bigint): boolean {
  const [pz, px, py] = fromID(parentID)
  const [cz, cx, cy] = fromID(childID)
  if (pz > cz) return false
  else if (pz === cz) return px === cx && py === cy
  else {
    const diff = cz - pz
    const mask = (1 << diff) - 1
    return (px === (cx & ~mask)) && (py === (cy & ~mask))
  }
}

export function isFace (id: bigint): boolean {
  const [z] = fromID(id)
  return z === 0
}

// 900913 (Web Mercator) properties.
export const A = 6378137.0
export const MAXEXTENT = 20037508.342789244

export type XYZ = [x: number, y: number, z: number]

export type BBox = [left: number, bottom: number, right: number, top: number]

export type Value = string | number | boolean | null

export type Properties = Record<string, Value>

export type Sources = '900913' | 'WGS84'

/** GEOMETRY **/

export interface FeatureCollection {
  type: 'FeatureCollection'
  features: Feature[]
}

export interface Feature {
  type: 'Feature'
  id?: number
  properties: Properties
  geometry: Geometry
}

export type GeometryType =
  'Point' | 'MultiPoint' | 'LineString' |
  'MultiLineString' | 'Polygon' | 'MultiPolygon'
export type Geometry =
  PointGeometry | MultiPointGeometry | LineStringGeometry |
  MultiLineStringGeometry | PolygonGeometry | MultiPolygonGeometry

// [x, y]
export type Point = [number, number]
export type MultiPoint = Point[]
export type LineString = Point[]
export type MultiLineString = LineString[]
export type Polygon = Point[][]
export type MultiPolygon = Polygon[]

export interface PointGeometry {
  type: 'Point'
  coordinates: Point
}

export interface MultiPointGeometry {
  type: 'MultiPoint'
  coordinates: MultiPoint
}

export interface LineStringGeometry {
  type: 'LineString'
  coordinates: LineString
}

export interface MultiLineStringGeometry {
  type: 'MultiLineString'
  coordinates: MultiLineString
}

export interface PolygonGeometry {
  type: 'Polygon'
  coordinates: Polygon
}

export interface MultiPolygonGeometry {
  type: 'MultiPolygon'
  coordinates: MultiPolygon
}
