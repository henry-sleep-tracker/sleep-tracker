const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    const response = await fetch(
      `https://api.fitbit.com/oauth2/token?client_id=238Z55&code=${code}&code_verifier=48601r4939480m540t0v3p6b3z3a4l323s0a6f0q0t4e1e0y133809063f1q2n425j362z0k5t1c1p0m6u2d4w3a6b4p2j4z2f175u182t5p6n576h2p3e2b5j090g68&grant_type=authorization_code`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic MjM4WjU1OmIyYmI2ZDQxNTljODVjZTBkZjYxY2ExN2EwMTJlYzM2",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const getToken = await response.json();

    const token = await getToken.access_token;

    const data = await fetch(
      `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${endDate}.json`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const getData = await data.json();
    console.log("dataNORECENT", getData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
