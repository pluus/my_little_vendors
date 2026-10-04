update public.categories set sort_order = 9 where name = '기타';

insert into public.categories (name, sort_order) values ('사진 & 영상', 8)
on conflict (name) do nothing;
