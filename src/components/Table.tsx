"use client";

import { FC } from "react";
import {
  GridColumnHeaderParams,
  type GridColDef,
  DataGrid
} from "@mui/x-data-grid";
import { ApiRequest } from "@prisma/client";
import { useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material";

const columnsDraft: GridColDef[] = [
  {
    field: "col1",
    headerName: "API key used",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    }
  },
  {
    field: "col2",
    headerName: "Path",
    width: 250
  },
  {
    field: "col3",
    headerName: "Recency",
    width: 250
  },
  {
    field: "col4",
    headerName: "Duration",
    width: 250
  },
  {
    field: "col5",
    headerName: "Status",
    width: 250
  }
];

const columns = columnsDraft.map(col => {
  if (col.field === "col1") {
    return col;
  } else {
    return {
      ...col,
      renderHeader(params: GridColumnHeaderParams<any, any, any>) {
        return (
          <strong className="font-semibold">{params.colDef.headerName}</strong>
        );
      }
    };
  }
});

type ModifietRequestType<T extends keyof ApiRequest> = Omit<ApiRequest, T> & {
  timestamp: string;
};

interface ITableProps {
  userRequests: ModifietRequestType<"timestamp">[];
}

const Table: FC<ITableProps> = ({ userRequests }) => {
  const { theme: appTheme } = useTheme();
  const theme = createTheme({
    palette: {
      mode: appTheme === "light" ? "light" : "dark"
    }
  });
  const rows = userRequests.map(req => ({
    id: req.id,
    col1: req.usedApiKey,
    col2: req.path,
    col3: `${req.timestamp} ago`,
    col4: `${req.duration} ms`,
    col5: req.status
  }));

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        style={{
          backgroundColor: appTheme === "light" ? "white" : "#152238",
          fontSize: "1rem"
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick={true}
        autoHeight={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        columns={columns}
        rows={rows}
      ></DataGrid>
    </ThemeProvider>
  );
};

export default Table;
