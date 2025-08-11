-- Create storage bucket for author images
INSERT INTO storage.buckets (id, name, public) VALUES ('author-images', 'author-images', true);

-- Create policies for author images
CREATE POLICY "Author images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'author-images');

CREATE POLICY "Admin can upload author images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'author-images');

CREATE POLICY "Admin can update author images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'author-images');

CREATE POLICY "Admin can delete author images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'author-images');