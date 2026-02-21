# AWS Deployment Guide for Social Media Platform (Detailed)

This guide will walk you through deploying your full-stack social media app on a single AWS EC2 instance. Every step is explained in detail — follow it exactly.

> **Instance**: t3.small (2 vCPU, 2GB RAM) — good for testing with ~20 users.

---

## PHASE 1: Create Your EC2 Instance on AWS

### Step 1.1: Login to AWS

1. Go to **https://aws.amazon.com** in your browser.
2. Click **"Sign In to the Console"** (top-right).
3. Enter your AWS email and password.
4. You'll land on the **AWS Management Console** (home page).

### Step 1.2: Go to EC2

1. In the **search bar** at the top, type **EC2**.
2. Click on **"EC2"** from the dropdown results.
3. You're now on the **EC2 Dashboard**.

### Step 1.3: Launch a New Instance

1. Click the orange **"Launch Instance"** button.
2. You'll see the **"Launch an instance"** form. Fill it in:

#### Name
- Type: `SocialMedia-Server`

#### Application and OS Images (AMI)
- Click **"Ubuntu"** (it's in the quick start tabs).
- Make sure it says **"Ubuntu Server 24.04 LTS"** (or 22.04 is fine too).
- Architecture: **64-bit (x86)** (default).

#### Instance Type
- Click the dropdown and search for **t3.small**.
- Select **t3.small** — it shows `2 vCPU, 2 GiB Memory`.

#### Key Pair (Login)
- Click **"Create new key pair"**.
- **Key pair name**: `social-media-key`
- **Key pair type**: RSA (default).
- **Private key file format**: `.pem` (default).
- Click **"Create key pair"**.
- ⚠️ A file called `social-media-key.pem` will **download automatically**. **Keep this file safe** — you need it to SSH into your server. If you lose it, you cannot connect.

#### Network Settings
- Click **"Edit"** (top-right of the Network settings section).
- **Auto-assign public IP**: Make sure this is **Enable**.
- Under **Security group rules**, you'll see SSH already added. Add more:
  - Click **"Add security group rule"**:
    - **Type**: HTTP
    - **Source**: Anywhere (0.0.0.0/0)
  - Click **"Add security group rule"** again:
    - **Type**: Custom TCP
    - **Port range**: `3000`
    - **Source**: Anywhere (0.0.0.0/0)
    - *(This is for the frontend)*
  - Click **"Add security group rule"** again:
    - **Type**: Custom TCP
    - **Port range**: `8080`
    - **Source**: Anywhere (0.0.0.0/0)
    - *(This is for the API Gateway)*
  - (Optional) Click **"Add security group rule"** again:
    - **Type**: Custom TCP
    - **Port range**: `8761`
    - **Source**: Anywhere (0.0.0.0/0)
    - *(This is for Eureka Dashboard — useful for debugging)*

#### Configure Storage
- Change the storage from `8` to **`30`** GiB.
- Volume type: **gp3** (default).
- ⚠️ **Don't skip this!** Docker images and builds need at least 25-30GB.

### Step 1.4: Launch!

1. Review everything on the right-side summary panel.
2. Click the orange **"Launch instance"** button at the bottom.
3. You'll see a green success message: *"Successfully initiated launch of instance"*.
4. Click **"View all instances"** (or go to EC2 → Instances from the sidebar).
5. Wait for **Instance State** to show **"Running"** and **Status Check** to show **"2/2 checks passed"** (takes ~2 minutes).

### Step 1.5: Get Your Public IP

1. Click on your instance ID (the blue link like `i-0abc123...`).
2. In the **Details** tab, find **"Public IPv4 address"** — it will be something like `3.110.45.67`.
3. **Copy this IP** — you'll use it everywhere below. We'll refer to it as `YOUR_IP`.

---

## PHASE 2: Connect to Your EC2 Instance via SSH

### Step 2.1: Open Terminal on Your Mac

1. Open **Terminal** (press `Cmd + Space`, type "Terminal", press Enter).

### Step 2.2: Navigate to the Key File

Your downloaded key file is probably in `~/Downloads/`:

```bash
# Move the key to a safer location (optional but recommended)
mv ~/Downloads/social-media-key.pem ~/.ssh/social-media-key.pem
```

### Step 2.3: Set File Permissions

```bash
chmod 400 ~/.ssh/social-media-key.pem
```
> This makes the key file read-only. SSH requires this or it will refuse to use the key.

### Step 2.4: SSH into the Server

Replace `YOUR_IP` with the Public IPv4 address you copied in Step 1.5:

```bash
  ssh -i ~/.ssh/social-media-key.pem ubuntu@YOUR_IP
```

- If it asks **"Are you sure you want to continue connecting?"**, type `yes` and press Enter.
- You should see something like:
  ```
  Welcome to Ubuntu 24.04 LTS
  ubuntu@ip-172-31-xx-xx:~$
  ```
- ✅ **You're now inside your EC2 instance!** Every command from here runs on the AWS server, NOT your Mac.

---

## PHASE 3: Set Up the Server (Run Inside EC2)

⚠️ **All commands in Phase 3, 4, and 5 are run INSIDE the EC2 instance** (the SSH session from Step 2.4).

### Step 3.1: Add Swap Space (MANDATORY)

Your instance only has 2GB RAM. Without swap, services WILL crash.

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Make it permanent (survives reboot):
```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Verify it worked:
```bash
free -h
```
You should see:
```
              total        used        free
Mem:          1.9Gi       ...         ...
Swap:         4.0Gi       0B          4.0Gi    ← This line should show 4G
```

### Step 3.2: Install Docker

Run these commands **one block at a time** (copy-paste each block):

**Block 1 — Update system packages:**
```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
```

**Block 2 — Add Docker's GPG key:**
```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

**Block 3 — Add Docker repository:**
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**Block 4 — Install Docker Engine:**
```bash
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

**Block 5 — Allow running Docker without sudo:**
```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

**Verify Docker is installed:**
```bash
docker --version
```
You should see: `Docker version 27.x.x` (or similar).

```bash
docker compose version
```
You should see: `Docker Compose version v2.x.x`.

---

## PHASE 4: Get Your Code on the Server

### Step 4.1: Clone Your GitHub Repository

Replace the URL with your actual GitHub repo:

```bash
git clone https://github.com/VishalSharma00123/social-media-platform_fullstack.git social-media-app
```

If it asks for credentials, use your **Personal Access Token** (not password):
- Username: `VishalSharma00123`
- Password: paste your **GitHub token** (the `ghp_...` one)

### Step 4.2: Verify the Code is There

```bash
ls social-media-app/
```
You should see:
```
social-frontend  social-media-platform-server  AWS_DEPLOYMENT.md  ...
```

### Step 4.3: Navigate to the Server Directory

```bash
cd social-media-app/social-media-platform-server
```

Verify docker-compose.yml exists:
```bash
ls docker-compose.yml
```
You should see: `docker-compose.yml`

---

## PHASE 5: Start the Application

⚠️ **This is the most critical phase.** On t3.small, we start services in groups to avoid running out of memory during builds.

### Step 5.1: Build All Images First (One by One)

Building Java services requires a lot of memory (Maven downloads). Build **one at a time**:

```bash
# Build infrastructure-dependent services first
docker compose build eureka-server
```
> ⏰ This will take **3-5 minutes** the first time (downloading Maven, JDK images, dependencies).
> You'll see lots of output. Wait until you see `=> exporting to image` and it returns to the `$` prompt.

```bash
docker compose build api-gateway
```

```bash
docker compose build user-service
```

```bash
docker compose build post-service
```

```bash
docker compose build message-service
```

```bash
docker compose build notification-service
```

```bash
docker compose build admin-service
```

```bash
docker compose build social-frontend
```
> ⏰ The frontend build takes **3-5 minutes** (npm install + Next.js build).

### Step 5.2: Start Infrastructure Services

```bash
docker compose up -d mongodb redis zookeeper
```

Wait 20 seconds, then start Kafka (it needs Zookeeper):
```bash
docker compose up -d kafka
```

Check they're running:
```bash
docker compose ps
```
You should see all 4 showing `Up` or `running`:
```
NAME                        STATUS
social-media-mongodb        Up (healthy)
social-media-redis          Up (healthy)
social-media-zookeeper      Up
social-media-kafka          Up
```
> If any show `Restarting` or `Exit`, check logs: `docker compose logs mongodb` (replace with the service name).

### Step 5.3: Start Eureka Server

```bash
docker compose up -d eureka-server
```

Wait for it to become healthy (~40-60 seconds):
```bash
# Check every 10 seconds until it says "healthy"
watch -n 10 'docker compose ps eureka-server'
```
Press `Ctrl+C` to stop watching once it shows `Up (healthy)`.

### Step 5.4: Start All Microservices

```bash
docker compose up -d api-gateway user-service post-service message-service notification-service admin-service
```

Wait about **60-90 seconds** for all services to register with Eureka.

Check status:
```bash
docker compose ps
```
All services should show `Up`. If any show `Restarting`, check their logs:
```bash
docker compose logs --tail=50 api-gateway      # check api-gateway logs
docker compose logs --tail=50 user-service      # check user-service logs
```

### Step 5.5: Start the Frontend

```bash
docker compose up -d social-frontend
```

Wait ~20 seconds, then check:
```bash
docker compose ps social-frontend
```
Should show `Up`.

### Step 5.6: Verify Everything is Running

```bash
# See all containers
docker compose ps

# Check memory usage
free -h

# See per-container memory/CPU
docker stats --no-stream
```

Expected output of `docker compose ps` — all services showing `Up`:
```
NAME                          STATUS
social-media-mongodb          Up (healthy)
social-media-redis            Up (healthy)
social-media-zookeeper        Up
social-media-kafka            Up (healthy)
eureka-server                 Up (healthy)
api-gateway                   Up
user-service                  Up
post-service                  Up
message-service               Up
notification-service          Up
admin-service                 Up
social-frontend               Up
```

---

## PHASE 6: Access Your Application! 🎉

### Open in Browser

| What | URL |
|------|-----|
| 🌐 **Frontend** | `http://YOUR_IP:3000` |
| 🔌 **API Gateway** | `http://YOUR_IP:8080` |
| 📊 **Eureka Dashboard** | `http://YOUR_IP:8761` |

Replace `YOUR_IP` with your EC2 Public IPv4 address (from Step 1.5).

### What You Should See:
- **Port 3000**: Your social media app login/home page.
- **Port 8761**: Eureka showing all registered microservices (user-service, post-service, etc.).
- **Port 8080**: API Gateway — hitting `/api/...` endpoints should proxy to services.

---

## PHASE 7: Useful Commands (Keep This Handy)

### Check What's Running
```bash
docker compose ps
```

### View Logs (Live)
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f user-service
docker compose logs -f api-gateway
```

### Restart a Crashed Service
```bash
docker compose up -d user-service
```

### Restart Everything
```bash
docker compose down
docker compose up -d
```

### Stop Everything (Save Money!)
```bash
docker compose down
```
> ⚠️ Also go to AWS Console → EC2 → select your instance → **Instance State → Stop Instance** to stop billing. You can start it again later, but the **Public IP will change** (unless you use an Elastic IP).

### Check Memory
```bash
free -h
docker stats --no-stream
```

### Check Disk Space
```bash
df -h
```

### SSH Back Into Your Server (From Your Mac)
```bash
ssh -i ~/.ssh/social-media-key.pem ubuntu@YOUR_IP
cd social-media-app/social-media-platform-server
```

---

## FAQ: What Happens When I Close My Laptop / Stop the Instance?

| Action | Images & Data | Containers | What to do next time |
|--------|--------------|------------|----------------------|
| **Close laptop / close SSH** | ✅ Safe | ✅ Still running | Just SSH back in. App is still live. |
| **Stop** instance (AWS Console) | ✅ Safe (on disk) | ❌ Stopped | Start instance → SSH in → `docker compose up -d` (no rebuild) |
| **Terminate** instance | ❌ All deleted | ❌ All deleted | Start from scratch (new EC2, install Docker, clone, rebuild) |

### Close Laptop / Close SSH Terminal
Your EC2 is a cloud server — it runs 24/7 regardless of your laptop. Closing SSH is like walking away from the computer. Next time, just SSH back in:
```bash
ssh -i ~/.ssh/social-media-key.pem ubuntu@YOUR_IP
```

### Stop Instance (Recommended to Save Money)
When you **Stop** the instance from AWS Console, containers stop but all Docker images and data remain on the EBS disk. Next time:
1. Go to AWS Console → EC2 → Select instance → **Instance State → Start Instance**.
2. ⚠️ The **Public IP will change** (unless you have an Elastic IP).
3. SSH into the server with the new IP.
4. Restart containers (no rebuild needed):
```bash
cd social-media-app/social-media-platform-server
docker compose up -d
```
> 💡 Stopped instance only costs ~$0.08/day (EBS storage only). No EC2 charges.

### Terminate Instance (Everything Erased)
Terminating deletes the entire machine — OS, Docker, containers, images, data, swap, everything. You would need to redo all steps from Phase 1. Only terminate when you're completely done.

---

## Troubleshooting

### ❌ "Connection Refused" in Browser
- **Cause**: Security group doesn't allow the port, or the service isn't running.
- **Fix**:
  1. Go to AWS Console → EC2 → your instance → **Security tab** → click the Security Group.
  2. Check **Inbound rules** — make sure ports 3000, 8080 are listed with source `0.0.0.0/0`.
  3. Check service is running: `docker compose ps`.

### ❌ Services Crashing / Restarting (Exit Code 137)
- **Cause**: Out of Memory (OOM).
- **Fix**:
  1. Check swap: `free -h` — the Swap line should show `4.0Gi`.
  2. If no swap, run the swap commands from Step 3.1.
  3. Restart crashed services: `docker compose up -d`.

### ❌ "502 Bad Gateway"
- **Cause**: The backend hasn't fully started yet.
- **Fix**: Wait 2-3 minutes after starting services. Check logs: `docker compose logs -f api-gateway`.

### ❌ Docker Build Fails with "Killed" or OOM
- **Cause**: Not enough memory to build Java services.
- **Fix**: Build one service at a time (Step 5.1). Don't run `docker compose up --build` with all services at once.

### ❌ "No Space Left on Device"
- **Cause**: Disk is full from Docker build cache.
- **Fix**:
  ```bash
  # Remove unused images and build cache
  docker system prune -a
  # Check space
  df -h
  ```

### ❌ "Permission Denied" on SSH
- **Cause**: Key file permissions are wrong.
- **Fix**: `chmod 400 ~/.ssh/social-media-key.pem`

### ❌ Public IP Changed After Stopping/Starting Instance
- **Cause**: EC2 assigns a new Public IP each time you stop/start (not reboot).
- **Fix**: Use an **Elastic IP** (free while instance is running):
  1. EC2 → **Elastic IPs** → **Allocate Elastic IP address** → click **Allocate**.
  2. Select the new IP → **Actions** → **Associate Elastic IP address**.
  3. Select your instance → click **Associate**.
  4. Now this IP is permanent and won't change.

---

## Cost Summary (t3.small)

| Component | Monthly Cost |
|-----------|-------------|
| EC2 t3.small (on-demand, 24/7) | ~$15/month |
| EBS 30GB gp3 storage | ~$2.50/month |
| Data transfer (light) | ~$1-5/month |
| Elastic IP (while instance runs) | Free |
| **Total (without ALB)** | **~$18-22/month** |

> 💡 **Save money**: Stop the instance when not testing. You only pay for storage (~$2.50/month) when instance is stopped.
