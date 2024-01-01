import Image from "next/image";

export function Avatar({ size }) {
  return (
    <div className="lg:mt-3">
      <Image
        src="/assets/doctor.png"
        alt="me"
        width={size}
        height={size}
        className=" rounded-full ring ring-offset-2 w-20 h-20 ring-green-500 sm:w-28 sm:h-28 md:w-32 md:h-32 shadow-lg"
      />
    </div>
  );
}
