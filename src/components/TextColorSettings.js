import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ColorPicker from "./ColorPicker";
import { isValidHexColor, getBorderColor } from "../utils/colorUtils";

const TextColorSettings = ({
  colors,
  colorInputs,
  names,
  selectedIndex,
  onColorChange,
  onNameChange,
  onAdd,
  onRemove,
  onSelect,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid item>
          <Typography variant="h6">文字色</Typography>
        </Grid>
      </Grid>

      <Tabs
        value={selectedIndex}
        onChange={(_, newValue) => onSelect(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "action.hover",
            },
            "&.Mui-selected": {
              color: "primary.main",
              fontWeight: "bold",
            },
          },
        }}
      >
        {colors.map((color, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: selectedIndex === index ? "bold" : "normal",
                  }}
                >
                  {names[index]}
                </Typography>
                <Box
                  sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "4px",
                    backgroundColor: color,
                    border: `1px solid ${getBorderColor(color)}`,
                  }}
                />
              </Box>
            }
            sx={{
              color: color,
              "&.Mui-selected": {
                color: color,
                fontWeight: "bold",
              },
            }}
          />
        ))}
      </Tabs>

      {colors.map((color, index) => (
        <Box
          key={index}
          sx={{
            display: selectedIndex === index ? "block" : "none",
            mb: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ColorPicker
                color={color}
                onChange={(value) => onColorChange(index, value)}
                size={50}
              />
            </Grid>
            <Grid item>
              <TextField
                value={colorInputs[index]}
                onChange={(e) => onColorChange(index, e.target.value)}
                size="small"
                sx={{ width: "120px" }}
                error={!isValidHexColor(colorInputs[index])}
                helperText={
                  !isValidHexColor(colorInputs[index])
                    ? "有効な16進数カラーコードを入力してください"
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <TextField
                value={names[index]}
                onChange={(e) => onNameChange(index, e.target.value)}
                size="small"
                placeholder="色の名前"
                sx={{ width: "150px" }}
              />
            </Grid>
            <Grid item>
              <IconButton
                color="error"
                onClick={() => onRemove(index)}
                disabled={colors.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{ mt: 2 }}
      >
        文字色を追加
      </Button>
    </Box>
  );
};

export default TextColorSettings;
