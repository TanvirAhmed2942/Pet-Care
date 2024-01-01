export default function Utlity({ purpose, count }) {
  return (
    <div
      className={`h-10 shadow-md px-4 py-2 text-center rounded-md cursor-pointer  ${
        purpose == "Served" ? "bg-green-500" : "bg-sky-500"
      }`}
    >
      <h3>{purpose + " " + count + `${purpose != "Served" ? "$" : ""}`}</h3>
    </div>
  );
}
