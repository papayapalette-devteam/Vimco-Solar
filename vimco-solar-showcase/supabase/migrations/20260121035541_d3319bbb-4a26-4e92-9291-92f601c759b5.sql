-- Add comprehensive RLS policies for user_roles table to prevent unauthorized manipulation

-- Policy for admins to view all roles (needed for admin functionality)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Prevent any direct INSERT on user_roles (roles are assigned by handle_new_user trigger only)
-- No INSERT policy = no one can directly insert roles

-- Prevent any direct UPDATE on user_roles
-- No UPDATE policy = no one can directly update roles

-- Prevent any direct DELETE on user_roles
-- No DELETE policy = no one can directly delete roles

-- Note: Roles are only assigned through the handle_new_user trigger function which runs with SECURITY DEFINER