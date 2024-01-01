import Button from "../Button/ButtonOne";
import Badge from "./Badge";
import Bio from "./Bio";
import Image from "next/image";

export default function ProfileCard({ users, pet }) {
  return (
    <>
      <div className="h-screen pt-32">
        <div className="flex-col items-center justify-start ml-9 py-4 sm:ml-14 md:ml-24 lg:ml-0 lg:flex lg:items-center lg:justify-center lg:p-6">
          {users.length === 0 ? (
            <Image
              src="/assets/loading.gif" // Path to your image
              alt="Loading..."
              width={50} // Set the width of the image
              height={50}
            />
          ) : (
            <Bio
              name={users.firstName + " " + users.lastName}
              bio={users.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .toString()
                .replaceAll(",", "-")}
            />
          )}

          <div className="lg:flex gap-3">
            <Badge type={pet} />
          </div>
        </div>
        <hr className="h-0.5 my-7 mx-auto w-10/12 sm:w-10/12 md:w-4/5 lg:w-11/12 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex-col items-center justify-center ">
          <Button purpose="Change Password" />
          <Button purpose="Payment" />
          <Button purpose="Log Out" />
        </div>
      </div>
    </>
  );
}
