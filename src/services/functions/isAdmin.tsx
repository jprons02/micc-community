export const isEmergencyAdmin = (user: any) => {
  return user.type === "admin" || user.type === "emergencyAdmin";
};

export const isTribalAdmin = (user: any) => {
  return user.type === "admin" || user.type === "tribalAdmin";
};

export const isSnackbarAdmin = (user: any) => {
  return user.type === "admin" || user.type === "snackbarAdmin";
};

export const isGeneralStoreAdmin = (user: any) => {
  return user.type === "admin" || user.type === "generalStoreAdmin";
};
