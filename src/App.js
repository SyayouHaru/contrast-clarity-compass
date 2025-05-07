import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CssBaseline,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Save as SaveIcon,
  Upload as UploadIcon,
  Add as AddIcon,
  ViewModule as GridViewIcon,
  TableChart as TableViewIcon,
} from "@mui/icons-material";
import TextColorSettings from "./components/TextColorSettings";
import BackgroundColorCard from "./components/BackgroundColorCard";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import { STORAGE_KEYS, DEFAULT_VALUES } from "./constants";
import {
  isValidHexColor,
  hexToRgb,
  calculateRelativeLuminance,
  calculateContrastRatio,
} from "./utils/colorUtils";
import ContrastMatrix from "./components/ContrastMatrix";

function AppContent() {
  const [textColors, setTextColors] = useState([DEFAULT_VALUES.TEXT_COLOR]);
  const [backgroundColors, setBackgroundColors] = useState([
    DEFAULT_VALUES.BACKGROUND_COLOR,
  ]);
  const [textColorNames, setTextColorNames] = useState([
    DEFAULT_VALUES.TEXT_COLOR_NAME,
  ]);
  const [backgroundColorNames, setBackgroundColorNames] = useState([
    DEFAULT_VALUES.BACKGROUND_COLOR_NAME,
  ]);
  const [textColorInputs, setTextColorInputs] = useState([
    DEFAULT_VALUES.TEXT_COLOR,
  ]);
  const [backgroundColorInputs, setBackgroundColorInputs] = useState([
    DEFAULT_VALUES.BACKGROUND_COLOR,
  ]);
  const [selectedTextColorIndex, setSelectedTextColorIndex] = useState(0);
  const [contrastResults, setContrastResults] = useState([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [importError, setImportError] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "matrix"

  // 初期値の同期を確実に行う
  useEffect(() => {
    if (textColors.length !== textColorInputs.length) {
      setTextColorInputs(textColors);
    }
    if (backgroundColors.length !== backgroundColorInputs.length) {
      setBackgroundColorInputs(backgroundColors);
    }
  }, [
    textColors,
    backgroundColors,
    textColorInputs.length,
    backgroundColorInputs.length,
  ]);

  const calculateResults = useCallback(() => {
    const textColor = textColors[selectedTextColorIndex];
    const textRgb = hexToRgb(textColor);
    if (!textRgb) return;

    const newResults = backgroundColors
      .map((bgColor) => {
        const bgRgb = hexToRgb(bgColor);
        if (!bgRgb) return null;

        const bgLuminance = calculateRelativeLuminance(
          bgRgb.r,
          bgRgb.g,
          bgRgb.b
        );
        const textLuminance = calculateRelativeLuminance(
          textRgb.r,
          textRgb.g,
          textRgb.b
        );
        const ratio = calculateContrastRatio(textLuminance, bgLuminance);

        return {
          backgroundColor: bgColor,
          ratio: ratio.toFixed(2),
          passesAA: ratio >= 4.5,
          passesAAA: ratio >= 7,
        };
      })
      .filter((result) => result !== null);

    setContrastResults(newResults);
  }, [textColors, backgroundColors, selectedTextColorIndex]);

  // 色が変更されるたびにコントラストを計算
  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  // 色の設定をローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEXT_COLORS, JSON.stringify(textColors));
    localStorage.setItem(
      STORAGE_KEYS.BACKGROUND_COLORS,
      JSON.stringify(backgroundColors)
    );
    localStorage.setItem(
      STORAGE_KEYS.TEXT_COLOR_NAMES,
      JSON.stringify(textColorNames)
    );
    localStorage.setItem(
      STORAGE_KEYS.BACKGROUND_COLOR_NAMES,
      JSON.stringify(backgroundColorNames)
    );
  }, [textColors, backgroundColors, textColorNames, backgroundColorNames]);

  const updateTextColor = (index, value) => {
    setTextColorInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });

    if (isValidHexColor(value)) {
      const newColors = [...textColors];
      newColors[index] = value;
      setTextColors(newColors);
    }
  };

  const updateBackgroundColor = (index, value) => {
    setBackgroundColorInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });

    if (isValidHexColor(value)) {
      const newColors = [...backgroundColors];
      newColors[index] = value;
      setBackgroundColors(newColors);
    }
  };

  const updateTextColorName = (index, name) => {
    setTextColorNames((prev) => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  };

  const addTextColor = () => {
    const newColor = DEFAULT_VALUES.TEXT_COLOR;
    const newName = `文字色 ${textColors.length + 1}`;
    setTextColors((prev) => [...prev, newColor]);
    setTextColorInputs((prev) => [...prev, newColor]);
    setTextColorNames((prev) => [...prev, newName]);
    setSelectedTextColorIndex(textColors.length);
  };

  const removeTextColor = (index) => {
    setTextColors((prev) => prev.filter((_, i) => i !== index));
    setTextColorInputs((prev) => prev.filter((_, i) => i !== index));
    setTextColorNames((prev) => prev.filter((_, i) => i !== index));
    if (selectedTextColorIndex >= textColors.length - 1) {
      setSelectedTextColorIndex(textColors.length - 2);
    }
  };

  const addBackgroundColor = () => {
    const newColor = DEFAULT_VALUES.BACKGROUND_COLOR;
    const newName = `背景色 ${backgroundColors.length + 1}`;
    setBackgroundColors((prev) => [...prev, newColor]);
    setBackgroundColorInputs((prev) => [...prev, newColor]);
    setBackgroundColorNames((prev) => [...prev, newName]);
  };

  const removeBackgroundColor = (index) => {
    setBackgroundColors((prev) => prev.filter((_, i) => i !== index));
    setBackgroundColorInputs((prev) => prev.filter((_, i) => i !== index));
    setBackgroundColorNames((prev) => prev.filter((_, i) => i !== index));
  };

  // 設定をリセットする関数
  const resetSettings = () => {
    setTextColors([DEFAULT_VALUES.TEXT_COLOR]);
    setTextColorInputs([DEFAULT_VALUES.TEXT_COLOR]);
    setBackgroundColors([DEFAULT_VALUES.BACKGROUND_COLOR]);
    setBackgroundColorInputs([DEFAULT_VALUES.BACKGROUND_COLOR]);
    setTextColorNames([DEFAULT_VALUES.TEXT_COLOR_NAME]);
    setBackgroundColorNames([DEFAULT_VALUES.BACKGROUND_COLOR_NAME]);
    setSelectedTextColorIndex(0);
    localStorage.removeItem(STORAGE_KEYS.TEXT_COLORS);
    localStorage.removeItem(STORAGE_KEYS.BACKGROUND_COLORS);
    localStorage.removeItem(STORAGE_KEYS.TEXT_COLOR_NAMES);
    localStorage.removeItem(STORAGE_KEYS.BACKGROUND_COLOR_NAMES);
  };

  // 設定をエクスポートする関数
  const exportSettings = () => {
    const settings = {
      textColors,
      backgroundColors,
      textColorNames,
      backgroundColorNames,
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contrast-checker-settings.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 設定をインポートする関数
  const importSettings = () => {
    try {
      const data = JSON.parse(importData);
      if (
        !data.textColors ||
        !data.backgroundColors ||
        !data.textColorNames ||
        !data.backgroundColorNames
      ) {
        throw new Error("無効なデータ形式です");
      }

      setTextColors(data.textColors);
      setBackgroundColors(data.backgroundColors);
      setTextColorNames(data.textColorNames);
      setBackgroundColorNames(data.backgroundColorNames);
      setTextColorInputs(data.textColors);
      setBackgroundColorInputs(data.backgroundColors);
      setImportDialogOpen(false);
      setImportData("");
      setImportError("");
    } catch (error) {
      setImportError(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="/logo.png"
              alt="Contrast Clarity Compass ロゴ"
              style={{ height: 48, width: 48, objectFit: "contain" }}
            />
            <Typography variant="h4" component="h1">
              Contrast Clarity Compass
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <ThemeToggle />
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="grid">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="matrix">
                <TableViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            onClick={resetSettings}
            startIcon={<SaveIcon />}
          >
            設定をリセット
          </Button>
          <Button
            variant="outlined"
            onClick={exportSettings}
            startIcon={<SaveIcon />}
          >
            設定をエクスポート
          </Button>
          <Button
            variant="outlined"
            onClick={() => setImportDialogOpen(true)}
            startIcon={<UploadIcon />}
          >
            設定をインポート
          </Button>
        </Box>
      </Box>

      <TextColorSettings
        colors={textColors}
        colorInputs={textColorInputs}
        names={textColorNames}
        selectedIndex={selectedTextColorIndex}
        onColorChange={updateTextColor}
        onNameChange={updateTextColorName}
        onAdd={addTextColor}
        onRemove={removeTextColor}
        onSelect={setSelectedTextColorIndex}
      />

      {viewMode === "grid" ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {backgroundColors.map((color, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BackgroundColorCard
                color={color}
                colorInput={backgroundColorInputs[index]}
                name={backgroundColorNames[index]}
                onColorChange={(newColor) =>
                  updateBackgroundColor(index, newColor)
                }
                onNameChange={(newName) => updateTextColorName(index, newName)}
                onRemove={() => removeBackgroundColor(index)}
                textColor={textColors[selectedTextColorIndex]}
                contrastResult={contrastResults[index]}
                canRemove={backgroundColors.length > 1}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="outlined"
              onClick={addBackgroundColor}
              startIcon={<AddIcon />}
              sx={{ height: "100%", minHeight: 200 }}
              fullWidth
            >
              背景色を追加
            </Button>
          </Grid>
        </Grid>
      ) : (
        <ContrastMatrix
          textColors={textColors}
          backgroundColors={backgroundColors}
          colorNames={{
            text: textColorNames,
            background: backgroundColorNames,
          }}
        />
      )}

      <Dialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>設定をインポート</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="JSONデータ"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            error={!!importError}
            helperText={importError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportDialogOpen(false)}>キャンセル</Button>
          <Button onClick={importSettings} variant="contained">
            インポート
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppContent />
      <Box sx={{ mt: 6, mb: 2, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          参考：
          <a
            href="https://oklch.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2196f3",
              textDecoration: "underline",
              marginLeft: 4,
            }}
          >
            OKLCH Color Picker & Converter
          </a>
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
