import { isFloat, degToRad, radToDeg } from './util.js'
import { A, MAXEXTENT } from './mercProjSpec.js'

import type { Sources, Point, BBox } from './mercProjSpec.js'

/** CONSTANTS **/
// { tileSize => { zoom => [Bc, Cc, Zc, Ac] } }
type Cache = Record<number, Record<number, BBox>>
const CACHE: Cache = {}

function getCache (zoom: number, tileSize: number): BBox {
  if (zoom < 0 || zoom > 30) throw Error('Invalid zoom level')
  if (isFloat(zoom)) return buildSizes(zoom, tileSize)
  if (CACHE[tileSize] === undefined) CACHE[tileSize] = {}
  const tilesizeCache = CACHE[tileSize] as unknown as Record<number, BBox>
  if (!Array.isArray(tilesizeCache[zoom])) {
    tilesizeCache[zoom] = buildSizes(zoom, tileSize)
  }
  return tilesizeCache[zoom] as BBox
}

function buildSizes (zoom: number, tileSize: number): BBox {
  const size = tileSize * Math.pow(2, zoom)
  return [
    size / 360,
    size / (2 * Math.PI),
    size / 2,
    size
  ]
}

/**
 * Convert Longitude and Latitude to a mercator pixel coordinate
 * */
export function llToPX (
  ll: Point,
  zoom: number,
  antiMeridian = false,
  tileSize = 512
): Point {
  const { min, max, sin, log, round } = Math
  const [Bc, Cc, Zc, Ac] = getCache(zoom, tileSize)
  const expansion = antiMeridian ? 2 : 1
  const d = Zc
  const f = min(max(sin(degToRad(ll[1])), -0.9999), 0.9999)
  let x = d + ll[0] * Bc
  let y = d + 0.5 * log((1 + f) / (1 - f)) * (-Cc)
  if (!isFloat(zoom)) {
    x = round(x)
    y = round(y)
  }
  if (x > Ac * expansion) x = Ac * expansion
  if (y > Ac) y = Ac

  return [x, y]
}

/**
 * Convert mercator pixel coordinates to Longitude and Latitude
 * */
export function pxToLL (
  px: Point,
  zoom: number,
  tileSize = 512
): Point {
  const [Bc, Cc, Zc] = getCache(zoom, tileSize)
  const g = (px[1] - Zc) / (-Cc)
  const lon = (px[0] - Zc) / Bc
  const lat = radToDeg(2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI)
  return [lon, lat]
}

/**
 * Convert Longitude and Latitude to a mercator x-y coordinates
 */
export function llToMerc (ll: Point): Point {
  let x = degToRad(A * ll[0])
  let y = A * Math.log(Math.tan((Math.PI * 0.25) + degToRad(0.5 * ll[1])))
  // if xy value is beyond maxextent (e.g. poles), return maxextent.
  if (x > MAXEXTENT) x = MAXEXTENT
  if (x < -MAXEXTENT) x = -MAXEXTENT
  if (y > MAXEXTENT) y = MAXEXTENT
  if (y < -MAXEXTENT) y = -MAXEXTENT

  return [x, y]
}

/**
 * Convert mercator x-y coordinates to Longitude and Latitude
 */
export function mercToLL (merc: Point): Point {
  const x = radToDeg(merc[0] / A)
  const y = radToDeg((0.5 * Math.PI) - 2 * Math.atan(Math.exp(-merc[1] / A)))
  return [x, y]
}

/**
 * Convert a bbox of the form `[w, s, e, n]` to a bbox of the form `[w, s, e, n]`
 * The result can be in lon-lat (WGS84) or WebMercator (900913)
 * If the input is in WebMercator (900913), the outSource should be set to 'WGS84'
 */
export function convert (bbox: BBox, outSource: Sources): BBox {
  if (outSource === 'WGS84') return [...mercToLL([bbox[0], bbox[1]]), ...mercToLL([bbox[2], bbox[3]])]
  return [...llToMerc([bbox[0], bbox[1]]), ...llToMerc([bbox[2], bbox[3]])]
}

/**
 * Convert a tile x-y-z to a bbox of the form `[w, s, e, n]`
 * The result can be in lon-lat (WGS84) or WebMercator (900913)
 * The default result is in WebMercator (900913)
 */
export function xyzToBBOX (
  x: number,
  y: number,
  zoom: number,
  tmsStyle = true,
  source: Sources = '900913',
  tileSize = 512
): BBox {
  // Convert xyz into bbox with srs WGS84
  // if tmsStyle, the y is inverted
  if (tmsStyle) y = (Math.pow(2, zoom) - 1) - y
  // Use +y to make sure it's a number to avoid inadvertent concatenation.
  const ll: Point = [x * tileSize, (+y + 1) * tileSize] // lower left
  // Use +x to make sure it's a number to avoid inadvertent concatenation.
  const ur: Point = [(x + 1) * tileSize, y * tileSize] // upper right
  // to pixel-coordinates
  const pxLL = pxToLL(ll, zoom, tileSize)
  const pxUR = pxToLL(ur, zoom, tileSize)

  // If web mercator requested reproject to 900913.
  if (source === '900913') {
    return [
      ...llToMerc(pxLL),
      ...llToMerc(pxUR)
    ]
  }
  return [...pxLL, ...pxUR]
}

/**
 * Convert a bbox of the form `[w, s, e, n]` to a tile's bounding box
 * in the form of [minX, maxX, minY, maxY]
 * The bbox can be in lon-lat (WGS84) or WebMercator (900913)
 * The default expectation is in WebMercator (900913)
 */
export function bboxToXYZBounds (
  bbox: BBox,
  zoom: number,
  tmsStyle = true,
  source: Sources = '900913',
  tileSize = 512
): { minX: number, maxX: number, minY: number, maxY: number } {
  const { min, max, pow, floor } = Math
  let ll: Point = [bbox[0], bbox[1]] // lower left
  let ur: Point = [bbox[2], bbox[3]] // upper right

  if (source === '900913') {
    ll = llToMerc(ll)
    ur = llToMerc(ur)
  }

  const pxLL = llToPX(ll, zoom, false, tileSize)
  const pxUR = llToPX(ur, zoom, false, tileSize)
  // Y = 0 for XYZ is the top hence minY uses pxUR[1].
  const x = [floor(pxLL[0] / tileSize), floor((pxUR[0] - 1) / tileSize)]
  const y = [floor(pxUR[1] / tileSize), floor((pxLL[1] - 1) / tileSize)]

  const bounds = {
    minX: min(...x) < 0 ? 0 : min(...x),
    minY: min(...y) < 0 ? 0 : min(...y),
    maxX: max(...x),
    maxY: max(...y)
  }

  if (tmsStyle) {
    const tmsMinY = (pow(2, zoom) - 1) - bounds.maxY
    const tmsMaxY = (pow(2, zoom) - 1) - bounds.minY
    bounds.minY = tmsMinY
    bounds.maxY = tmsMaxY
  }

  return bounds
}
