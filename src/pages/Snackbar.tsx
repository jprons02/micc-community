import React, { useContext, useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// context
import { WebTableDataContext } from "../context/webTableContext";

// Define the shape of menu items
interface MenuItem {
  name: string;
  price: string;
}

// Styled component for the container
const ItemContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 0",
  borderBottom: "1px solid #ccc",
});

// Function to render a menu section
const renderMenuSection = (title: string, items: MenuItem[]) => (
  <div style={{ marginTop: "50px" }}>
    <Typography
      variant="h4"
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>
    {items.map((item, index) => (
      <ItemContainer key={index}>
        <Typography variant="body1">{item.name}</Typography>
        <Typography
          variant="body1"
          color="green"
          style={{ paddingLeft: "15px" }}
        >
          {item.price}
        </Typography>
      </ItemContainer>
    ))}
  </div>
);

// SnackBar component
const SnackBar: React.FC = () => {
  const webTableData = useContext(WebTableDataContext);
  const snackbarInfo = () => {
    return (
      webTableData.find((record: any) => record.id === "snackbar") ||
      "Loading..."
    );
  };

  // Define menu items
  const specialMenuItems: MenuItem[] = [
    {
      name: snackbarInfo().snackbarSpecial,
      price: `$${snackbarInfo().snackbarSpecialPrice}`,
    },
  ];
  const mainMenuItems: MenuItem[] = [
    { name: "Cheeseburger", price: "$5.99" },
    { name: "French Fries", price: "$2.99" },
    { name: "Coke", price: "$1.99" },
  ];
  const snackMenuItems: MenuItem[] = [
    { name: "Chips", price: "$1.99" },
    { name: "Candy Bar", price: "$1.99" },
    { name: "Popcorn", price: "$1.99" },
  ];
  const drinkMenuItems: MenuItem[] = [
    { name: "Coke", price: "$1.99" },
    { name: "Sprite", price: "$1.99" },
    { name: "Dr. Pepper", price: "$1.99" },
  ];

  const closedSnackBar = () => {
    return (
      <Typography
        variant="h3"
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "red",
          textAlign: "center",
        }}
      >
        CLOSED
      </Typography>
    );
  };

  const openSnackBar = () => {
    return (
      <Typography
        variant="h3"
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "green",
          textAlign: "center",
        }}
      >
        OPEN
      </Typography>
    );
  };

  return (
    <Container>
      <div>THIS IS NOT LIVE - PRICES/ITEMS ARE NOT REAL</div>
      <div style={{ marginTop: "20px", marginBottom: "65px" }}>
        {snackbarInfo().snackbarStatus === "open"
          ? openSnackBar()
          : closedSnackBar()}
      </div>
      <div style={{ marginTop: "20px", marginBottom: "65px" }}>
        {/* Section for a call here to order paragraph */}
        <Typography
          variant="h4"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Recreation Snack Bar
        </Typography>
        <p>Dial ext. #5234 to order</p>
      </div>
      {renderMenuSection("Daily Special", specialMenuItems)}
      {renderMenuSection("Main", mainMenuItems)}
      {renderMenuSection("Snacks", snackMenuItems)}
      {renderMenuSection("Drinks", drinkMenuItems)}
    </Container>
  );
};

export default SnackBar;
