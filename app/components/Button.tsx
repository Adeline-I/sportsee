import type { ReactNode } from "react";
import { Link } from "react-router";

type ButtonProps = {
  children: ReactNode;
  to?: string;
  type?: "button" | "submit";
};

const buttonClass =
  "cursor-pointer rounded-[10px] bg-blue px-10 py-4 text-center text-body-lg text-gray-10 hover:bg-blue-70 focus-visible:bg-blue-70";

const Button = ({ children, to, type = "button" }: ButtonProps) =>
  to ? (
    <Link to={to} className={buttonClass}>
      {children}
    </Link>
  ) : (
    <button type={type} className={buttonClass}>
      {children}
    </button>
  );

export default Button;
