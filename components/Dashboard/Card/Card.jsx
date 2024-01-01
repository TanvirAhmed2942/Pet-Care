import { FaUserDoctor, FaUsers, FaRegMoneyBill1 } from "react-icons/fa6";
export default function Card({ show }) {
  return (
    <div className="h-40 w-80 lg:h-36 lg:w-80 px-5 bg-sky-400 hover:bg-sky-500 rounded shadow-md flex items-center gap-20">
      {show == "Doctor" ? (
        <FaUserDoctor size={50} />
      ) : show == "User" ? (
        <FaUsers size={50} />
      ) : (
        <FaRegMoneyBill1 size={50} />
      )}
      <h1 className="text-5xl">127</h1>
    </div>
  );
}
