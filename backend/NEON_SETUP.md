# Neon Database Setup Guide

This guide will help you set up your Neon PostgreSQL database for the SEPP E-commerce backend.

## What is Neon?

Neon is a serverless PostgreSQL platform that offers:
- Instant database provisioning
- Automatic scaling
- Branching for development
- Generous free tier
- Built-in connection pooling

## Step-by-Step Setup

### 1. Create a Neon Account

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up with GitHub, Google, or email
3. Verify your email if required

### 2. Create a New Project

1. After logging in, click **"Create Project"**
2. Give your project a name (e.g., "sepp-ecommerce")
3. Select a region closest to your location
4. Choose PostgreSQL version (14 or higher recommended)
5. Click **"Create Project"**

### 3. Get Your Connection Strings

After creating your project, you'll see the connection details page. You need **TWO** connection strings:

#### Option 1: From the Dashboard

1. On the project dashboard, find the **"Connection Details"** section
2. You'll see a dropdown that says **"Pooled connection"**
3. Copy the connection string - this is your `DATABASE_URL`
4. Change the dropdown to **"Direct connection"**
5. Copy this connection string - this is your `DIRECT_URL`

#### Option 2: From Connection String Builder

1. Click on **"Connection Details"** or **"Settings"**
2. Look for **"Connection string"** section
3. Toggle between **"Pooled"** and **"Direct"** modes
4. Copy both strings

### 4. Understanding Connection Strings

Your connection strings will look like this:

**Pooled Connection (DATABASE_URL):**
```
postgresql://username:password@ep-xyz-123456.region.aws.neon.tech/neondb?sslmode=require
```

**Direct Connection (DIRECT_URL):**
```
postgresql://username:password@ep-xyz-123456.region.aws.neon.tech/neondb?sslmode=require
```

The difference:
- **Pooled**: Uses connection pooling for better performance in production
- **Direct**: Direct database connection, required for Prisma migrations

### 5. Update Your .env File

Open `backend/.env` and replace the placeholder values:

```env
# Replace these with your actual Neon connection strings
DATABASE_URL=postgresql://your_actual_pooled_connection_string
DIRECT_URL=postgresql://your_actual_direct_connection_string
```

**Important:** Keep these connection strings secret! Never commit them to Git.

### 6. Initialize Your Database

Once you've added your connection strings, run:

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:push
```

This will:
1. Install all dependencies including Prisma
2. Generate the Prisma Client
3. Push your schema to the Neon database

### 7. Verify Connection

Start your server:

```bash
npm run dev
```

You should see:
```
PostgreSQL Connected via Prisma (Neon)
Server is running on port 5000 in development mode
```

### 8. Explore Your Database (Optional)

Open Prisma Studio to view your database in a GUI:

```bash
npm run prisma:studio
```

This will open a browser window at `http://localhost:5555` where you can view and edit your data.

## Troubleshooting

### Connection Errors

**Error: `P1001: Can't reach database server`**
- Check that your connection strings are correct
- Ensure you have internet connection
- Verify your Neon project is active (not suspended)

**Error: `P1017: Server has closed the connection`**
- Use the pooled connection string for DATABASE_URL
- Check if your Neon project has reached its connection limit (upgrade plan if needed)

**Error: `Authentication failed`**
- Double-check your connection strings
- Make sure you copied the complete string including password
- Regenerate your password in Neon console if needed

### Schema Sync Issues

If your database schema doesn't match:

```bash
# Reset the database (WARNING: Deletes all data)
npm run prisma:push -- --force-reset

# Or create a migration
npm run prisma:migrate
```

## Neon Features to Explore

### Database Branching
Neon allows you to create branches of your database for development:
1. Go to your project in Neon Console
2. Click **"Branches"**
3. Create a new branch for testing
4. Get separate connection strings for each branch

### Monitoring
- View query performance in the Neon Console
- Check connection statistics
- Monitor database size

### Backups
Neon automatically backs up your data. You can restore to any point in time (based on your plan).

## Free Tier Limits

Neon's free tier includes:
- 10 GB storage
- 100 hours of compute per month
- Unlimited Postgres databases
- Community support

For production, consider upgrading to a paid plan for:
- Unlimited compute hours
- Better performance
- Priority support
- Advanced features

## Security Best Practices

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Rotate passwords regularly** - Can be done in Neon Console
3. **Use different databases** for development, staging, and production
4. **Enable IP allowlist** - If you need extra security (paid feature)
5. **Use connection pooling** - Always use DATABASE_URL for queries

## Need Help?

- [Neon Documentation](https://neon.tech/docs/introduction)
- [Neon Discord Community](https://discord.gg/neon)
- [Prisma with Neon Guide](https://neon.tech/docs/guides/prisma)

---

Happy coding! 🚀
