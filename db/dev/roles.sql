-- The read-only role the app connects as. The local database trusts all
-- connections; on a real server, add PASSWORD '<strong password>'.
CREATE ROLE portfolio_app LOGIN;
REVOKE ALL ON DATABASE portfolio FROM PUBLIC;
GRANT CONNECT ON DATABASE portfolio TO portfolio_app;
GRANT USAGE ON SCHEMA public TO portfolio_app;
