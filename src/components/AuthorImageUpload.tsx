import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface AuthorImageUploadProps {
  onImageUploaded?: (url: string) => void;
}

const AuthorImageUpload = ({ onImageUploaded }: AuthorImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('يجب اختيار صورة');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `author-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('author-images')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('author-images')
        .getPublicUrl(data.path);

      onImageUploaded?.(urlData.publicUrl);

      toast({
        title: "تم رفع الصورة بنجاح",
        description: "تم حفظ صورة الكاتب في Supabase",
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "خطأ في رفع الصورة",
        description: "حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <ImageIcon className="w-12 h-12 text-accent mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          رفع صورة الكاتب
        </h3>
        <p className="text-muted-foreground text-sm">
          اختر صورة جديدة لتحديث صورة الكاتب
        </p>
      </div>

      <Button
        variant="outline"
        disabled={uploading}
        className="relative overflow-hidden"
      >
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? "جاري الرفع..." : "اختيار صورة"}
      </Button>
    </motion.div>
  );
};

export default AuthorImageUpload;