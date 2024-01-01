export default function Button(props) {
  return (
    <div className="sm:ml-4 md:ml-11 lg:ml-4">
      <button className="px-2 py-1 my-1 ml-9 w-48 rounded-md text-center text-slate-200 bg-slate-700  shadow-md ">
        {props.purpose}
      </button>
    </div>
  );
}
