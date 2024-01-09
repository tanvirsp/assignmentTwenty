const SalesModel = require("../models/SalesModel")

exports.AddSaleService = async(req) => {
    try {
        const reqBody = req.body;
        await SalesModel.create(reqBody);

        return {status:"success", message:"Sales Added Successfully"}
    } catch (error) {
       return {status:"fail", data:error.toString()}
    }
}

exports.TotalRevenueService = async(req) =>{
    try {   
        const totalStage = {
            $group: {
                _id: 0,
                totalRevinue: {$sum: {$multiply:[ "$quantity", "$price"]}  }
            }
        }

        const data = await SalesModel.aggregate([
            totalStage
        ])

        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}

exports.QuantityByProductService = async(req) =>{
    try {

        const quantityStage = {
            $group: {
                _id: "$product",
                totalSale: {$sum: "$quantity"}
            }
        }

        const data = await SalesModel.aggregate([
            quantityStage
        ])

        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}


exports.TopProductsService = async(req) =>{
    try {

        const totalStage = {
            $group: {
                _id: "$product",
                totalRevinue: {$sum: {$multiply:[ "$quantity", "$price"]}  }
            }
        };

        const sortStage ={
            $sort: {"totalRevinue": -1}
        }

        const limitStage ={
            $limit: 5
        }

        const data = await SalesModel.aggregate([
            totalStage,
            sortStage,
            limitStage
        ])


        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}


exports.AveragePriceService = async(req) =>{
    try {

        const totalStage = {
            $group: {
                _id: "$product",
                averagePrice: {$avg: {$multiply:[ "$quantity", "$price"]}  }
            }
        };

        const data = await SalesModel.aggregate([
           totalStage
        ])


        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}


exports.RevenueByMonthService = async(req) =>{
    try {
        const projectStage ={
            $project: {
                month:{$month: "$date"},
                year: {$year: "$date"},
                product: 1,
                quantity: 1,
                price: 1
            }   
        };

        const groupStage= {
            $group: {
                _id: {month: "$month", year: "$year"},
                totalSale: {$sum: {$multiply:[ "$quantity", "$price"]}  }
               
            }
        }
        
        const data= await SalesModel.aggregate([
            projectStage,
            groupStage


        ])

        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}

exports.HighestQuantitySoldService = async(req) =>{
    try {
        const projectStage ={
            $project: {
                day:{$dayOfMonth: "$date"}, 
                product: 1,
                quantity: 1,
                price: 1
            }   
        };
        
        const groupStage= {
            $group: {
                _id: {day: "$day", product: "$product"},
                quantitySold: {$sum: "$quantity"}  
               
            }
        };

        const sortStage = {
            $sort: {   quantitySold: -1    }
        };

        const limitStage ={$limit: 1}



        const data= await SalesModel.aggregate([
            projectStage,
            groupStage,
            sortStage,
            limitStage

        ])

        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
    
}