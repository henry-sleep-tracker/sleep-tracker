import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import GridToolbarFilters from "./GridToolbarFilters";

export default function CustomToolbar({ filters, setFilters }) {
return (
  <GridToolbarContainer sx={{ mr: 2 }}>
    <GridToolbarColumnsButton />
    <GridToolbarFilters filters={filters} setFilters={setFilters} />
  </GridToolbarContainer>
);
}