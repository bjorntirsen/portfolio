-- The read-only role the app connects as. On a real server, use a strong
-- password instead of this local-only one.
CREATE ROLE portfolio_app LOGIN PASSWORD 'portfolio_app';
REVOKE ALL ON DATABASE portfolio FROM PUBLIC;
GRANT CONNECT ON DATABASE portfolio TO portfolio_app;
GRANT USAGE ON SCHEMA public TO portfolio_app;
