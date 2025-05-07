import React from "react";
import {
  Card,
  CardContent,
  Box,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ColorPicker from "./ColorPicker";
import ContrastResult from "./ContrastResult";
import { isValidHexColor } from "../utils/colorUtils";

const BackgroundColorCard = ({
  color,
  colorInput,
  name,
  onColorChange,
  onNameChange,
  onRemove,
  textColor,
  contrastResult,
  canRemove,
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TextField
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              size="small"
              placeholder="色の名前"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  fontSize: "1.1rem",
                  fontWeight: "medium",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid",
                  borderColor: "divider",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid",
                  borderColor: "primary.main",
                },
              }}
            />
            <IconButton
              color="error"
              onClick={onRemove}
              disabled={!canRemove}
              size="small"
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ColorPicker color={color} onChange={onColorChange} />
            </Grid>
            <Grid item xs>
              <TextField
                value={colorInput}
                onChange={(e) => onColorChange(e.target.value)}
                size="small"
                sx={{ width: "100px" }}
                error={!isValidHexColor(colorInput)}
                helperText={
                  !isValidHexColor(colorInput)
                    ? "有効な16進数カラーコードを入力してください"
                    : ""
                }
              />
            </Grid>
          </Grid>
        </Box>

        <ContrastResult
          backgroundColor={color}
          textColor={textColor}
          ratio={contrastResult?.ratio}
          passesAA={contrastResult?.passesAA}
          passesAAA={contrastResult?.passesAAA}
        />
      </CardContent>
    </Card>
  );
};

export default BackgroundColorCard;
