import { Button } from "@mui/material";
import Link from "next/link";
import { FC, ReactNode } from "react";

const ButtonMain: FC<{ icon: ReactNode; label: string; href: string }> = ({
  icon,
  label,
  href,
}) => {
  return (
    <Link href={href}>
      <Button
        style={{
          padding: 64,
        }}
        variant="contained"
        startIcon={icon}
      >
        {label}
      </Button>
    </Link>
  );
};

export default ButtonMain;
