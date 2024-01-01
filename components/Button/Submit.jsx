export default function Submit(props) {
  return (
    <>
      <button
        type="submit"
        className=" py-1.5 px-3 rounded-md text-center text-slate-200 bg-slate-700  shadow-md "
      >
        {props.purpose}
      </button>
    </>
  );
}
