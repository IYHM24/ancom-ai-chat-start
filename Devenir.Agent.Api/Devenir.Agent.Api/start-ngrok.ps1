# Script de PowerShell para lanzar ngrok (Solo en entorno Development)
$envMode = $env:ASPNETCORE_ENVIRONMENT
if ([string]::IsNullOrEmpty($envMode)) { 
    $envMode = "Development" 
}

# Validación para ejecutar únicamente en entorno de desarrollo
if ($envMode -eq "Development") {
    # Cambia .app por .dev tal cual te lo asignó ngrok en el dashboard
$domain = "jeffrey-noncompoundable-oversoftly.ngrok-free.dev"
$port = "5293"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " [DEV MODE] Iniciando túnel ngrok" -ForegroundColor Green
Write-Host " Puerto Backend: http://localhost:$port" -ForegroundColor Yellow
Write-Host " Dominio ngrok:  https://$domain" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

# Comando de ngrok con la sintaxis oficial --url=
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ngrok http http://localhost:$port --url=$domain"
} else {
    Write-Host "[PROD/RELEASE] Omite la ejecución de ngrok para el entorno: '$envMode'" -ForegroundColor Gray
}
