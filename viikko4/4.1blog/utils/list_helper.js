const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    sum = blogs.reduce(reducer, 0)
    return sum
}

const favouriteBlog = (blogs) => {
    let favourite = 0
    blogs.forEach(blog => {
        if (blog.likes > favourite) {
            favourite = blog.likes
        }
    })
    return favourite
}

//Tämän piti palauttaa vain blogien määrä, mutta palautin sekä nimen ja kirjailijan koska se tuntui järkevämmältä
const mostBlogs = (blogs) => {

    const authors = []

    blogs.forEach(blog => {
        if (authors.some(a => a.name === blog.author)) {
            authIndex = authors.findIndex(a => a.name === blog.author)
            authors[authIndex].blogsWritten = authors[authIndex].blogsWritten + 1
        } else {
            let author = {name: blog.author, blogsWritten: 1}
            authors.push(author)
        }
    })

    let returned = {name: 'Null', blogsWritten: 1}
    authors.forEach(author => {
        if (author.blogsWritten > returned.blogsWritten) {
            returned = author
        }
    })
    return returned
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}