import CPBAPI from 'cpasbien-api'
import parser from 'torrent-name-parser'
import { map, uniqWith, filter, take, groupWith, uniq, sort, toLower, compose, flatten } from 'ramda'
import { compareStrings } from 'resemblance'

const QUALITIES = ['webrip', 'dvdrip', 'bdrip', 'bluray']

const api = new CPBAPI()

const humanize = movie => ({ ...movie, ...parser(movie.title) })
const dedupe = (a, b) => compareStrings(a.title, b.title) > 0.8

const sortQuality = sort(({ quality: a }, { quality: b }) =>
  QUALITIES.indexOf(toLower(a)) < QUALITIES.indexOf(toLower(b)))

const filterQuality = compose(flatten, map(take(1)))

api.Latest()
  .then(({ items }) => items)
  .then(map(humanize))
  .then(groupWith(dedupe))
  .then(map(sortQuality))
  .then(filterQuality)
  .then(console.log)

export const movies = () => api.Latest()
  .then(({ items }) => items)
  .then(map(humanize))
  .then(uniqWith(dedupe))
  .then(filter(({ title }) => title !== 'Broken Vows'))
  .then(take(14))
  .then((data) => ({ data }))
