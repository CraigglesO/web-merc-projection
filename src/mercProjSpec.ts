export function toID (zoom: number, x: number, y: number): number {
  return (((1 << zoom) * y + x) * 32) + zoom
}

export function fromID (id: number): [number, number, number] {
  const z = id % 32
  id = (id - z) / 32
  const x = id % (1 << z)
  const y = (id - x) / (1 << z)

  return [z, x, y]
}

// 900913 (Web Mercator) properties.
export const A = 6378137.0
export const MAXEXTENT = 20037508.342789244

export type BBox = [number, number, number, number] // left, bottom, right, top

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
