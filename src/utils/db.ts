import postgres from "postgres"

let sql: postgres.Sql | undefined

// Created on first use rather than at import, so the build, tests and CI can
// load this module without a DATABASE_URL.
export function getSql() {
  if (!sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error("DATABASE_URL is not set")
    sql = postgres(url, { max: 5, idle_timeout: 60 })
  }
  return sql
}
