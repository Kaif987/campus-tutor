import useAdditionalDataStore from "@/store/CourseDataStore";

async function getMenuItems(Course) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${Course}'+in+parents&key=${process.env.NEXT_PUBLIC_API_KEY}`,
      { cache: "no-store" }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getDemoData(Course) {
  const data = await getMenuItems(Course.Course.id);
  let files = data.files.filter((file) => file.mimeType !== "text/html");

  files.sort(
    (a, b) =>
      parseInt(a.name.split(".")[0], 10) - parseInt(b.name.split(".")[0], 10)
  );

  // Fetch additional data for each file
  let additionalDataArray = await Promise.all(
    files.map(async (file) => {
      return getMenuItems(file.id)
        .then((additionalData) => {
          // Filter out files with mimeType of "text/html"
          return additionalData.files.filter(
            (file) => file.mimeType !== "text/html"
          );
        })
        .catch((error) => {
          console.error(
            `Failed to fetch additional data for file ${file.id}: ${error}`
          );
          return []; // Return an empty array so that Promise.all() doesn't fail
        });
    })
  );

  // Create a third array that combines files and additionalDataArray
  let combinedArray = files.map((file, index) => {
    let subMenuItems = Array.isArray(additionalDataArray[index])
      ? additionalDataArray[index]
        .map((additionalData) => ({
          title: additionalData.name,
          id: additionalData.id, // Incl
        }))
        .sort((a, b) => a.title.localeCompare(b.title)) // Sort subMenuItems based on the title
      : [];

    return {
      title: file.name,
      subMenuItems,
    };
  });

  // Sort combinedArray based on the title of each item
  combinedArray.sort((a, b) => a.title.localeCompare(b.title));
  // Access additionalData from zustand store
  const additionalData = useAdditionalDataStore.getState().additionalData;

  // Set Zustand state to combinedArray
  useAdditionalDataStore.setState({ additionalData: combinedArray });

  console.log({ combinedArray })

  return combinedArray;
}

export const getAllVideos = async (Course) => {
  const data = await getMenuItems(Course.id);
  const folders = data.files.filter(file => file.mimeType != "text/html")

  let files = await Promise.all(
    folders.map(async (folder) => {
      return getMenuItems(folder.id)
        .then((additionalData) => {
          // Filter out files with mimeType of "text/html"
          return additionalData.files.filter(
            (file) => file.mimeType !== "text/html"
          );
        })
        .catch((error) => {
          console.error(
            `Failed to fetch additional data for file ${file.id}: ${error}`
          );
          return []; // Return an empty array so that Promise.all() doesn't fail
        });
    }))

  const videos = []

  files.forEach(outerArray => {
    outerArray.forEach(innerArray => {
      videos.push({
        videoId: innerArray.id,
        watched: false
      })
    })
  })

  return videos
}

export default getDemoData;
