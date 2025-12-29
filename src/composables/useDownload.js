import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export function useDownload() {

    const single = async (file, fileName='download.pdf') => {
        const url = import.meta.env.VITE_BASE_RESOURCE_URL + file.file;
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, file.title || fileName);
    };


    const multiple = async (files, zipName='files.zip') => {
        const zip = new JSZip();

        for (const file of files) {
            const url = import.meta.env.VITE_BASE_RESOURCE_URL + file.file;
            const response = await axios.get(url, { responseType: 'blob' });
            zip.file(file.title || 'file.pdf', response.data);
        }

        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, zipName);
    };


    return { single, multiple };
}