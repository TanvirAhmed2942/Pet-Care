export default function Bio(props) {
  return (
    <div className="w-40 shadow-md p-4 rounded-md sm:w-52 lg:h-20">
      <h1 className="font-bold text-lg text-left lg:text-center">
        {props.name}
      </h1>
      {/* <h3 className="text-lg text-left lg:text-center">{props.bio}</h3> */}
      <p className="text-sm text-left lg:text-center">{props.bio}</p>
    </div>
  );
}
