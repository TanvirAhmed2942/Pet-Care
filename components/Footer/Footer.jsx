import Contact from "./Contact";
import Menu from "./Menu";
import Social from "./Social";

export default function Footer() {
  return (
    <div>
      <div className="flex-col items-start justify-evenly mt-0 pt-10 pb-2 text-white sm:flex-row md:flex lg:flex bg-slate-800">
        <Menu />
        <Contact />
        <Social />
      </div>
      <p className="text-center text-sm text-white bg-slate-800">
        All rights reseved.2023.Tanvir Ahmed Shapnil(193-35-2942)
      </p>
    </div>
  );
}
