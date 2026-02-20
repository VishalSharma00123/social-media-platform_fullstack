# AWS Deployment Guide with Application Load Balancer (ALB)

This guide details how to deploy your full-stack social media application using an AWS Application Load Balancer (ALB) instead of accessing ports directly. This architecture provides better routing, SSL management, and AWS integration.

> **Note**: This setup uses a `t3.small` instance (2 vCPU, 2GB RAM) optimized for testing/practice with ~20 users.

## Architecture Overview
- **User** -> **AWS ALB (Port 80/443)** -> **Target Groups** -> **EC2 Instance (Docker Compose)**
- **Routes:**
  - `/api/*` -> Forward to **API Gateway** (Port 8080)
  - `/ws/*` -> Forward to **API Gateway** (Port 8080) - *For WebSockets*
  - `/*` (Default) -> Forward to **Frontend** (Port 3000)

---

## Step 1 to 3: Launch Instance & Deploy Code
Follow Steps 1, 2, and 3 from `AWS_DEPLOYMENT.md` to:
1.  Launch an EC2 instance (Ubuntu 24.04, **t3.small**).
2.  **Add 4GB swap space** (mandatory for t3.small).
3.  Install Docker and Docker Compose.
4.  Deploy your code (Clone repo or copy files).

**Important**: Use the staged startup approach from `AWS_DEPLOYMENT.md` Step 4 to avoid OOM during builds on t3.small.

To run the app:
```bash
cd ~/social-media-app/social-media-platform-server

# Start infrastructure first
docker compose up -d mongodb redis zookeeper kafka
# Wait ~30s, then start services
docker compose up -d eureka-server
# Wait ~40s for Eureka to be healthy
docker compose up -d api-gateway user-service post-service message-service notification-service admin-service
docker compose up -d social-frontend
```
Ensure all services are healthy (`docker compose ps`).

---

## Step 4: Security Group Configuration (Before creating ALB)

1.  **Go to EC2 Console** -> **Reference your Instance's Security Group**.
2.  **Edit Inbound Rules**:
    *   Allow **TCP 3000** from `Anywhere` (0.0.0.0/0) *OR* from your VPC CIDR (if you want strict security, allow only from ALB Security Group later).
    *   Allow **TCP 8080** from `Anywhere` (0.0.0.0/0) *OR* VPC CIDR.
    *   Allow **SSH (22)** from your IP.

---

## Step 5: Create Target Groups

You need two target groups: one for the Frontend and one for the Backend.

### 1. Frontend Target Group
1.  Navigate to **EC2** -> **Load Balancing** -> **Target Groups**.
2.  Click **Create target group**.
3.  **Choose a target type**: `Instances`.
4.  **Target Group Name**: `social-media-frontend-tg`.
5.  **Protocol**: `HTTP`.
6.  **Port**: `3000`.
7.  **VPC**: Select your default VPC (same as EC2).
8.  **Health Check path**: `/` (Success codes: 200).
9.  Click **Next**.
10. Select your **EC2 Instance** from the list.
11. Click **Include as pending below**.
12. Click **Create target group**.

### 2. Backend Target Group
1.  Click **Create target group**.
2.  **Choose a target type**: `Instances`.
3.  **Target Group Name**: `social-media-backend-tg`.
4.  **Protocol**: `HTTP`.
5.  **Port**: `8080`.
6.  **Health Check path**: `/actuator/health` (or `/` if actuator is secured/unavailable, but actuator is preferred).
7.  Click **Next**.
8. Select your **EC2 Instance**.
9.  Click **Include as pending below**.
10. Click **Create target group**.

---

## Step 6: Create Application Load Balancer (ALB)

1.  Navigate to **Load Balancers** -> **Create Load Balancer**.
2.  Select **Application Load Balancer**.
3.  **Name**: `social-media-alb`.
4.  **Scheme**: Internet-facing.
5.  **IP address type**: IPv4.
6.  **Network mapping**:
    *   Select your VPC.
    *   Select at least **two subnets** (Availability Zones).
7.  **Security groups**: Create a new SG (e.g., `alb-sg`) allowing HTTP (80) and HTTPS (443) from `Anywhere`.
8.  **Listeners and routing**:
    *   **Listener HTTP:80** -> Default action: Forward to `social-media-frontend-tg`.
