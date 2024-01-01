export default function Menu() {
  return (
    <>
      <div className="flex-col align-middle">
        <h1 className="font-bold text-center sm:text-center md:text-center">
          Menu
        </h1>
        <ul className="py-4 text-center space-y-2 text-sm sm:text-center md:text-left lg:text-left">
          <li className="lg:hover:border-s pl-2 cursor-pointer">Vet</li>
          <li className="lg:hover:border-s pl-2 cursor-pointer">Shelter</li>
          <li className="lg:hover:border-s pl-2 cursor-pointer">Food</li>
          <li className="lg:hover:border-s pl-2 cursor-pointer">Adoption</li>
          <li className="lg:hover:border-s pl-2 cursor-pointer">Profile</li>
        </ul>
      </div>
    </>
  );
}
