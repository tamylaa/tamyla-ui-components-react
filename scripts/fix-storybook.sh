#!/bin/bash

# Storybook Fix and Management Script
# This script fixes common Storybook issues and provides management commands

echo "🔧 Storybook Fix and Management Script"
echo "======================================"

# Function to check if Storybook is running
check_storybook() {
    if pgrep -f "storybook" > /dev/null; then
        echo "✅ Storybook is running"
        return 0
    else
        echo "❌ Storybook is not running"
        return 1
    fi
}

# Function to start Storybook
start_storybook() {
    echo "🚀 Starting Storybook..."
    npm run storybook &
    sleep 5
    if check_storybook; then
        echo "✅ Storybook started successfully"
        echo "📖 Access at: http://localhost:6006/"
    else
        echo "❌ Failed to start Storybook"
        exit 1
    fi
}

# Function to stop Storybook
stop_storybook() {
    echo "🛑 Stopping Storybook..."
    pkill -f "storybook" || true
    sleep 2
    if ! check_storybook; then
        echo "✅ Storybook stopped successfully"
    else
        echo "❌ Failed to stop Storybook"
    fi
}

# Function to clean Storybook cache
clean_storybook() {
    echo "🧹 Cleaning Storybook cache..."
    rm -rf node_modules/.cache/storybook
    rm -rf .storybook-out
    echo "✅ Storybook cache cleaned"
}

# Function to fix common issues
fix_storybook() {
    echo "🔧 Fixing common Storybook issues..."

    # Remove conflicting preview files
    if [ -f ".storybook/preview.ts" ] && [ -f ".storybook/preview.tsx" ]; then
        echo "📝 Removing conflicting preview.ts file..."
        rm .storybook/preview.ts
    fi

    # Clean cache
    clean_storybook

    echo "✅ Common issues fixed"
}

# Main script logic
case "$1" in
    "start")
        start_storybook
        ;;
    "stop")
        stop_storybook
        ;;
    "restart")
        stop_storybook
        sleep 2
        start_storybook
        ;;
    "status")
        check_storybook
        ;;
    "clean")
        clean_storybook
        ;;
    "fix")
        fix_storybook
        ;;
    "dev")
        fix_storybook
        start_storybook
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|clean|fix|dev}"
        echo ""
        echo "Commands:"
        echo "  start   - Start Storybook"
        echo "  stop    - Stop Storybook"
        echo "  restart - Restart Storybook"
        echo "  status  - Check if Storybook is running"
        echo "  clean   - Clean Storybook cache"
        echo "  fix     - Fix common Storybook issues"
        echo "  dev     - Fix issues and start Storybook (recommended)"
        exit 1
        ;;
esac
