-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create a custom enum type for IELTS modules
create type ielts_module as enum ('Listening', 'Reading', 'Writing', 'Speaking');

-- Create the IELTS scores table
create table public.ielts_scores (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    module ielts_module not null,
    task_title text not null,          -- e.g., "Cambridge 18 - Test 1", "Task 2: Technology Essay"
    band_score numeric(3,1),           -- e.g., 6.5, 7.0, 9.0 (nullable because some might only be raw scores initially)
    raw_score integer,                 -- e.g., 34 (out of 40 for listening/reading)
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    -- Optional fields for extra metrics
    duration_seconds integer,          -- Time taken to complete the task
    feedback text                      -- AI feedback or notes
);

-- Set up Row Level Security (RLS)
alter table public.ielts_scores enable row level security;

-- Create policies so users can only access their own data
create policy "Users can view their own scores" 
    on public.ielts_scores for select 
    using (auth.uid() = user_id);

create policy "Users can insert their own scores" 
    on public.ielts_scores for insert 
    with check (auth.uid() = user_id);

create policy "Users can update their own scores" 
    on public.ielts_scores for update 
    using (auth.uid() = user_id);

create policy "Users can delete their own scores" 
    on public.ielts_scores for delete 
    using (auth.uid() = user_id);

-- Create an index on user_id and completed_at for faster queries (like fetching progress history)
create index idx_ielts_scores_user_date on public.ielts_scores(user_id, completed_at desc);
create index idx_ielts_scores_module on public.ielts_scores(user_id, module);

-- Create writing_evaluations table
create table public.writing_evaluations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    question text not null,
    essay text not null,
    overall_score numeric(3,1),
    tr_score numeric(3,1),
    cc_score numeric(3,1),
    lr_score numeric(3,1),
    gra_score numeric(3,1),
    detailed_feedback text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for writing_evaluations
alter table public.writing_evaluations enable row level security;

-- Create policies for writing_evaluations
create policy "Users can insert their own writing evaluations"
    on public.writing_evaluations for insert
    with check (auth.uid() = user_id);

create policy "Users can view their own writing evaluations"
    on public.writing_evaluations for select
    using (auth.uid() = user_id);
