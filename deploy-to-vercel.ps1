# Quick Deploy to Vercel Script
# Run this to deploy your chobighar site to Vercel

Write-Host "🚀 chobighar - Quick Deploy to Vercel" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "   ⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   ❌ Failed to install Vercel CLI" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install manually: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "   ✅ Vercel CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "   ✅ Vercel CLI is already installed" -ForegroundColor Green
}
Write-Host ""

# Check if logged in
Write-Host "🔐 Checking Vercel authentication..." -ForegroundColor Yellow
$vercelWhoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ⚠️  Not logged in to Vercel" -ForegroundColor Yellow
    Write-Host "   📝 Please login to continue..." -ForegroundColor Cyan
    Write-Host ""
    vercel login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   ❌ Login failed" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "   ✅ Successfully logged in!" -ForegroundColor Green
} else {
    Write-Host "   ✅ Already logged in as: $vercelWhoami" -ForegroundColor Green
}
Write-Host ""

# Confirm deployment
Write-Host "🎯 Ready to deploy to Vercel!" -ForegroundColor Green
Write-Host ""
Write-Host "This will:" -ForegroundColor White
Write-Host "  • Build your Next.js application" -ForegroundColor Gray
Write-Host "  • Deploy to Vercel production" -ForegroundColor Gray
Write-Host "  • Make it live at: chobighar.vercel.app" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Do you want to continue? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "❌ Deployment cancelled" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Deploy to Vercel
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "  1. Check if you have a vercel.json file" -ForegroundColor Gray
    Write-Host "  2. Ensure all dependencies are in package.json" -ForegroundColor Gray
    Write-Host "  3. Check the error messages above" -ForegroundColor Gray
    Write-Host "  4. Try: vercel --debug for more details" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ Deployment Successful!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 View your deployment:" -ForegroundColor Cyan
Write-Host "   https://vercel.com/dashboard" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your site is live at:" -ForegroundColor Cyan
Write-Host "   https://chobighar.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "⚙️  Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Test your site in the browser" -ForegroundColor Gray
Write-Host "   2. Add environment variables in Vercel dashboard:" -ForegroundColor Gray
Write-Host "      - NEXT_PUBLIC_API_URL=https://admin.chobighar.com" -ForegroundColor Gray
Write-Host "      - NEXT_PUBLIC_FRONTEND_URL=https://chobighar.vercel.app" -ForegroundColor Gray
Write-Host "   3. Add custom domain if needed (chobighar.com)" -ForegroundColor Gray
Write-Host "   4. Update Django backend CORS settings" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Documentation: VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
