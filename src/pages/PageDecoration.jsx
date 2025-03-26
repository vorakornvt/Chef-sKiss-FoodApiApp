import C1 from "../assets/1COOK.png";
import C2 from "../assets/2COOK.png";
import C3 from "../assets/3COOK.png";
import C4 from "../assets/4COOK.png";
import C5 from "../assets/5COOK.png";
import C6 from "../assets/6COOK.png";

export default function PageDecoration() {
  return (
    <div className="z-0">
      {/* Background decorations */}
      <img
        src={C1}
        className="absolute z-0 top-10 left-20 w-28 opacity-50"
        alt="Decoration"
      />
      <img
        src={C2}
        className="absolute z-0 top-10 right-30 w-30 opacity-50"
        alt="Decoration"
      />
      <img
        src={C3}
        className="absolute z-0  bottom-25 left-10 w-36 opacity-50"
        alt="Decoration"
      />
      <img
        src={C4}
        className="absolute z-0 bottom-40 right-20 w-44 opacity-50"
        alt="Decoration"
      />
      <img
        src={C5}
        className="absolute z-0 top-50 left-1/4 w-38 opacity-60"
        alt="Decoration"
      />
      <img
        src={C6}
        className="absolute z-0 bottom-2/4 right-40 w-52 opacity-50"
        alt="Decoration"
      />
    </div>
  );
}
