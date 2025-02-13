import React from "react";
import { TERipple } from "tw-elements-react";
import { Link } from "react-router-dom";

export default function ButtonWithRipple(): JSX.Element {
  return (
    <>
      <Link
        to="/login"
        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
        type="button"
        style={{
          background:
            "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
          color: "#ffffff",
        }}
      >
        Add Venue
      </Link>
    </>
  );
}
