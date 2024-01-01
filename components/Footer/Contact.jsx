export default function Contact() {
  return (
    <>
      <div className="flex-col align-">
        <h1 className="font-bold text-center sm:text-center md:text-center">
          Contact
        </h1>
        <ul className="py-4 text-sm space-y-2 md:mr-4 lg:mr-4 text-center sm:text-center md:text-left lg:text-left">
          <li className="lg:hover:border-s pl-2 cursor-pointer">Address</li>
          <li className="lg:hover:border-s pl-2 cursor-pointer">Phone</li>
          <li className="lg:hover:border-s pl-2 cursor-pointer">Office</li>
        </ul>
      </div>
    </>
  );
}
