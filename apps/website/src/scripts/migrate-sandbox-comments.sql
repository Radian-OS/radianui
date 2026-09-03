-- Sandbox Comments Table Schema
CREATE TABLE IF NOT EXISTS sandbox_comments (
    id TEXT PRIMARY KEY,
    component_id TEXT NOT NULL,
    element_tag TEXT NOT NULL,
    element_selector TEXT NOT NULL,
    position_x DOUBLE PRECISION NOT NULL,
    position_y DOUBLE PRECISION NOT NULL,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_sandbox_comments_component ON sandbox_comments(component_id);
