@echo off
cd /d "%~dp0"
echo ========================================================
echo   Pushing Portfolio to GitHub (chethan_portfolio)
echo ========================================================
git push -u origin main
echo.
echo ========================================================
echo If push succeeded, your repo is at:
echo   https://github.com/chethan-0427/chethan_portfolio
echo.
echo GitHub Pages live site will be at:
echo   https://chethan-0427.github.io/chethan_portfolio/
echo ========================================================
pause
