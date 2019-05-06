const blogs = [
  {
    id: '5a451df7571c224a31b5c8cd',
    title: 'HTML on helppoa',
    likes: 2,
    url: 'www.asd.com',
    author: 'klaevv'
  },
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on vaikeeta',
    likes: 3,
    url: 'www.wasd.copm',
    author: 'klaevv'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
