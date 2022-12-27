import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createToken } from "../../actions/index";

export default function Fitbit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("code", code);
    if (code) {
      dispatch(createToken(code));
      navigate("/fitbit");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div>
      <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=238Z55&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=7wr6vJ_VkL5qO019WLHuMLj95vJndOLsYSugmFk9r5o&code_challenge_method=S256">
        Login with Fitbit
      </a>
    </div>
  );
}
