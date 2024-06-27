const router = require("express").Router()
const productController = require("../controllers/productController")

router.get('/:skip', productController.getProducts)
router.get('/search/:query', productController.getProductByQuery)
router.get('/categories/get-categories', productController.getProductsCategories)
router.get('/category/:query', productController.getProductsByCategory)


module.exports = router
