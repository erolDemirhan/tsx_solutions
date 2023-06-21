import { Button, ExcelColorIcon, Flex} from "@fluentui/react-northstar";
import * as XLSX from "xlsx";

export default function ExportReport(): JSX.Element {


    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData: any, fileName: any) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    
        const data = new Blob([excelBuffer], { type: fileType });
        const url = window.URL.createObjectURL(data);
    
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = fileName + fileExtension;
        downloadLink.style.display = "none";
    
        document.body.appendChild(downloadLink);
        downloadLink.click();
    
        // Remove the link after downloading
        document.body.removeChild(downloadLink);
    };	

	function exportExcel() {
        exportToCSV(quizResults, "learning-report");
    }

    return (
        <>
            <div>
                    <Flex style={{ justifyContent : 'end', marginBottom : '1rem' }}> 
                        <Button icon={<ExcelColorIcon />} onClick={exportExcel} content="Export Excel"/>
                    </Flex>
            </div>

        </>


    )	

}