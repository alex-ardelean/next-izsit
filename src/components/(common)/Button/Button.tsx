"use client";
import React from "react";
import clsx from "clsx";

type ButtonType = "primary" | "secondary" | "link" | "custom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  typography?: React.ReactNode;
  onClick?: () => void;
  buttonType?: ButtonType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  typography,
  onClick,
  buttonType = "primary",
  className,
  ...props
}) => {
  const baseStyle =
    "flex items-center justify-center gap-2 rounded-sm px-6 py-2 text-white text-lg transition-all duration-300";

  const buttonStyles = {
    primary: "bg-primary hover:bg-emerald-600",
    secondary: "border border-primary hover:border-emerald-600",
    link: "bg-transparent text-emerald-500 hover:underline",
    custom: "border border-transparent [border-image:linear-gradient(to_bottom,#10B981,transparent)] ![border-image-slice:1]"
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyle, buttonStyles[buttonType], className)}
      {...props}
    >
      {typography}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
