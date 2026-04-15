# Ontologize.Aavya — Deployment Guide

**GitHub to GCP Cloud Run — Step-by-Step**

---

## Prerequisites

- Git installed
- A GitHub account
- A GCP account with a project
- Node.js 20+ (for local development)

---

## Part 1: Push to GitHub

### 1.1 Initialize Git Repository

```bash
cd ~/Desktop/ontologize-website
git init
```

### 1.2 Stage All Files

```bash
git add -A
```

### 1.3 Create Initial Commit

```bash
git commit -m "Initial commit: Ontologize.Aavya website with dark/light mode"
```

### 1.4 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ontologize-website`
3. Leave it empty (no README, no .gitignore)
4. Click **Create repository**

### 1.5 Add Remote and Push

```bash
git remote add origin https://github.com/<your-username>/ontologize-website.git
git branch -M main
git push -u origin main
```

You will be prompted for credentials. Use a [Personal Access Token](https://github.com/settings/tokens) with `repo` scope as the password.

---

## Part 2: Prepare for Cloud Run

### 2.1 Enable Standalone Output

Edit `next.config.mjs` and add `output: "standalone"`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};
export default nextConfig;
```

### 2.2 Create Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080

CMD ["node", "server.js"]
```

### 2.3 Create .dockerignore

Create a `.dockerignore` in the project root:

```
node_modules
.next
.git
.DS_Store
*.md
```

### 2.4 Commit and Push Changes

```bash
git add Dockerfile .dockerignore next.config.mjs
git commit -m "Add Dockerfile and standalone output for GCP Cloud Run deployment"
git push origin main
```

---

## Part 3: Install Google Cloud CLI

### 3.1 Download and Install (macOS ARM)

```bash
curl -sL https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-darwin-arm.tar.gz -o /tmp/gcloud.tar.gz
tar -xzf /tmp/gcloud.tar.gz -C ~/
~/google-cloud-sdk/install.sh --quiet --path-update true
```

### 3.2 Add to PATH

Add this line to your `~/.zshrc` (or `~/.bashrc`):

```bash
export PATH="$HOME/google-cloud-sdk/bin:$PATH"
```

Then reload:

```bash
source ~/.zshrc
```

### 3.3 Install Python 3.13 (if needed)

If gcloud crashes due to Python version, install a standalone Python:

```bash
curl -sL https://github.com/indygreg/python-build-standalone/releases/download/20250317/cpython-3.13.2+20250317-aarch64-apple-darwin-install_only.tar.gz -o /tmp/python313.tar.gz
mkdir -p ~/python313
tar -xzf /tmp/python313.tar.gz -C ~/python313 --strip-components=1
```

Then set it for gcloud:

```bash
export CLOUDSDK_PYTHON="$HOME/python313/bin/python3"
```

Add this line to `~/.zshrc` to persist it.

---

## Part 4: Authenticate with GCP

### 4.1 Login

```bash
gcloud auth login
```

This opens a browser window. Sign in with your Google account.

### 4.2 Set Project

```bash
gcloud config set project aavya-sandbox
```

Replace `aavya-sandbox` with your GCP project ID.

### 4.3 Verify

```bash
gcloud auth list
gcloud config get-value project
```

---

## Part 5: Deploy to Cloud Run

### 5.1 Deploy (Single Command)

```bash
cd ~/Desktop/ontologize-website

gcloud run deploy ontologize-website \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --quiet
```

This will:
1. Upload your source code
2. Build the Docker image using Cloud Build
3. Push the image to Artifact Registry
4. Deploy to Cloud Run
5. Output a service URL

### 5.2 If Cloud Build Permissions Fail

Grant the default compute service account the Cloud Build role:

```bash
gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder" \
  --quiet
```

Also grant storage access:

```bash
gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
  --role="roles/storage.objectViewer" \
  --quiet
```

Then retry the deploy command from Step 5.1.

---

## Part 6: Enable Public Access

### 6.1 Allow Public Invocations

```bash
gcloud run services add-iam-policy-binding ontologize-website \
  --region us-central1 \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --quiet
```

### 6.2 If Blocked by Org Policy (Domain Restricted Sharing)

If you get a `FAILED_PRECONDITION` error about permitted customers, the organization has a domain restriction policy (`iam.allowedPolicyMemberDomains`).

**Step A — Temporarily remove org-level restriction:**

```bash
cat > /tmp/org-policy-reset.yaml << 'EOF'
constraint: constraints/iam.allowedPolicyMemberDomains
restoreDefault: {}
EOF

gcloud resource-manager org-policies set-policy /tmp/org-policy-reset.yaml \
  --organization=<ORG_ID>
```

Find your org ID with:

```bash
gcloud organizations list
```

**Step B — Wait 30 seconds for propagation, then allow public access:**

```bash
sleep 30

gcloud run services add-iam-policy-binding ontologize-website \
  --region us-central1 \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --quiet
```

**Step C — Restore org-level restriction:**

```bash
cat > /tmp/org-policy-restore.yaml << 'EOF'
constraint: constraints/iam.allowedPolicyMemberDomains
listPolicy:
  allowedValues:
  - <YOUR_DIRECTORY_CUSTOMER_ID>
EOF

gcloud resource-manager org-policies set-policy /tmp/org-policy-restore.yaml \
  --organization=<ORG_ID>
```

Find your directory customer ID from:

```bash
gcloud organizations list
```

It is listed under `DIRECTORY_CUSTOMER_ID`.

**Step D — Set project-level exception so Cloud Run stays public:**

```bash
cat > /tmp/project-exception.yaml << 'EOF'
constraint: constraints/iam.allowedPolicyMemberDomains
listPolicy:
  allValues: ALLOW
EOF

gcloud resource-manager org-policies set-policy /tmp/project-exception.yaml \
  --project=<PROJECT_ID>
```

### 6.3 Verify Public Access

```bash
curl -s -o /dev/null -w "%{http_code}" https://<SERVICE_URL>
```

Should return `200`.

---

## Part 7: Access via Authenticated Proxy (Alternative)

If public access is not possible, use the Cloud Run proxy:

```bash
gcloud run services proxy ontologize-website \
  --region us-central1 \
  --port 9000
```

Then open http://localhost:9000 in your browser.

---

## Summary

| Item | Value |
|------|-------|
| GitHub Repo | `https://github.com/<your-username>/ontologize-website` |
| GCP Project | `aavya-sandbox` |
| Cloud Run Service | `ontologize-website` |
| Region | `us-central1` |
| Service URL | `https://ontologize-website-<PROJECT_NUMBER>.us-central1.run.app` |
| Port | `8080` |
| Memory | `512Mi` |

---

## Redeployment

After making code changes, commit, push, and redeploy:

```bash
git add -A
git commit -m "Your change description"
git push origin main

gcloud run deploy ontologize-website \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --quiet
```
