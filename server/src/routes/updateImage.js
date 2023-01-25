const { Router } = require("express");
const router = Router();
const { User, Plan } = require("../db.js");
const { cloudinary } = require("../utils/cloudinary.js");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const file = req.body.data;
  try {
    const userFoud = await User.findOne({ where: { id: id } });
    if (!userFoud) {
      return res.status(400).send("El usuario no existe");
    }

    if (!file && userFoud.image) {
      await cloudinary.uploader.destroy(userFoud.imageId);
      const update = await User.update(
        { image: null, imageId: null },
        {
          where: {
            id: id,
          },
        }
      );
      if (update) {
        const user = await User.findOne({
          where: { id: id },
          include: {
            model: Plan,
            attributes: ["id", "name", "price", "endTime"],
          },
        });
        return res.status(200).json(user);
      }
    }

    if (file) {
      if (!userFoud.image) {
        const result = await cloudinary.uploader.upload(file, {
          upload_preset: "preset-team8",
        });
        const update = await User.update(
          { image: result.secure_url, imageId: result.public_id },
          {
            where: {
              id: id,
            },
          }
        );
        if (update) {
          const user = await User.findOne({
            where: { id: id },
            include: {
              model: Plan,
              attributes: ["id", "name", "price", "endTime"],
            },
          });
          return res.status(200).json(user);
        }
      }
      if (userFoud.image) {
        const resultado = await cloudinary.uploader.destroy(userFoud.imageId, {
          folder: "SleepTracker-Images",
        });
        if (resultado) {
          const result = await cloudinary.uploader.upload(file, {
            upload_preset: "preset-team8",
          });
          const update = await User.update(
            { image: result.secure_url, imageId: result.public_id },
            {
              where: {
                id: id,
              },
            }
          );
          if (update) {
            const user = await User.findOne({
              where: { id: id },
              include: {
                model: Plan,
                attributes: ["id", "name", "price", "endTime"],
              },
            });
            return res.status(200).json(user);
          }
        }
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
