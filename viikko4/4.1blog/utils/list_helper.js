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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}