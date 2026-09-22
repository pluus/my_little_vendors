-- The in-app application review flow was never used (submissions actually
-- come in through a Google Form), so drop the unused table.
drop table if exists public.vendor_applications;
