# Deployment Guide: Wanderlust

This guide walks you through deploying Wanderlust to **Render** using a free cloud database on **MongoDB Atlas**.

---

## 1. Set Up MongoDB Atlas (Cloud Database)

1. **Sign Up / Log In**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in.

2. **Create a Free Cluster**:
   - Choose the **M0 Free** shared tier.
   - Select your preferred cloud provider and closest region.
   - Click **Create Deployment**.

3. **Configure Database User**:
   - Under **Security** > **Database Access**, click **Add New Database User**.
   - Authentication Method: **Password**.
   - Enter a username (e.g., `wanderlust_user`) and a secure password. *(Save these credentials)*.
   - Built-in Role: **Read and write to any database**.
   - Click **Add User**.

4. **Configure Network Access (IP Whitelist)**:
   - Under **Security** > **Network Access**, click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`).
   - Click **Confirm**.

5. **Copy Connection String**:
   - In **Database** > **Deployments**, click **Connect**.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     ```text
     mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<CLUSTER_NAME>.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<DB_USERNAME>` and `<DB_PASSWORD>` with your database user credentials.
   - Append `/wanderlust` before the `?` query parameters:
     ```text
     mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<CLUSTER_NAME>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
     ```

---

## 2. Seed MongoDB Atlas (Optional)

To initialize sample listings in your Atlas database:

```bash
ATLASDB_URL="your_mongodb_atlas_connection_string" node init/index.js
```

> **Note**: To associate the seeded listings with a specific user account, create an account on your deployed app first, obtain your user ID from MongoDB, and run:
> ```bash
> ATLASDB_URL="..." SEED_OWNER_ID="your_user_id" node init/index.js
> ```

---

## 3. Deploy to Render

1. **Push Changes to GitHub**:
   - Ensure all changes are committed and pushed to your GitHub repository:
     ```bash
     git add .
     git commit -m "Prepare application for production deployment"
     git push origin main
     ```

2. **Create Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/) and sign in.
   - Click **New +** > **Web Service**.
   - Connect your GitHub repository (`MAJORPROJECT`).

3. **Configure Settings**:
   - **Name**: `wanderlust` (or your choice)
   - **Environment**: `Node`
   - **Region**: Choose the region closest to your Atlas cluster
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Instance Type**: `Free`

4. **Add Environment Variables**:
   Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `ATLASDB_URL`: `mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<CLUSTER_NAME>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority`
   - `SECRET`: A random 32+ character string (e.g. `c7a8b9f1d2e3456789abcdef01234567`)

5. **Deploy**:
   - Click **Deploy Web Service**.
   - Render will build and deploy your service, assigning it a URL like `https://wanderlust-xxxx.onrender.com`.

---

## 4. Verification Checklist

- [ ] Visit `https://your-app.onrender.com/` — it should automatically redirect to `/listings`.
- [ ] Sign up for a new account at `/signup`.
- [ ] Create a new listing at `/listings/new`.
- [ ] View the listing details and leave a star review.
- [ ] Log out and log back in to verify session persistence in MongoDB Atlas.

