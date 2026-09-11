-- Add user ownership to tasks
ALTER TABLE public.tasks
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Create an index for user-specific task queries
CREATE INDEX tasks_user_id_idx
ON public.tasks(user_id);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Allow users to view only their own tasks
CREATE POLICY "Users can view their own tasks"
ON public.tasks
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to create tasks only for themselves
CREATE POLICY "Users can create their own tasks"
ON public.tasks
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own tasks
CREATE POLICY "Users can update their own tasks"
ON public.tasks
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own tasks
CREATE POLICY "Users can delete their own tasks"
ON public.tasks
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
