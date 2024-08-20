import React, { useContext, useState, useEffect } from "react";
import { useSnackbar } from "../../lib/notistack";

//keys
import { keys } from "../../data/keys";

// functions
import { deleteAttributeFromRecord } from "../../services/functions/deleteAttributeFromRecord";

// material-ui
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// custom components
import HorizontalRule from "../dividers/HorizontalRule";

//api
import { getAllItemsAPI } from "../../services/APIs/getAllItemsAPI";

// context
import { WebTableDataContext } from "../../context/webTableContext";
import { SetWebTableDataContext } from "../../context/webTableContext";
import { UserContext } from "../../context/userContext";

const TribalNoticesList: React.FC = () => {
  const user = useContext(UserContext);
  const webTableData = useContext(WebTableDataContext);
  const setWebTableData = useContext(SetWebTableDataContext);

  const isAdmin = () => {
    if (user.type) {
      if (user.type === "admin") {
        return true;
      }
    }
    return false;
  };

  const tribalNotices = () => {
    return webTableData
      .filter(
        (item: any) => item.tribalNotice && item.tribalNotice.trim() !== ""
      )
      .sort(
        (a: any, b: any) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
  };

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  // Keep context up to date and rerenders when updated.
  const refreshWebTableDataContext = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setWebTableData(response);
  };

  const deleteNotice = async (id: string) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true, // Set loading state to true for the specific button being clicked
    }));

    const response = await deleteAttributeFromRecord(
      keys.webTableName,
      id,
      "tribalNotice"
    );

    if (response === "Item attribute deleted") {
      enqueueSnackbar("Notice successfully deleted.", {
        variant: "success",
      });
      await refreshWebTableDataContext();
    } else {
      enqueueSnackbar("Server error, please try again.", {
        variant: "error",
      });
    }

    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: false, // Set loading state back to false after the action is complete
    }));
  };

  //const sortedNotices = arrangeNoticesByDate();

  const getReadableDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    };

    const date: Date = new Date(dateString);
    const easternTimeString: string = date.toLocaleString("en-US", options);
    return easternTimeString;
  };

  const renderDeleteButton = (id: string) => {
    // if user is admin, show delete button
    if (!isAdmin()) return null;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => deleteNotice(id)}
          variant="contained"
          disabled={loadingStates[id]}
          sx={{ mt: 3, mb: 2, position: "relative" }} // Add position: relative to the button
        >
          <span style={loadingStates[id] ? { visibility: "hidden" } : {}}>
            Delete Notice
          </span>
          {loadingStates[id] && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                transform: "translate(-50%, -50%)", // Center the spinner
              }}
            />
          )}
        </Button>
      </div>
    );
  };

  const renderTribalNotices = () => {
    if (!tribalNotices() || tribalNotices().length === 0)
      return <p style={{ marginTop: "30px" }}>No tribal notices listed.</p>;
    return !tribalNotices()
      ? null
      : tribalNotices().map((notice: any, index: number) => {
          const dateTime = getReadableDate(notice.dateAdded);
          if (notice.tribalNotice === "" || notice.tribalNotice === null) {
            return null;
          } else {
            return (
              <div style={{ marginTop: "40px" }} key={notice.dateAdded}>
                <p>{notice.tribalNotice}</p>
                <p
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    marginBottom: "-6px",
                  }}
                >
                  {dateTime}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                  }}
                >
                  {notice.name}
                </p>
                {renderDeleteButton(notice.id)}
                {Array.isArray(tribalNotices()) &&
                  tribalNotices().length > 1 &&
                  index !== tribalNotices().length - 1 && <HorizontalRule />}
              </div>
            );
          }
        });
  };

  return <div style={{ paddingBottom: "40px" }}>{renderTribalNotices()}</div>;
};

export default TribalNoticesList;
