import React, { useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";
import { DocumentData } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../reusable/Dialog";


interface Props {
  task: DocumentData[];

  Delete(taskToDelete: any): void;
}

export default function ProjectsData({ task, Delete }: Props) {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = useState<any[]>([]);

  console.log(details);

  const handleClose = () => {
    setOpen(false);
  };
  const openDialog = (i: any) => {
    setDetails(i);

    setOpen(true);
  };
  const [selectionModel, setSelectionModel] = React.useState<any[]>([]);
  const columns: GridColDef[] = [
    { field: "title", headerName: "Projects", width: 150, flex: 1 },
    { field: "deadline", headerName: "Due date", width: 150, flex: 1 },
    { field: "stat", headerName: "Status", width: 150, flex: 1 },
    {
      field: "delete",
      width: 75,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              const selectedIDs = selectionModel;
              Delete(selectedIDs);

              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
              // setRows((r:any) => r.filter((x:any) => !selectedIDs.has(x.id)));
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
   
      <div style={{ height: "89.9vh", width: "100%" }}>
        <DataGrid
          rows={task}
          columns={columns}
          sx={{ height: "571px" }}
          checkboxSelection
          disableSelectionOnClick
          //  experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => {
            setSelectionModel(ids);
          }}
          onRowClick={(i) => openDialog(i.row)}
        />
        <Dialog openit={open} handleClose={handleClose} details={details} />
      </div>
    </>
  );
}
