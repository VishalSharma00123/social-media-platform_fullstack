# AWS Deployment Guide for Social Media Platform

This guide details how to deploy the full stack social media application (Frontend + Backend Microservices + Databases) to a single AWS EC2 instance using Docker Compose.

## Prerequisites
- An AWS Account.
- Terminal with SSH access.
- The project files committed to a Git repository (GitHub/GitLab) OR ready to be copied.

---

## Step 1: Launch an EC2 Instance

1.  **Login to AWS Console** and navigate to **EC2**.
2.  Click **Launch Instance**.
3.  **Name**: `SocialMedia-Server`.
4.  **AMI**: Select **Ubuntu Server 24.04 LTS** (or 22.04).
5.  **Instance Type**: Select **t3.xlarge** (4 vCPU, 16GB RAM).
    *   *Warning*: The stack includes Kafka, valid MongoDB, Redis, and multiple Java Spring Boot services. A `t2.micro` or `t3.small` will **NOT** work and will crash due to Out of Memory (OOM) errors. A `t3.large` (8GB) might work but `t3.xlarge` is recommended for stability.
6.  **Key Pair**: Create a new key pair (e.g., `social-media-key`) and download the `.pem` file.
7.  **Network Settings**:
    *   Create a security group allowing:
        *   **SSH (22)** from `My IP` (for safety).
        *   **HTTP (80)** from `Anywhere` (0.0.0.0/0).
        *   (Optional) **Custom TCP (3000, 8080, 8761)** if you want to access services directly for debugging.
8.  **Storage**: Set to **30GB** gp3.
9.  Click **Launch Instance**.

---

## Step 2: Prepare the Instance

1.  Open your terminal.
2.  Move your key file to a safe location and restrict permissions:
    ```bash
    chmod 400 social-media-key.pem
    ```
3.  Connect to your instance (replace `YOUR_INSTANCE_IP` with the Public IPv4 address from AWS Console):
    ```bash
    ssh -i social-media-key.pem ubuntu@YOUR_INSTANCE_IP
    ```

4.  **Install Docker & Docker Compose**:
    Run the following commands on the EC2 instance:
    ```bash
    # Update packages
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg

    # Add Docker's official GPG key
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add the repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker Engine
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Add ubuntu user to docker group (avoids using sudo for docker)
    sudo usermod -aG docker ubuntu
    
    # Apply group changes
    newgrp docker
    ```

---

## Step 3: Deploy the Code

### Option A: Via Git (Recommended)
1.  Push your local code (with the new Dockerfile and docker-compose changes) to GitHub.
2.  On the EC2 instance:
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git social-media-app
    cd social-media-app
    ```

### Option B: Copy Files Directly (If no repo)
1.  From your **local machine**, initialize a git repo if you haven't (just to exclude ignored files easily) or zip your folder.
2.  Or use `scp` to copy the folder (this might take a while):
    ```bash
    # Run from your local machine
    scp -i social-media-key.pem -r /path/to/Social-Media-FullStack ubuntu@YOUR_INSTANCE_IP:~/social-media-app
    ```

---

## Step 4: Run the Application

1.  Navigate to the server directory where `docker-compose.yml` is located:
    ```bash
    # Depending on how you copied/cloned, path might vary.
    # Example:
    cd ~/social-media-app/social-media-platform-server
    ```

2.  **Start the services**:
    ```bash
    docker compose up -d --build
    ```
    *   This will take 10-20 minutes initially to download images, build the Spring Boot apps (Maven), and build the Next.js frontend.
    *   **Tip**: If the build fails due to memory, you might need to add swap space or upgrade instance size.

3.  **Monitor Logs**:
    To check if everything is running:
    ```bash
    docker compose logs -f
    ```
    Wait until you see "Started [ServiceName]" for all services.

---

## Step 5: Access the Application

1.  Open your browser.
2.  Go to `http://YOUR_INSTANCE_IP`.
    *   You should see the **Social Media Frontend**.
3.  The frontend will automatically communicate with the backend via the Nginx proxy on `/api`.

---

## Troubleshooting

-   **"502 Bad Gateway"**: Nginx is running but the backend (API Gateway) or Frontend is not ready yet. Wait a few minutes. Check logs with `docker compose logs -f api-gateway social-frontend`.
-   **"Connection Refused"**: Ensure your EC2 Security Group allows traffic on Port 80.
-   **High Memory Usage**: If services crash (Exit Code 137), your instance ran out of RAM. Add Swap memory:
    ```bash
    sudo fallocate -l 4G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    ```
