import Link from "next/link";

export default function PreReg() {
  return (
    <div className="top-0 right-0 w-[100%] h-[100vh] flex items-center justify-center">
      <div className="w-36 lg:h-28 lg:p-3  bg-slate-300 flex flex-col items-center justify-center rounded-lg shadow-md">
        <button
          value={"Doctor"}
          className="px-2 py-0.5 text-left lg:my-2 hover:bg-black hover:text-white rounded-md"
        >
          <Link href={"/SignUp/Vet"}>I am Doctor</Link>
        </button>
        <p className="font-sans">Or</p>
        <button
          value={"User"}
          className="px-2 py-0.5 text-left lg:my-2 hover:bg-black hover:text-white rounded-md"
        >
          <Link href={"/SignUp/User"}>I am User</Link>
        </button>
      </div>
    </div>
  );
}
