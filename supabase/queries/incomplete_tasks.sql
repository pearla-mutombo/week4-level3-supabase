-- Which tasks are incomplete, listed from newest to oldest?
SELECT id, title, created_at
FROM public.tasks
WHERE completed = false
ORDER BY created_at DESC;
