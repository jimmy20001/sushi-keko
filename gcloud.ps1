# --- New Corrected Code ---
# Pipe the API key string directly into the gcloud command's standard input.
# PowerShell handles sending the string correctly.
$GEMINI_API_KEY_VALUE | gcloud secrets create $SECRET_NAME --replication-policy="automatic" --data-file=-```

---

### **Fully Corrected Windows PowerShell Script**

Here is the complete `deploy-sushi-keko.ps1` script with the fix applied. You can replace the content of your existing file with this.

```powershell
# ==============================================================================
# GCP Deployment Script for Sushi Keko Application (Windows PowerShell)
# ==============================================================================
# This script automates the entire setup and deployment process on GCP.
#
# It will:
# 1. Create a new GCP Project.
# 2. Set up all required infrastructure (Cloud Run, GCS, Secret Manager).
# 3. Configure a Global Load Balancer with CDN.
# 4. Create a Cloud Build trigger for continuous deployment from GitHub.
# ==============================================================================

# Stop the script immediately if any command fails.
$ErrorActionPreference = "Stop"

# --- USER INPUT ---
# The script will prompt you for the necessary information.

Write-Host "Welcome to the Sushi Keko GCP Deployment Automator for Windows!" -ForegroundColor Green
Write-Host "-------------------------------------------------------------"
Write-Host "Please provide the following information:" -ForegroundColor Yellow

$BILLING_ACCOUNT_ID = Read-Host -Prompt "Enter your GCP Billing Account ID (e.g., XXXXXX-XXXXXX-XXXXXX)"
$PROJECT_ID_BASE = Read-Host -Prompt "Enter a unique base name for your new GCP Project (e.g., sushi-keko-app)"
$GITHUB_REPO = Read-Host -Prompt "Enter your GitHub repository (e.g., your-username/your-repo-name)"
$GITHUB_BRANCH = Read-Host -Prompt "Enter the GitHub branch to deploy from (e.g., main)"

# Securely prompt for the API Key
Write-Host "Enter your Gemini API Key (input will be hidden):" -NoNewline
$SecureApiKey = Read-Host -AsSecureString
$GEMINI_API_KEY_VALUE = [System.Net.NetworkCredential]::new("", $SecureApiKey).Password
Write-Host "" # Newline for clean formatting

# --- CONFIGURATION ---

# Generate a unique project ID
$RandomSuffix = -join ((0..9) + ('a'..'z') | Get-Random -Count 6)
$PROJECT_ID = "$($PROJECT_ID_BASE)-$($RandomSuffix)"

$GCP_REGION = "us-central1"
$GCS_BUCKET_NAME = "sushi-keko-frontend-bucket-$($RandomSuffix)" # Globally unique bucket name
$CLOUD_RUN_SERVICE_NAME = "sushi-keko-backend"
$ARTIFACT_REPO_NAME = "sushi-keko-repo"
$SECRET_NAME = "GEMINI_API_KEY"

# --- SCRIPT START ---

Write-Host "🚀 Starting deployment with the following configuration:" -ForegroundColor Cyan
Write-Host "Project ID:           $($PROJECT_ID)"
Write-Host "Region:               $($GCP_REGION)"
Write-Host "Cloud Storage Bucket: $($GCS_BUCKET_NAME)"
Write-Host "GitHub Repo:          $($GITHUB_REPO)"
Write-Host "-------------------------------------------------------------"

# 1. PROJECT CREATION AND SETUP
Write-Host "✅ Step 1/6: Creating and configuring new GCP Project..." -ForegroundColor Green
gcloud projects create $PROJECT_ID
gcloud beta billing projects link $PROJECT_ID --billing-account=$BILLING_ACCOUNT_ID
gcloud config set project $PROJECT_ID

Write-Host "Enabling necessary GCP APIs... (This may take a few minutes)"
gcloud services enable `
  run.googleapis.com `
  build.googleapis.com `
  secretmanager.googleapis.com `
  artifactregistry.googleapis.com `
  compute.googleapis.com `
  cloudbuild.googleapis.com `
  iam.googleapis.com

Write-Host "Project setup complete."

# 2. INFRASTRUCTURE AND PERMISSIONS
Write-Host "✅ Step 2/6: Setting up infrastructure and IAM permissions..." -ForegroundColor Green

# Store Gemini API Key in Secret Manager
Write-Host "Storing Gemini API Key in Secret Manager..."
# ***** THIS IS THE CORRECTED LINE *****
# Pipe the API key string directly into the gcloud command's standard input.
$GEMINI_API_KEY_VALUE | gcloud secrets create $SECRET_NAME --replication-policy="automatic" --data-file=-

# Create Artifact Registry repository for Docker images
Write-Host "Creating Artifact Registry repository..."
gcloud artifacts repositories create $ARTIFACT_REPO_NAME `
    --repository-format="docker" `
    --location=$GCP_REGION `
    --description="Docker repository for Sushi Keko app"

# Create Cloud Storage bucket for the frontend
Write-Host "Creating Cloud Storage bucket..."
# PowerShell equivalent of 'sed' to update cloudbuild.yaml
(Get-Content -Path '.\cloudbuild.yaml' -Raw) -replace 'gs://sushi-keko-frontend-bucket', "gs://${GCS_BUCKET_NAME}" | Set-Content -Path '.\cloudbuild.yaml'

gsutil mb -p $PROJECT_ID "gs://${GCS_BUCKET_NAME}"
gsutil web set -m index.html -e index.html "gs://${GCS_BUCKET_NAME}"
gsutil iam ch allUsers:objectViewer "gs://${GCS_BUCKET_NAME}"

