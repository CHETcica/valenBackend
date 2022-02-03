const Hero = require('../models/heroModel');
const tryCatch = require('../utility/tryCatch');

exports.createHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.create(req.body);
  res.status(201).json({
    status: 'success',
    hero,
  });
});

exports.getAllHero = tryCatch(async (req, res, next) => {
  const filter = { ...req.query};
  const excludedFields = ['page','sort','limit'];

  excludedFields.forEach((el) => delete filter[el]);

  let sort = 'name';
  if(req.query.sort){
    sort = req.query.sort.split(',').join(' ');
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip  = (page * limit) || 0;

  // console.log(req.query.atk);
  // {
  //   atk: 400
  // }
  const hero = await Hero.find(filter).sort(sort).skip(skip).limit(limit);
  const count = await Hero.find(filter).count()

  const totalPages = Math.ceil(count/limit);

  res.status(201).json({
    status: 'success',
    result: hero.length,
    hero,
    page,
    limit,
    totalPages
  });
});

exports.getOneHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    hero,
  });
});

exports.updateHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    hero,
  });
});

exports.deleteHero = tryCatch(async (req, res, next) => {
  await Hero.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    hero: null,
  });
});

exports.testHeroQuery = async (req, res, next) => {
  try {
    // const hero = await Hero.find({
    //   $or: [{ atk: { $gte: 325 } }, { atk: { $gte: 300 } }],
    // });

    // const hero = await Hero.find().select('-_id -__v');
    // const hero = await Hero.find().limit(5).skip(3);
    // const hero = await Hero.find().sort('-name')
    // const hero = await Hero.find({ def: { $gt: 100 } })
    //   .select('-_id -__v')
    //   .sort('-name')
    //   .limit(5)
    //   .skip(5);

    await Hero.find({ def: { $gt: 210 } })
      .limit(5)
      .sort({ name: -1 });

    // const hero = await Hero.aggregate([
    //   {
    //     $match: { def: { $gt: 210 } },
    //   },
    //   {
    //     $project: { name: 1 },
    //   },
    //   {
    //     $sort: { name: -1 },
    //   },
    //   {
    //     $skip: 3,
    //   },
    //   {
    //     $limit: 5,
    //   },
    // ]);
    // const hero = await Hero.aggregate([
    //   { $replaceRoot: { newRoot: '$skill' } },
    // ]);

    res.status(200).json({
      result: hero.length,
      status: 'success',
      hero,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
