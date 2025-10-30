import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, sortAlphabetically } from "../redux/action";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [page, setPage] = useState(1);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setCompanies(state.data);
  }, [state.data]);

  useEffect(() => {
    let data = [...companies];
    if (selectedName) {
      data = data.filter((x) => x.name == selectedName);
    }
    if (selectedLocation) {
      data = data.filter((x) => x.location == selectedLocation);
    }
    if (selectedIndustry) {
      data = data.filter((x) => x.industry == selectedIndustry);
    }
    if (state.sortAsc) {
      data = data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (state.sortDes) {
      data = data.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(data);
    setPage(1);
  }, [
    selectedName,
    selectedLocation,
    selectedIndustry,
    state.sortAsc,
    state.sortDes,
    companies,
  ]);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) {
      setPaginatedData([]);
      return;
    }
    const itemsPerPage = 8;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const sliced = filteredData.slice(start, end);
    setPaginatedData(sliced);
  }, [page, filteredData]);

  const renderSkeletonRows = () =>
    [...Array(10)].map((_, index) => (
      <TableRow key={index}>
        {[...Array(4)].map((__, i) => (
          <TableCell key={i}>
            <Skeleton
              variant="rectangular"
              height={40}
              animation="wave"
              sx={{
                width: "100%",
                borderRadius: 1,
              }}
            />
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "grey" }}>
          List of the Companies
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          my: 2,
          boxShadow:1,
          borderRadius:3,
          p:3

        }}
      >
        <Grid item size={{ xs: 12, md: 3 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={companies?.map((option) => option.name)}
            onInputChange={(event, newValue) => setSelectedName(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search By company name"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Autocomplete
            disablePortal
            options={[...new Set(companies?.map((x) => x.location))]}
            onInputChange={(event, newValue) => setSelectedLocation(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Filter By Location" />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Autocomplete
            disablePortal
            options={[...new Set(companies?.map((x) => x.industry))]}
            onInputChange={(event, newValue) => setSelectedIndustry(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Filter By industry" />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 2 }}>
          <Box
            display={"flex"}
            sx={{ gap: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{ color: "black", borderColor: "black" }}
              onClick={() => dispatch(sortAlphabetically("ASC"))}
              disabled={state.sortAsc}
            >
              Sort A-z
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ color: "black", borderColor: "black" }}
              onClick={() => dispatch(sortAlphabetically("DES"))}
              disabled={state.sortDes}
            >
              Sort Z-A
            </Button>
          </Box>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: state.error ? "60vh" : "100%",
        }}
      >
        {state.loading ? (
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Location
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Industry
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", display: { xs: "none", md: "table-cell" } }}>
                  Number of Employees
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderSkeletonRows()}</TableBody>
          </Table>
        ) : state.error ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="error" align="center" fontWeight={'bold'}>
              ⚠️ Failed to load company data. Please try again later.
            </Typography>
          </Box>
        ) : (
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Location
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Industry
                </TableCell>
                <TableCell align="center"  sx={{fontWeight:'bold', display: { xs: "none", md: "table-cell" } }}>
                  Number of Employees
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.location}</TableCell>
                    <TableCell align="center">{row.industry}</TableCell>
                    <TableCell align="center"  sx={{ display: { xs: "none", md: "table-cell" } }}>{row.employees}</TableCell> 
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No items found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {filteredData.length > 8 && (
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            m: 3,
          }}
        >
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page == 1}
            variant="contained"
            sx={{ color: "white", backgroundColor: "black" }}
          >
            Prev
          </Button>
          <Grid item sx={{ display: { md: "block", xs: "none" } }}>
            {[...Array(Math.ceil(filteredData.length / 8))].map((_, i) => (
              <Button
                sx={{
                  color: page == i + 1 ? "white" : "black",
                  backgroundColor: page == i + 1 ? "black" : "white",
                }}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </Grid>
          <Grid item sx={{ display: { md: "none", xs: "block" } }}>
            <Button
              sx={{
                color: "black",          
              }}
            >
              {page}
            </Button>
          </Grid>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page == Math.ceil(filteredData.length / 8)}
            variant="contained"
            sx={{ color: "white", backgroundColor: "black" }}
          >
            Next
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Companies;
