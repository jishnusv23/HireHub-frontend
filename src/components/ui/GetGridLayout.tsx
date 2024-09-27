export const getGridLayout = (totalParticipants:any, isOpenTerminal:any) => {
    totalParticipants=totalParticipants+1
    console.log("🚀 ~ file: GetGridLayout.tsx:3 ~ getGridLayout ~ totalParticipants:", totalParticipants)
  if (isOpenTerminal) {
    return "grid-cols-1 sm:grid-cols-2";
  }
  switch (totalParticipants) {
    case 1:
      return "grid-cols-1 place-items-center";
    case 2:
      return "grid-cols-2";
    case 3:
    case 4:
      return "grid-cols-2 sm:grid-cols-2";
    default:
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  }
};
{/* <div
            className={`grid gap-4 h-full ${getGridLayout(
              length,
              isOpenTerminal
            )}`}
          ></div> */}