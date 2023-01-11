const { Op } = require("sequelize");
const {
  NewRecord,
} = require("../db.js");


const getRecordsRange = async (req, res) => {

const { id, date, endDate } = req.query;

const where= {
  [Op.and]: [{ userId: id, 
    dateMeal: {[Op.between]: [date, endDate]}
  }],
}

const order = [["dateMeal", "ASC"]]

  try {
    let finalResultsId = []
    const resDb = await NewRecord.findAll({
  where: where,
  
   order: order,
});

if (resDb.length < 1) {
  return res
    .status(200)
    .json({
      message: `No hay registros`,
    });
}

for (let i = 0; i < resDb.length; i++) {
  
  let timeActivity ;
  let coffeeCups;
  let quantityDrinks;

  if (resDb[i].timeActivity.length >= 1) {
    timeActivity = resDb[i].timeActivity.flat();
    timeActivity = timeActivity[0]
  }

  if (resDb[i].coffeeCups.length >= 1) {
    coffeeCups = resDb[i].coffeeCups.flat();
    coffeeCups = coffeeCups[0]

  }

  if (resDb[i].drinks.length >= 1) {
    quantityDrinks = resDb[i].drinks.flat();
    quantityDrinks =quantityDrinks[0]
  
  }

  let obj = {
    id: resDb[i].id,
    userId: resDb[i].userId,
    dateMeal: resDb[i].dateMeal,
    timeMeal: resDb[i].timeMeal?resDb[i].timeMeal: 0,
    timeActivity: timeActivity?timeActivity:0,
    coffee: coffeeCups?coffeeCups: 0,
    drinks: quantityDrinks?quantityDrinks:0,
  };
  finalResultsId.push(obj);
} 

return res.status(200).json(finalResultsId);



  } catch (error) {
    console.log(error)


  }
}



//     try {
//       let finalResultsId = []
//       const resDb = await NewRecord.findAll({
//     include: [{ all: true }],
//     where: {
//       [Op.and]: [{ userId: id, 
//         dateMeal: {[Op.between]: [date, endDate]}
//       }],
//     },
//     order: [["dateMeal", "ASC"]],
//   });

//   if (resDb.length < 1) {
//     return res
//       .status(200)
//       .json({
//         message: `No hay registros en fecha: ${date} para el userId: ${id}`,
//       });
//   }

//   for (let i = 0; i < resDb.length; i++) {
    
//     let timeActivity ;
//     let coffeeCups;
//     let quantityDrinks;

//     if (resDb[i].timeActivity.length >= 1) {
//       timeActivity = resDb[i].timeActivity.flat();
//       timeActivity = timeActivity[0]
//     }

//     if (resDb[i].coffeeCups.length >= 1) {
//       coffeeCups = resDb[i].coffeeCups.flat();
//       coffeeCups = coffeeCups[0]

//     }

//     if (resDb[i].drinks.length >= 1) {
//       quantityDrinks = resDb[i].drinks.flat();
//       quantityDrinks =quantityDrinks[0]
    
//     }

//     let obj = {
//       id: resDb[i].id,
//       userId: resDb[i].userId,
//       dateMeal: resDb[i].dateMeal,
//       timeMeal: resDb[i].timeMeal?resDb[i].timeMeal: 0,
//       timeActivity: timeActivity?timeActivity:0,
//       coffee: coffeeCups?coffeeCups: 0,
//       drinks: quantityDrinks?quantityDrinks:0,
//     };
//     finalResultsId.push(obj);
//   } 

//   return res.status(200).json(finalResultsId);



//     } catch (error) {
//       console.log(error)
//     }
//  }
// }

module.exports = getRecordsRange;