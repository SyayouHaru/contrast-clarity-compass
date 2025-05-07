import React from "react";
import { Box } from "@mui/material";
import { getBorderColor } from "../utils/colorUtils";

const ColorPicker = ({ color, onChange, size = 40 }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "4px",
        overflow: "hidden",
        border: `2px solid ${getBorderColor(color)}`,
        "&:hover": {
          border: `2px solid ${getBorderColor(color)}`,
          opacity: 0.8,
        },
      }}
    >
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "calc(100% + 4px)",
          height: "calc(100% + 4px)",
          padding: 0,
          border: "none",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default ColorPicker;
