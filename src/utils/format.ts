export const formatLabel = (label: string) => {
  return label
    .split("")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLocaleLowerCase())
    .join("");
};

export const formatearLabel = (label: string) => {
  return label.replace(/\_|\-/g, " ").trim();
};
