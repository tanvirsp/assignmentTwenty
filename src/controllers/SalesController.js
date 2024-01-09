const { AddSaleService, TotalRevenueService, QuantityByProductService, TopProductsService, AveragePriceService, RevenueByMonthService, HighestQuantitySoldService } = require("../services/SalesServices");


exports.AddSele = async(req, res) =>{
    const result = await AddSaleService(req);
    res.status(200).json(result);
}

exports.TotalRevenue = async(req, res) =>{
    const result = await TotalRevenueService(req);
    res.status(200).json(result);
}

exports.QuantityByProduct = async(req, res) =>{
    const result = await QuantityByProductService(req);
    res.status(200).json(result);
}


exports.TopProducts = async(req, res) =>{
    const result = await TopProductsService(req);
    res.status(200).json(result);
}


exports.AveragePrice = async(req, res) =>{
    const result = await AveragePriceService(req);
    res.status(200).json(result);
}


exports.RevenueByMonth = async(req, res) =>{
    const result = await RevenueByMonthService(req);
    res.status(200).json(result);
}


exports.HighestQuantitySold = async(req, res) =>{
    const result = await HighestQuantitySoldService(req);
    res.status(200).json(result);
}