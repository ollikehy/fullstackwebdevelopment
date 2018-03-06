
const blogs = [
  {
    id: '5a81e6d4967e2d3fa8ec2df8',
    title: 'Blogi',
    author: 'Olli',
    url: 'www.blog.fi',
    likes: 5,
    user: {
      _id: '5a81bff6939e60145ddc7f24',
      username: 'Olli',
      name: 'KH'
    }
  },
  {
    id: '5a81e6d4967e2d3fa8ec2df9',
    title: 'Blogi',
    author: 'Olli',
    url: 'www.blog.fi',
    likes: 0,
    user: {
      _id: '5a81bff6939e60145ddc7f24',
      username: 'Olli',
      name: 'KH'
    }
  },
  {
    id: '5a81e6d4967e2d3fa8ec2dfa',
    title: 'Blogi',
    author: 'Olli',
    url: 'www.blog.fi',
    likes: 0,
    user: {
      _id: '5a81bff6939e60145ddc7f24',
      username: 'Olli',
      name: 'KH'
    }
  },
  {
    id: '5a81e6d5967e2d3fa8ec2dfb',
    title: 'Blogi',
    author: 'Olli',
    url: 'www.blog.fi',
    likes: 0,
    user: {
      _id: '5a81bff6939e60145ddc7f24',
      username: 'Olli',
      name: 'KH'
    }
  },
  {
    id: '5a81e7ce24d791408069ce66',
    title: 'Blogi',
    author: 'Olli',
    url: 'www.blog.fi',
    likes: 0,
    user: {
      _id: '5a81bff6939e60145ddc7f24',
      username: 'Olli',
      name: 'KH'
    }
  },
  {
    id: '5a86fcc95baa3c0abf2be8af',
    title: 'Ilmoituskokeilu',
    author: 'Kirjoittaja',
    url: 'a.fi',
    likes: 9,
    user: {
      _id: '5a86f51f0aeae47a4a526312',
      username: 'epic',
      name: 'eeppista'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { blogs, getAll }