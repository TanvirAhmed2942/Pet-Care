export default function Badge(props) {
  return (
    <div className=" flex px-2 py-1 mt-6  text-white text-center cursor-pointer rounded-md bg-slate-900 ">
      {props.type}
    </div>
  );
}