# Grant necessary permissions to the Cloud Build service account
Write-Host "Granting permissions to Cloud Build service account..."
$PROJECT_NUMBER = (gcloud projects describe $PROJECT_ID --format='value(projectNumber)').Trim()
$GCLOUD_BUILDS_SA = "${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${GCLOUD_BUILDS_SA}" `
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${GCLOUD_BUILDS_SA}" `
  --role="roles/secretmanager.secretAccessor"

# Grant the default Cloud Run service identity access to the secret
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" `
    --role="roles/secretmanager.secretAccessor"


Write-Host "Infrastructure and permissions setup complete."

# 3. INITIAL DEPLOYMENT VIA CLOUD BUILD
Write-Host "✅ Step 3/6: Triggering the first manual build and deployment..." -ForegroundColor Green
Write-Host "This will build and deploy both backend and frontend. It will take several minutes."
gcloud builds submit --config cloudbuild.yaml .

Write-Host "Initial deployment complete. The Cloud Run service is now live."

# 4. LOAD BALANCER & CDN SETUP
Write-Host "✅ Step 4/6: Configuring the Global Load Balancer and CDN..." -ForegroundColor Green
Write-Host "This will route traffic to your frontend and backend services."

# Create a Serverless NEG for the Cloud Run service
gcloud compute network-endpoint-groups create ($CLOUD_RUN_SERVICE_NAME + "-neg") `
  --region=$GCP_REGION `
  --network-endpoint-type="serverless" `
  --cloud-run-service=$CLOUD_RUN_SERVICE_NAME

# Create a backend service for the NEG
gcloud compute backend-services create ($CLOUD_RUN_SERVICE_NAME + "-backend-service") `
  --global `
  --load-balancing-scheme="EXTERNAL_MANAGED"

gcloud compute backend-services add-backend ($CLOUD_RUN_SERVICE_NAME + "-backend-service") `
  --global `
  --network-endpoint-group=($CLOUD_RUN_SERVICE_NAME + "-neg") `
  --network-endpoint-group-region=$GCP_REGION

# Create a backend bucket for the frontend (this enables CDN)
gcloud compute backend-buckets create ($GCS_BUCKET_NAME + "-backend") `
  --gcs-bucket-name=$GCS_BUCKET_NAME --enable-cdn --global

# Create the URL map to route traffic
gcloud compute url-maps create "sushi-keko-lb-map" `
  --default-backend-bucket=($GCS_BUCKET_NAME + "-backend")
  
gcloud compute url-maps add-path-matcher "sushi-keko-lb-map" `
    --default-service=($CLOUD_RUN_SERVICE_NAME + "-backend-service") `
    --path-matcher-name="api-matcher" `
    --path-rules="/api/*=($CLOUD_RUN_SERVICE_NAME + '-backend-service')"

# Create the HTTP proxy
gcloud compute target-http-proxies create "sushi-keko-http-proxy" --url-map="sushi-keko-lb-map"

# Reserve a global static IP
gcloud compute addresses create "sushi-keko-lb-ip" --global

# Create the global forwarding rule
gcloud compute forwarding-rules create "sushi-keko-http-rule" --global `
    --address="sushi-keko-lb-ip" `
    --target-http-proxy="sushi-keko-http-proxy" `
    --ports=80

Write-Host "Load Balancer is being provisioned. It may take 5-10 minutes to become fully active." -ForegroundColor Yellow

# 5. CONTINUOUS DEPLOYMENT TRIGGER
Write-Host "✅ Step 5/6: Setting up the CI/CD trigger with GitHub..." -ForegroundColor Green

# Connect Cloud Build to GitHub
# This step requires manual browser interaction
Write-Host "A browser window will now open to authorize Google Cloud Build with your GitHub account." -ForegroundColor Yellow
Write-Host "Please follow the on-screen instructions to install the GCP app on your selected repository." -ForegroundColor Yellow
gcloud alpha builds connections create github GITHUB_CONNECTION --region=$GCP_REGION

# Link the specific repository to the connection
$RepoFullName = $GITHUB_REPO.Replace("/", "--")
gcloud alpha builds repositories create $RepoFullName `
  --connection=GITHUB_CONNECTION `
  --remote-uri="https://github.com/${GITHUB_REPO}.git" `
  --region=$GCP_REGION

# Create the trigger
gcloud builds triggers create github `
  --name="deploy-sushi-keko-on-push" `
  --repository="projects/${PROJECT_ID}/locations/${GCP_REGION}/connections/GITHUB_CONNECTION/repositories/${RepoFullName}" `
  --branch-pattern="^${GITHUB_BRANCH}$" `
  --build-config="cloudbuild.yaml" `
  --region=$GCP_REGION

Write-Host "CI/CD trigger created. Future pushes to the '${GITHUB_BRANCH}' branch will automatically deploy the application."

# 6. FINAL OUTPUT
Write-Host "✅ Step 6/6: Deployment Summary" -ForegroundColor Green
Write-Host "-------------------------------------------------------------"
$LB_IP_ADDRESS = (gcloud compute addresses describe "sushi-keko-lb-ip" --global --format="value(address)").Trim()
Write-Host "🎉 DEPLOYMENT COMPLETE! 🎉" -ForegroundColor Magenta
Write-Host ""
Write-Host "Your application will be available at: http://${LB_IP_ADDRESS}" -ForegroundColor Cyan
Write-Host "(Note: The load balancer may take 5-10 minutes to become fully active)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your unique project ID is: ${PROJECT_ID}" -ForegroundColor Cyan
Write-Host "Keep this ID for future reference."
Write-Host "-------------------------------------------------------------"