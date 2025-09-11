Get-ChildItem -Path "src" -Include "*.ts", "*.tsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $cleaned = $content -replace '[ \t]+(\r?\n)', '$1'
    Set-Content -Path $_.FullName -Value $cleaned -NoNewline
    Write-Host "Fixed trailing spaces in: $($_.FullName)"
}
