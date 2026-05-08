from playwright.sync_api import sync_playwright
import os

url = 'http://localhost:5173'
screenshot_path = '/Users/bytedance/.gemini/tmp/careervoy-ai/debug_screenshot.png'

# Ensure the directory for the screenshot exists
os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)

console_logs = []

def handle_console_message(msg):
    log_entry = f"[{msg.type}] {msg.text}"
    console_logs.append(log_entry)
    print(f"BROWSER_CONSOLE: {log_entry}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})

    page.on("console", handle_console_message)

    print(f"Navigating to {url}...")
    page.goto(url)
    print("Waiting for network idle...")
    page.wait_for_load_state('networkidle')
    print("Network is idle.")

    print(f"Taking screenshot and saving to {screenshot_path}...")
    page.screenshot(path=screenshot_path, full_page=True)
    print("Screenshot taken.")

    browser.close()

print(f"\n--- Captured {len(console_logs)} console messages ---")
if not console_logs:
    print("No console messages were captured.")

