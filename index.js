const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8080;

app.get("/banners", (req, res) => {
  models.Banner.findAll({
    limit: 2,
  })
    .then((result) => {
      res.send({
        banners: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다");
    });
});

app.get("/selfies", (req, res) => {
  models.Selfie.findAll({
    attributes: [
      "feeling",
      "id",
      "weather",
      "short",
      "place",
      "createdAt",
      "imageUrl",
    ],

    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      console.log("PRODUCTS : ", result);
      res.send({
        selfies: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("에러 발생");
    });
});

app.post("/selfies", (req, res) => {
  // 비동기 처리
  const body = req.body;
  const { weather, short, place, description, imageUrl } = body;
  if (!weather || !short || !place || !description || !imageUrl) {
    res.status(400).send("모든 필드를 입력해주세요");
  }
  models.Selfie.create({
    weather,
    short,
    place,
    description,
    imageUrl,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생했습니다");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

app.post("/goodday/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Selfie.update(
    {
      feeling: 1,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((result) => {
      res.send({ result: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.post("/notgoodday/:id", (req, res) => {
  const params = req.params;
  const { id } = params;

  models.Selfie.update(
    {
      feeling: 0,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((result) => {
      res.send({ result: false });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.get("/selfies/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Selfie.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        selfie: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다");
    });
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러");
      process.exit();
    });
});
