import Link from "next/link";
import Image from "next/image";
import hnlLogo from "@/public/images/logo/complete.png";
import React from "react";

const CardHeader = ({ heading }: any) => {
  return (
    <>
      <Link href="/dashboard" className="inline-block">
        <div className=" h-10 w-32 2xl:w-36 2xl:h-14">
          <Image
            src={hnlLogo}
            alt="HNL Logo"
            className="object-contain text-primary"
          />
        </div>
      </Link>
      <h1 className="my-5 text-2xl tracking-wide font-semibold custom-gray font-poppins">
        {heading}
      </h1>
    </>
  );
};

export default CardHeader;
