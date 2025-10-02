# chobighar Deployment Package Creator
# This script creates a production-ready deployment package

Write-Host "🚀 Creating chobighar Deployment Package..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean old build
Write-Host "📦 Step 1: Cleaning old build..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "   ✓ Cleaned old .next folder" -ForegroundColor Green
}
if (Test-Path "chobighar-deployment.zip") {
    Remove-Item -Force chobighar-deployment.zip
    Write-Host "   ✓ Removed old deployment package" -ForegroundColor Green
}
Write-Host ""

# Step 2: Build production
Write-Host "🔨 Step 2: Building production version..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ Build failed! Please check errors above." -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Create deployment package
Write-Host "📦 Step 3: Creating deployment package..." -ForegroundColor Yellow

$files = @(
    '.next',
    'public',
    'package.json',
    'package-lock.json',
    'next.config.ts',
    'server.js',
    '.env.production.local',
    'tsconfig.json',
    'postcss.config.mjs',
    'tailwind.config.ts'
)

# Verify all files exist
$missing = @()
foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        $missing += $file
    }
}

if ($missing.Count -gt 0) {
    Write-Host "   ⚠ Warning: Some files are missing:" -ForegroundColor Yellow
    foreach ($file in $missing) {
        Write-Host "      - $file" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Create the zip file
$existingFiles = $files | Where-Object { Test-Path $_ }
Compress-Archive -Path $existingFiles -DestinationPath 'chobighar-deployment.zip' -Force

$zipSize = (Get-Item 'chobighar-deployment.zip').Length / 1MB
Write-Host "   ✓ Deployment package created: chobighar-deployment.zip ($([math]::Round($zipSize, 2)) MB)" -ForegroundColor Green
Write-Host ""

# Step 4: Show deployment instructions
Write-Host "✅ DEPLOYMENT PACKAGE READY!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Upload 'chobighar-deployment.zip' to your cPanel server" -ForegroundColor White
Write-Host "   2. Extract the zip file in your application directory" -ForegroundColor White
Write-Host "   3. Run: npm install --production" -ForegroundColor White
Write-Host "   4. Configure Node.js app in cPanel:" -ForegroundColor White
Write-Host "      - Application Root: /home/username/chobighar" -ForegroundColor Gray
Write-Host "      - Application URL: https://chobighar.com" -ForegroundColor Gray
Write-Host "      - Application Startup File: server.js" -ForegroundColor Gray
Write-Host "   5. Add environment variables in cPanel:" -ForegroundColor White
Write-Host "      - NEXT_PUBLIC_API_URL=https://admin.chobighar.com" -ForegroundColor Gray
Write-Host "      - NODE_ENV=production" -ForegroundColor Gray
Write-Host "   6. Start the application" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see: BUILD_AND_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

# Display package contents
Write-Host "📦 Package Contents:" -ForegroundColor Cyan
Write-Host "   ✓ .next/ (build output)" -ForegroundColor Green
Write-Host "   ✓ public/ (static assets)" -ForegroundColor Green
Write-Host "   ✓ package.json (dependencies)" -ForegroundColor Green
Write-Host "   ✓ server.js (production server)" -ForegroundColor Green
Write-Host "   ✓ Configuration files" -ForegroundColor Green
Write-Host ""

Write-Host "⚠️  IMPORTANT NOTES:" -ForegroundColor Yellow
Write-Host "   • This is NOT a static site - requires Node.js server" -ForegroundColor White
Write-Host "   • Site connects to backend API dynamically" -ForegroundColor White
Write-Host "   • Backend must be accessible at: https://admin.chobighar.com" -ForegroundColor White
Write-Host "   • All features (search, forms, dynamic content) will work" -ForegroundColor White
Write-Host ""

Write-Host "🎉 Done! Your deployment package is ready." -ForegroundColor Green
