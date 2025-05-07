import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { WCAG_STANDARDS } from "../constants";
import {
  hexToRgb,
  calculateRelativeLuminance,
  calculateContrastRatio,
} from "../utils/colorUtils";

const cellBorder = { borderBottom: "1px solid rgba(224, 224, 224, 1)" };

const ContrastMatrix = ({ textColors, backgroundColors, colorNames }) => {
  const calculateContrast = (textColor, bgColor) => {
    const textRgb = hexToRgb(textColor);
    const bgRgb = hexToRgb(bgColor);
    if (!textRgb || !bgRgb) return null;

    const textLuminance = calculateRelativeLuminance(
      textRgb.r,
      textRgb.g,
      textRgb.b
    );
    const bgLuminance = calculateRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const ratio = calculateContrastRatio(textLuminance, bgLuminance);

    return {
      ratio: ratio.toFixed(2),
      passesAA: ratio >= WCAG_STANDARDS.AA,
      passesAAA: ratio >= WCAG_STANDARDS.AAA,
    };
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={cellBorder}>背景色</TableCell>
            {textColors.map((_, index) => (
              <TableCell key={index} align="center" sx={cellBorder}>
                {colorNames.text[index]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {backgroundColors.map((bgColor, bgIndex) => (
            <TableRow key={bgIndex}>
              <TableCell
                sx={{
                  backgroundColor: bgColor,
                  color: "inherit",
                  fontWeight: "bold",
                  ...cellBorder,
                }}
              >
                {colorNames.background[bgIndex]}
              </TableCell>
              {textColors.map((textColor, textIndex) => {
                const result = calculateContrast(textColor, bgColor);
                return (
                  <TableCell
                    key={textIndex}
                    align="center"
                    sx={{
                      backgroundColor: bgColor,
                      color: textColor,
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      ...cellBorder,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {result?.ratio}:1
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title={`WCAG AA (${WCAG_STANDARDS.AA}:1)`}>
                          {result?.passesAA ? (
                            <CheckCircleIcon color="success" fontSize="small" />
                          ) : (
                            <CancelIcon color="error" fontSize="small" />
                          )}
                        </Tooltip>
                        <Tooltip title={`WCAG AAA (${WCAG_STANDARDS.AAA}:1)`}>
                          {result?.passesAAA ? (
                            <CheckCircleIcon color="success" fontSize="small" />
                          ) : (
                            <CancelIcon color="error" fontSize="small" />
                          )}
                        </Tooltip>
                      </Box>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContrastMatrix;
