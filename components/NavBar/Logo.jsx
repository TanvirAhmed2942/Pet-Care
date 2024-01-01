import Image from "next/image";
export default function Logo() {
  return (
    <>
      <Image
        src="/assets/logo.jpg"
        alt="me"
        width="80"
        height="80"
        className="w-12 h-12 rounded-full"
      />
    </>
  );
}
