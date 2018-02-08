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

module.exports = {
    dummy,
    totalLikes
}