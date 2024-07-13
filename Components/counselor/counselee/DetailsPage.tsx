import { useGlobalState } from "@/Components/context/state";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

export default function DetailsPage({ counseleeId }: { counseleeId: string }) {
  const { state, dispatch } = useGlobalState();
  const [counseleeDetails, setCounseleeDetails] = useState<counselee>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/counslee/id/${counseleeId}`);
        if (response.ok) {
          const responseData = await response.json();
          setCounseleeDetails(responseData.content.Content);
        } else {
          const responseData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              message: responseData.message || responseData.title,
              type: "ERROR",
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: error.message || error.title, type: "ERROR" },
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <div className="p-5 flex md:flex-row flex-col justify-center items-center md:px-10 gap-5">
      <div
        className={`p-5 rounded-full ${
          state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
        }`}
      >
        <UserIcon className=" h-40 w-40 text-gray-500" />
      </div>
      <div>
        {isLoading ? (
          <div
            role="status"
            className="flex justify-center items-center h-[80vh]"
          >
            <svg
              area-hidden="true"
              className={`w-8 h-8  animate-spin ${
                state.theme.theme === "LIGHT"
                  ? "text-gray-200"
                  : "text-gray-600"
              } fill-blue-600`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="md:p-10 p-5">
            <div className="flex flex-col gap-3">
              <p className="text-3xl font-bold">
                {`${counseleeDetails?.firstName} ${counseleeDetails?.lastName}`}
              </p>
              <div className="font-semibold text-gray-500 text-lg flex items-center gap-2">
                <p>Initiated Name : </p>{" "}
                <p>
                  {counseleeDetails?.initiatedName
                    ? counseleeDetails?.initiatedName
                    : "Not Available"}
                </p>
              </div>
              <div className="font-semibold text-gray-500 text-lg flex items-center gap-2">
                <p>Phone Number : </p> <p>{counseleeDetails?.phoneNumber}</p>
              </div>
              <div className="font-semibold text-gray-500 text-lg flex items-center gap-2">
                <p>Gender : </p>{" "}
                {counseleeDetails?.gender === "MALE" ? (
                  <div className="flex items-center">
                    <p className="text-orange-500">
                      <FaMale />
                    </p>
                    <p>MALE</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="text-pink-500">
                      <FaFemale />
                    </p>
                    <p>FEMALE</p>
                  </div>
                )}
              </div>
              <div className="font-semibold text-gray-500 text-lg flex items-center gap-2">
                <p>Address : </p> <p>{counseleeDetails?.address}</p>
              </div>
              <div className="font-semibold text-gray-500 text-lg flex items-center gap-2">
                <p>Marital Status : </p>{" "}
                <p>{counseleeDetails?.maritalStatus}</p>
              </div>
              {counseleeDetails?.maritalStatus === "MARRIED" &&
                counseleeDetails.spouce && (
                  <div className="font-semibold text-gray-500 text-lg flex items-center gap-2">
                    <p>Spouce : </p>
                    <p>
                      {counseleeDetails?.spouce?.initiatedName
                        ? counseleeDetails.spouce.initiatedName
                        : `${counseleeDetails.spouce.firstName} ${counseleeDetails.spouce.lastName}`}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
