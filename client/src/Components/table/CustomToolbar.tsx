import { Box } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", flexWrap: "wrap", maxWidth: 380, p: 1 }}
    >
      <Box>
        <GridToolbarQuickFilter sx={{ color: "#0A2540" }} debounceMs={1000} />
      </Box>
      <Box>
        <GridToolbarColumnsButton sx={{ color: "#0A2540" }} />
        <GridToolbarFilterButton sx={{ color: "#0A2540" }} />
        <GridToolbarDensitySelector sx={{ color: "#0A2540" }} />
        <GridToolbarExport sx={{ color: "#0A2540" }} />
      </Box>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
