import { ActionIcon, Popover, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GrDocumentCsv } from "react-icons/gr";

const JsonCsvConverter = ({ jsonData }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const jsonToCsv = (jsonObject) => {
    const customTitles = ["Vacation Details", "Category", "Description"];
    let csvContent = "";

    const titleRow = customTitles.map((title) => `"${title}"`).join(",");
    csvContent += `${titleRow}\n`; // Add a blank line after the title row

    const processObject = (obj, path = []) => {
      if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach((key) => {
          const newPath = [...path, key];
          const value = obj[key];

          if (typeof value === "object" && value !== null) {
            // Recursively process nested objects
            processObject(value, newPath);
          } else {
            // Convert value to string and handle special characters
            let cell =
              value != null ? value.toString().replace(/"/g, '""') : "";
            if (cell !== "" || cell !== "N/A") {
              // Build CSV row with structured columns
              const header = newPath.join(" ").replace(/_/g, " ");
              csvContent += `${""}"${header}","${key}","${cell}"\n`;
            }
          }
        });
      }
    };

    // Process each key in the top-level JSON object
    Object.keys(jsonObject).forEach((key) => {
      const element = jsonObject[key];

      // Process each element (object) under the key
      if (element && typeof element === "object") {
        processObject(element, [key]);
        csvContent += "\n";
      }
    });

    return csvContent;
  };

  const downloadCsvFile = () => {
    const csvContent = jsonToCsv(jsonData);
    // Create a Blob object from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Use file-saver library to save the Blob as a CSV file
    if (navigator.msSaveBlob) {
      // For IE and Edge browsers
      navigator.msSaveBlob(blob, `${jsonData.overview.title}.csv`);
    } else {
      // For other browsers
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `${jsonData.overview.title} vacation.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error("CSV file download is not supported in this browser.");
      }
    }
  };
  return (
    <div>
      <Popover
        classNames={{ dropdown: "popover" }}
        width={100}
        position="top"
        withArrow
        radius={20}
        opened={opened}
      >
        <Popover.Target>
          <ActionIcon
            className="action-btn"
            size="xl"
            c={"black"}
            bg={"#fef6ec"}
            onClick={downloadCsvFile}
            onMouseEnter={open}
            onMouseLeave={close}
          >
            <GrDocumentCsv size={20} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: "none" }}>
          <Text size="md">Download the trip as CSV file</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default JsonCsvConverter;
