# Frontend Deployment Package Creator for cPanel Node.js App
# This will create a zip with all necessary files for deployment

Write-Host "Creating frontend deployment package..." -ForegroundColor Green

# Create temp directory for packaging
$tempDir = "frontend-deploy-temp"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy necessary files
Write-Host "Copying files..." -ForegroundColor Yellow

# Essential Next.js files
Copy-Item -Path ".next" -Destination "$tempDir\.next" -Recurse
Copy-Item -Path "public" -Destination "$tempDir\public" -Recurse
Copy-Item -Path "node_modules" -Destination "$tempDir\node_modules" -Recurse

# Configuration files
Copy-Item -Path "package.json" -Destination "$tempDir\package.json"
Copy-Item -Path "package-lock.json" -Destination "$tempDir\package-lock.json"
Copy-Item -Path "next.config.ts" -Destination "$tempDir\next.config.ts"

# Environment file (production)
if (Test-Path ".env.production.local") {
    Copy-Item -Path ".env.production.local" -Destination "$tempDir\.env.production.local"
}
if (Test-Path ".env.local") {
    Copy-Item -Path ".env.local" -Destination "$tempDir\.env.local"
}

Write-Host "Creating zip file..." -ForegroundColor Yellow

# Create zip
$zipPath = "frontend-deploy-app-chobighar.zip"
if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -CompressionLevel Optimal

# Cleanup
Remove-Item -Recurse -Force $tempDir

Write-Host "`nDeployment package created: $zipPath" -ForegroundColor Green
Write-Host "File size: $((Get-Item $zipPath).Length / 1MB) MB" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Upload zip to cPanel File Manager" -ForegroundColor White
Write-Host "2. Extract in public_html/app (or your chosen directory)" -ForegroundColor White
Write-Host "3. Setup Node.js App in cPanel:" -ForegroundColor White
Write-Host "   - Node version: 18.x or higher" -ForegroundColor White
Write-Host "   - Application startup file: node_modules/next/dist/bin/next" -ForegroundColor White
Write-Host "   - Application command: start -p 3000" -ForegroundColor White
Write-Host "4. Set environment variable: NODE_ENV=production" -ForegroundColor White
