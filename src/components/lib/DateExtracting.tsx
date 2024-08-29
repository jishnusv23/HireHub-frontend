export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};
