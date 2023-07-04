export const kLimitIJ = 1 << 30

export type BBox = [number, number, number, number] // left, bottom, right, top

export type XYZ = [number, number, number]

export type Face = 0 | 1 | 2 | 3 | 4 | 5

export type Value = string | number | boolean | null

export type S2Properties = Record<string, Value>

/** S2 GEOMETRY **/

export interface S2FeatureCollection {
  type: 'S2FeatureCollection'
  features: S2Feature[]
  faces: Face[]
}

export interface S2Feature {
  type: 'S2Feature'
  id?: number
  face: Face
  properties: S2Properties
  geometry: S2Geometry
}

export type S2GeometryType =
  'Point' | 'MultiPoint' | 'LineString' |
  'MultiLineString' | 'Polygon' | 'MultiPolygon'
export type S2Geometry =
  PointGeometry | MultiPointGeometry | LineStringGeometry |
  MultiLineStringGeometry | PolygonGeometry | MultiPolygonGeometry

// [s, t]
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
