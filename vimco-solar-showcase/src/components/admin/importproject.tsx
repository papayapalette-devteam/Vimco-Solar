import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ProjectFormData } from '@/types/project';
import { toast } from '@/hooks/use-toast';
import api from "@/./api"



const ImportProject: React.FC = () => {
  const [projects, setProjects] = useState<ProjectFormData[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;

      if (!result || typeof result === "string") return;

      const data = new Uint8Array(result); // ✅ Now Type Safe
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData: ProjectFormData[] =
        XLSX.utils.sheet_to_json<ProjectFormData>(worksheet);

      setProjects(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };


  

  const handleSubmit = async () => {
    if (projects.length === 0) {
        toast({
      title: "Invalid Files",
      description: "No data to upload",
      variant: "destructive",
    });
      return;
    }

    try {
      const res = await api.post(
        "api/project/bulk-upload-project",
        { projects }
      );

       toast({
      title: "Success",
      description: res.data.message || "Project Imported successfully",
    });
    } catch (error) {
      console.error(error);
      toast({
    title: "Error",
    description:
      error.response?.data?.message || "Something went wrong",
    variant: "destructive",
  });
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />

      {projects.length > 0 && (
        <div className="mt-3">
          <p>{projects.length} projects ready</p>
  <button
    onClick={handleSubmit}
    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition duration-200 shadow-md"
  >
    Upload Projects
  </button>
        </div>
      )}
    </div>
  );
};

export default ImportProject;
