"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ImageUploader({ 
  value, 
  onChange,
  folder = "general"
}: { 
  value: string; 
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      onChange(publicUrlData.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Make sure the 'uploads' bucket exists and has public policies.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative aspect-video rounded-sm overflow-hidden border border-border group bg-surface-soft">
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-destructive text-destructive-foreground p-2 rounded-sm hover:bg-destructive/90 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-sm hover:border-foreground/50 hover:bg-surface-soft transition-colors cursor-pointer bg-background">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-muted-foreground animate-spin mb-3" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground mb-3" />
            )}
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Click to upload</span>
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload} 
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
