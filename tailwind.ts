import { create } from "tailwind-rn";
import styles from "./styles.json";
import extraStyles from "./extra-styles.json";

const { tailwind, getColor } = create({
  ...styles,
  ...extraStyles,
});

export { tailwind, getColor };
