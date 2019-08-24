const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Useful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Useful.html',
      likes: 4,
      __v: 0
    }
  ]

  test('when list has two blogs', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(9)
  })
})

describe('favourite blog', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Useful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Useful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when the list has two blogs with different likes', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toBe(listWithTwoBlogs[1])
  })
})

describe('most blogs', () => {
  const listWithFiveBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Useful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Useful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Go To Statement Considered Good',
      author: 'C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Good.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Bad',
      author: 'C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Bad.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Go To Statement Considered Ugly',
      author: 'C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Ugly.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has five blogs with two authors', () => {
    const result = listHelper.mostBlogs(listWithFiveBlogs)
    const returnObject = {
      author: 'C. Martin',
      blogs: 3
    }
    expect(result).toEqual(returnObject)
  })
})

describe('most likes', () => {
  const listWithFiveBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Useful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Useful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Go To Statement Considered Good',
      author: 'C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Good.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Bad',
      author: 'C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Bad.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Go To Statement Considered Ugly',
      author: 'C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Ugly.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has five blogs with two authors', () => {
    const result = listHelper.mostLikes(listWithFiveBlogs)
    const returnObject = {
      author: 'C. Martin',
      likes: 29
    }
    expect(result).toEqual(returnObject)
  })
})
