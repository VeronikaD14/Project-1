Navigate to the root directory of your project in your terminal.
Create a new file called .env.development 
Inside the .env.development file, add the following environment variable:

PGDATABASE=<your development database name>

Create a new file called .env.test using your preferred text editor.
Inside the .env.test file, add the following environment variable:

PGDATABASE=<your test database name>

Double check that both .env.development and .env.test files are added to your .gitignore file to prevent them from being pushed to a remote repository.

Verify that the database names in the .env files match the names in the /db/setup.sql file.

Save both .env.development and .env.test files.

