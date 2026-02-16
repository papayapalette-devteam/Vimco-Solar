
-- Fix contact_submissions SELECT policy: change from RESTRICTIVE to PERMISSIVE for admin access
DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
