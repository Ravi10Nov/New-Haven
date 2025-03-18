import { RxCrossCircled } from "react-icons/rx";
import { CiCircleCheck } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "config/axios";

function VerifyEmailScreen() {
  const token = localStorage.getItem("token");
  const { email } = useParams();
  console.log(email, "email");
  const origin = window.location.origin;
  console.log("window origin", origin);

  useEffect(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-email`,
        { email, origin }
      );
      console.log("respone", response);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-5">
      {/* {!token ? (
        <div className="flex flex-col items-center gap-2">
          <RxCrossCircled className="h-8 w-8 text-red-600" />
          <h3 className="font-semibold text-xl">There was a problem</h3>
          <p className="text-muted-foreground ">
            This token is not valid or might be expired. Please try again.
          </p>
        </div>
    ) : ( */}
      <div className="flex flex-col items-center gap-2 max-w-[450px]">
        <CiCircleCheck className="h-8 w-8 text-green-500" />

        <p className="text-muted-foreground ">
          Thank you for joining. A message has been sent to
          <span className="text-blue-500"> {email}. </span>
          Please confirm your email to be able to Sign In.
        </p>
      </div>
      {/* //   )} */}
    </div>
  );
}

export default VerifyEmailScreen;
