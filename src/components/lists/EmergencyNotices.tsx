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

// context
import { WebTableDataContext } from "../../context/webTableContext";
import { SetWebTableDataContext } from "../../context/webTableContext";
import { UserContext } from "../../context/userContext";

// api
import { getAllItemsAPI } from "../../services/APIs/getAllItemsAPI";

const EmergencyNoticesList: React.FC = () => {
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

  const emergencyNotices = (): any => {
    return webTableData.filter(
      (item: any) =>
        item.emergencyNotice &&
        typeof item.emergencyNotice === "object" &&
        Object.keys(item.emergencyNotice).length > 0
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
      "emergencyNotice"
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

  const renderEmergencyNotices = () => {
    if (!emergencyNotices()) {
      return <p style={{ marginTop: "30px" }}>No emergencies listed.</p>;
    }
    return emergencyNotices().map((notice: any, index: number) => {
      const dateTime = getReadableDate(notice.dateAdded);
      const resourceLinksArray = () => {
        if (notice.emergencyNotice && notice.emergencyNotice.resourceLinks) {
          return notice.emergencyNotice.resourceLinks.map((link: string) => {
            return (
              <React.Fragment key={link}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
                <br />
              </React.Fragment>
            );
          });
        }
        return null;
      };
      const renderResourceLinks = () => {
        if (
          notice.emergencyNotice &&
          notice.emergencyNotice.resourceLinks[0] !== ""
        ) {
          return (
            <p style={{ fontSize: "14px", marginBottom: "30px" }}>
              {notice.emergencyNotice ? resourceLinksArray() : "Loading"}
            </p>
          );
        }
        return null;
      };

      return (
        <div style={{ marginTop: "40px" }} key={notice.id || "defaultKey"}>
          <p style={{ fontSize: "20px" }}>
            {notice.emergencyNotice
              ? notice.emergencyNotice.title
              : "Loading..."}
          </p>
          <p>
            {notice.emergencyNotice
              ? notice.emergencyNotice.details
              : "Loading"}
          </p>
          {renderResourceLinks()}
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
          {Array.isArray(emergencyNotices()) &&
            emergencyNotices().length > 1 &&
            index !== emergencyNotices().length - 1 && <HorizontalRule />}
        </div>
      );
    });
  };

  return (
    <div style={{ paddingBottom: "40px" }}>{renderEmergencyNotices()}</div>
  );
};

export default EmergencyNoticesList;
