import React from "react";

type Props = {
  heading: string;
};

export default function PageHeader({ heading }: Props) {
  return <h2>{heading}</h2>;
}
