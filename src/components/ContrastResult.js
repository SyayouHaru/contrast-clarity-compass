import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { getBorderColor } from "../utils/colorUtils";
import { WCAG_STANDARDS } from "../constants";

const ContrastResult = ({
  backgroundColor,
  textColor,
  ratio,
  passesAA,
  passesAAA,
}) => {
  return (
    <>
      <Box
        sx={{
          p: 1,
          borderRadius: 1,
          mb: 1,
          backgroundColor: backgroundColor,
          color: textColor,
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          border: `2px solid ${getBorderColor(backgroundColor)}`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: `2px solid ${getBorderColor(textColor)}`,
            borderRadius: "4px",
            pointerEvents: "none",
          },
        }}
      >
        プレビューテキスト
      </Box>

      <Typography variant="body2" gutterBottom>
        コントラスト比: {ratio}:1
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Typography variant="body2" sx={{ mr: 1, fontSize: "0.875rem" }}>
          WCAG AA ({WCAG_STANDARDS.AA}:1):
        </Typography>
        {passesAA ? (
          <Tooltip title="基準を満たしています">
            <CheckCircleIcon color="success" fontSize="small" />
          </Tooltip>
        ) : (
          <Tooltip title="基準を満たしていません">
            <CancelIcon color="error" fontSize="small" />
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" sx={{ mr: 1, fontSize: "0.875rem" }}>
          WCAG AAA ({WCAG_STANDARDS.AAA}:1):
        </Typography>
        {passesAAA ? (
          <Tooltip title="基準を満たしています">
            <CheckCircleIcon color="success" fontSize="small" />
          </Tooltip>
        ) : (
          <Tooltip title="基準を満たしていません">
            <CancelIcon color="error" fontSize="small" />
          </Tooltip>
        )}
      </Box>
    </>
  );
};

export default ContrastResult;
