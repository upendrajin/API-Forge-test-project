import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Data() {
  const Token = localStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  const [updateId, setUpdateId] = React.useState(null);
  const [initialValues, setInitialValues] = React.useState([
    {
      movieName: "",
      posterURL: "",
      movieType: "",
      runningTime: "",
      availableOn: "",
    },
  ]);
  const history = useHistory();

  const getData = async () => {
    try {
      const res = await axios.get("https://api-forge-node.onrender.com/movie", {
        headers: { token: Token },
      });
      setRows(res.data.data);
    } catch (error) {
      history.push("/");
      alert(error.response.data.message);
    }
  };

  const addData = async (values, action) => {
    try {
      await axios.post(
        "https://api-forge-node.onrender.com/movie/create",
        values,
        { headers: { token: Token } }
      );
      action.resetForm();
      getData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        "https://api-forge-node.onrender.com/movie/delete/" + id
      );
      getData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const viewData = async (row) => {
    const copy = {
      movieName: row.movieName,
      posterURL: row.posterURL,
      movieType: row.movieType,
      runningTime: row.runningTime,
      availableOn: row.availableOn,
    };
    setInitialValues(copy);
    setUpdateId(row._id);
  };

  const updateData = async (values,action) => {
    try {
      await axios.put(
        'https://api-forge-node.onrender.com/movie/update/' + updateId,values
      );
      setInitialValues();
      action.resetForm();
      setUpdateId(null)
      getData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const seatchData = async (data) => {
    try {
      if(data == '')
      {
        getData()
      }
      else{
        let res = await axios.get(
            'https://api-forge-node.onrender.com/movie/find/' + data,{headers: {token: Token}}
          );
          setRows(res.data.data)
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: ('#000000de'),
    '&:hover': {
      backgroundColor: (theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  React.useEffect(() => {
    getData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <Box sx={{ padding: "48px" }}>
      <Box sx={{ marginBottom: "50px" }}>
        <Box>
          <Formik
            initialValues={{
              movieName: "",
              posterURL: "",
              movieType: "",
              runningTime: "",
              availableOn: "",
              ...initialValues,
            }}
            enableReinitialize={true}
            onSubmit={async (values, action) => {
              if(updateId == null) {
                addData(values, action);
              } 
              else {
                updateData(values, action);
              }
            }}
          >
            <Form>
              <Field name="movieName">
                {({ field }) => (
                  <TextField
                    sx={{ margin: "0px 15px 0px 0px" }}
                    {...field}
                    helperText=" "
                    label="Movie Name"
                  />
                )}
              </Field>
              <Field name="posterURL">
                {({ field }) => (
                  <TextField
                    sx={{ margin: "0px 15px 0px 0px" }}
                    {...field}
                    helperText=" "
                    label="Poster URL"
                  />
                )}
              </Field>
              <Field name="movieType">
                {({ field }) => (
                  <TextField
                    sx={{ margin: "0px 15px 0px 0px" }}
                    {...field}
                    helperText=" "
                    label="Movie Type"
                  />
                )}
              </Field>
              <Field name="runningTime">
                {({ field }) => (
                  <TextField
                    sx={{ margin: "0px 15px 0px 0px" }}
                    {...field}
                    helperText=" "
                    label="Running Time"
                    type="number"
                  />
                )}
              </Field>
              <Field name="availableOn">
                {({ field }) => (
                  <TextField
                    sx={{ margin: "0px 15px 0px 0px" }}
                    {...field}
                    helperText=" "
                    label="AvailableOn"
                  />
                )}
              </Field>
              <br />
              <Button
                sx={{ margin: "0px 15px 0px 0px" }}
                variant="outlined"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>

      <ListItem sx={{justifyContent: "end"}}>
              <Search>
                <SearchIconWrapper sx={{ color: "white" }}>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  sx={{
                    color: "white",
                    fontWeight: "100",
                    position: "relative",
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        seatchData(event.target.value)
                    }
                  }}
                />
              </Search>
        </ListItem>

      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Movie Name</StyledTableCell>
              <StyledTableCell>Poster URL</StyledTableCell>
              <StyledTableCell>Movie Type</StyledTableCell>
              <StyledTableCell>Running Time</StyledTableCell>
              <StyledTableCell>AvailableOn</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.movieName}
                </StyledTableCell>
                <StyledTableCell>{row.posterURL}</StyledTableCell>
                <StyledTableCell>{row.movieType}</StyledTableCell>
                <StyledTableCell>{row.runningTime}</StyledTableCell>
                <StyledTableCell>{row.availableOn}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => deleteData(row._id)}>Delete</Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => viewData(row)}>Update</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
