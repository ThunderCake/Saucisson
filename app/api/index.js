const _movies = () => ({
  data: [
    {
      title: 'The Lego Movie',
      cover: 'https://fanart.tv/fanart/movies/137106/movieposter/the-lego-movie-5384f5b0528a5.jpg'
    },
    {
      title: 'Interstellar',
      cover: 'https://fanart.tv/fanart/movies/157336/movieposter/interstellar-550825f7cc108.jpg'
    },
    {
      title: 'L\'Age de Glace 5',
      cover: 'https://fanart.tv/fanart/movies/278154/movieposter/ice-age-5-5793662429c24.jpg',
      location: '/Users/yadomi/Downloads/Movies/Ice Age - Collision Course (2016).mkv'
    },
    {
      title: 'Back to the Future',
      cover: 'https://fanart.tv/fanart/movies/105/movieposter/back-to-the-future-5219e860ed5a9.jpg'
    },
    {
      title: 'Kill Bill vol.1',
      cover: 'https://fanart.tv/fanart/movies/24/movieposter/kill-bill-vol-1-5246d7946b579.jpg'
    },
    {
      title: 'Kill Bill vol.2',
      cover: 'https://fanart.tv/fanart/movies/393/movieposter/kill-bill-vol-2-52475fd8a8f8d.jpg'
    },
    {
      title: 'Pulp Fiction',
      cover: 'https://fanart.tv/fanart/movies/680/movieposter/pulp-fiction-521961b7ea925.jpg'
    },
    {
      title: 'The Nice Guys',
      cover: 'https://fanart.tv/fanart/movies/290250/movieposter/the-nice-guys-56f80f4675e4d.jpg'
    }
  ]
})

export const movies = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(_movies()), 200)
  })
}
