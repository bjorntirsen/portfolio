-- Schema for the portfolio database on Coolify. Apply as the owner role
-- (`portfolio`) to an empty database:
--
--   psql -v ON_ERROR_STOP=1 -f db/schema.sql
--
-- The app connects as `portfolio_app`, which can only read. Create that role
-- first (see README), since the grants at the bottom need it.

CREATE TABLE projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    subtitle text,
    description text,
    slug text NOT NULL UNIQUE,
    lessons_learned text,
    created_at timestamptz DEFAULT now(),
    featured boolean DEFAULT false,
    live_url text,
    repo text
);

CREATE TABLE images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    image_url text NOT NULL,
    alt text,
    width integer,
    height integer,
    type text NOT NULL DEFAULT 'regular' CHECK (type IN ('cover', 'regular')),
    created_at timestamptz DEFAULT now()
);

CREATE INDEX images_project_id_idx ON images (project_id);

GRANT SELECT ON projects, images TO portfolio_app;
