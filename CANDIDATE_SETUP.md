# Interview Setup Instructions

We had some issues with npm install taking an excessive amount of time on some candidates machines, 
so to speed up the process please follow the following steps.

## Before the Interview

Run these commands to pre-install dependencies:

```bash
mkdir interview-project
cd interview-project
# Place the package.json and package-lock.json files here
npm ci
git init
```

This will take a few minutes. Leave the directory as-is until the interview.

## During the Interview

When given access to the repository (during the interview call), run:

```bash
git remote add origin git@github.com:eamon0989/interview-project.git
rm package.json package-lock.json
git pull origin main
```

