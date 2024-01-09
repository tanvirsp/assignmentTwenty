const express = require('express');
const router = express.Router();

const SalesController = require('../controllers/SalesController')


router.post("/addSale", SalesController.AddSele )



router.get('/sales/total-revenue', SalesController.TotalRevenue);
router.get('/sales/quantity-by-product', SalesController.QuantityByProduct);
router.get('/sales/top-products', SalesController.TopProducts);
router.get('/sales/average-price', SalesController.AveragePrice);
router.get('/sales/revenue-by-month', SalesController.RevenueByMonth);
router.get('/sales/highest-quantity-sold', SalesController.HighestQuantitySold);




module.exports = router;