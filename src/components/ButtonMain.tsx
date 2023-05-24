import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AssessmentIcon from "@mui/icons-material/Assessment";

export type ButtonType = "gestion" | "new" | "reporte";

const ButtonMain: FC<{
  label: string;
  href: string;
  type: ButtonType;
}> = ({ type = "gestion", label, href }) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case "gestion":
        return <ContentPasteSearchIcon />;
      case "new":
        return <LibraryAddIcon />;
      case "reporte":
        return <AssessmentIcon />;
    }
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case "gestion":
        return "primary";
      case "new":
        return "success";
      case "reporte":
        return "secondary";
    }
  };

  return (
    <Link href={href}>
      <Button
        style={{
          padding: 64,
        }}
        variant="contained"
        color={getColorByType(type)}
        startIcon={getIconByType(type)}
      >
        {label}
      </Button>
    </Link>
  );
};

export default ButtonMain;
