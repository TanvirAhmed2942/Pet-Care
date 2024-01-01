export default function Button(props) {
  return (
    <div className="flex flex-row my-4 mr-14">
      <button className="absolute top-0 px-3 py-1 rounded shadow bg-sky-500">
        {props.time}
      </button>
    </div>
  );
}
