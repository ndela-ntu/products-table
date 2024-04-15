import React from "react";

type Props = {
  heading: string;
};

export default function PageHeader({ heading }: Props) {
  return <h2 className="text-xl">{heading}</h2>;
}
