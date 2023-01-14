import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createToken } from "../../actions/index.js";

export default function Fitbit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentUser = useSelector((state) => state.users?.currentUser);
  const userId = currentUser.id;

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      dispatch(createToken(code, userId));
      searchParams.delete("code");
      navigate("/private/home");
    }
  }, [searchParams, navigate, dispatch, userId]);

  return (
    <Button variant="contained">
      <a
        href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=238Z55&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=7wr6vJ_VkL5qO019WLHuMLj95vJndOLsYSugmFk9r5o&code_challenge_method=S256"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        Login with Fitbit
      </a>
    </Button>
  );
}