9.  Click **Create load balancer**.

---

## Step 7: Configure ALB Routing Rules

1.  Wait for the ALB to be `Active`.
2.  Select the ALB and go to the **Listeners and rules** tab.
3.  Click on the **Rule ID** for the HTTP:80 listener (usually routes to frontend by default).
4.  Click **Add rule** (or "Manage Rules" -> "+" button).
5.  **Insert Rule**:
    *   **Name**: `BackendRouting`.
    *   **Condition**: Path pattern.
        *   Value 1: `/api/*`
        *   Value 2: `/ws/*` (If using WebSockets on same port).
        *   Value 3: `/actuator/*` (Optional, for monitoring).
    *   **Action**: Forward to target group -> `social-media-backend-tg`.
    *   **Priority**: 1 (Ensure this is higher priority than the default rule).
6.  **Save**.

**Resulting Logic**:
- If URL is `myapp.com/api/users` -> Goes to EC2:8080 (Backend).
- If URL is `myapp.com/api/posts` -> Goes to EC2:8080 (Backend).
- If URL is `myapp.com/dashboard` -> Goes to EC2:3000 (Frontend).

---

## Step 8: Finalize & Test

1.  Copy the **DNS name** of your ALB (e.g., `social-media-alb-12345.us-east-1.elb.amazonaws.com`).
2.  Open it in your browser.
    *   You should see the Frontend.
3.  Open Network Tab (F12) and check API calls.
    *   They should go to `http://ALB-DNS-NAME/api/...` and return 200 OK.

## Troubleshooting
- **502 Bad Gateway**:
  - Check Target Groups health status. If "Unhealthy", check if EC2 ports 3000/8080 are open in Security Group.
  - Check if services are running: `docker compose ps`.
  - On t3.small, services may take longer to start. Wait 2-3 minutes after `docker compose up`.
- **404 on API calls**:
  - Verify the path pattern rule `/api/*`.
  - Check logs for Gateway: `docker compose logs -f api-gateway`.
- **Services crashing (Exit Code 137)**:
  - This is OOM. Verify swap is active: `free -h`.
  - Restart crashed services: `docker compose up -d`.

## Cost Estimate (t3.small)
| Component | Monthly Cost |
|-----------|-------------|
| EC2 t3.small (on-demand) | ~$15/month |
| ALB | ~$20/month |
| EBS 30GB gp3 | ~$2.50/month |
| Data transfer (light usage) | ~$1-5/month |
| **Total** | **~$38-42/month** |

> **Tip**: Use a **Spot Instance** for the EC2 to save ~70% ($4.50/month instead of $15), but it may be interrupted. Fine for practice/testing.

---

## Quick Reference: Step Order (Follow This Exactly)

| # | Step | From Which File | What It Does |
|---|------|----------------|--------------|
| 1 | Phase 1 (Steps 1.1–1.5) | `AWS_DEPLOYMENT.md` | Launch EC2 instance |
| 2 | Phase 2 (Steps 2.1–2.4) | `AWS_DEPLOYMENT.md` | SSH into the server |
| 3 | Phase 3 (Steps 3.1–3.2) | `AWS_DEPLOYMENT.md` | Swap space + Install Docker |
| 4 | Phase 4 (Steps 4.1–4.3) | `AWS_DEPLOYMENT.md` | Clone your repo onto the server |
| 5 | Phase 5 (Steps 5.1–5.6) | `AWS_DEPLOYMENT.md` | Build & start all Docker services |
| 6 | Step 4 | `AWS_ALB_SETUP.md` | Security Group config for ALB |
| 7 | Step 5 | `AWS_ALB_SETUP.md` | Create Target Groups |
| 8 | Step 6 | `AWS_ALB_SETUP.md` | Create ALB |
| 9 | Step 7 | `AWS_ALB_SETUP.md` | Configure ALB routing rules |
| 10 | Step 8 | `AWS_ALB_SETUP.md` | Test everything |

> **Note**: The app must be running (Step 5 done) before setting up ALB (Steps 6–10), because ALB needs healthy targets to route to.
