const axios = require('axios')

module.exports.getProducts = async (req, res) => {
    const url = `https://dummyjson.com/products?limit=20&skip=${req.params.skip}&select=title,description,price,rating,discountPercentage,thumbnail`
    const apiRes = await axios.get(url)
    res.json(apiRes.data)
}

module.exports.getProductByQuery = async (req, res) => {
    const url = `https://dummyjson.com/products/search?q=${req.params.query}`
    const apiRes = await axios.get(url)
    res.json(apiRes.data)
}

module.exports.getProductsCategories = async (req, res) => {
    const url = 'https://dummyjson.com/products/categories'
    const apiRes = await axios.get(url)
    const categories = apiRes.data.map((category) => category.name)
    res.json(categories)
}

module.exports.getProductsByCategory = async (req, res) => {
    const url = `https://dummyjson.com/products/category/${req.params.query}`
    const apiRes = await axios.get(url)
    res.json(apiRes.data)
}