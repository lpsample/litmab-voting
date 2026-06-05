#!/usr/bin/env python3
"""
Rebuild squarespace-complete.html with all latest changes
"""

def read_file(filename):
    """Read file contents"""
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def extract_body_content(html):
    """Extract content between <body> and </body> tags"""
    start = html.find('<body>')
    end = html.find('</body>')
    if start != -1 and end != -1:
        return html[start + 6:end].strip()
    return ""

def main():
    print("Reading source files...")
    
    # Read all source files
    index_html = read_file('index.html')
    styles_css = read_file('styles.css')
    voting_js = read_file('voting.js')
    config_js = read_file('config.js')
    
    # Extract body content from index.html
    body_content = extract_body_content(index_html)
    
    print("Building squarespace-complete.html...")
    
    # Build the complete HTML
    complete_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Album Release Voting</title>
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
    
    <style>
{styles_css}
    </style>
</head>
<body>
{body_content}
    
    <script>
{config_js}

{voting_js}
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>'''
    
    # Write the complete file
    with open('squarespace-complete.html', 'w', encoding='utf-8') as f:
        f.write(complete_html)
    
    print("✅ squarespace-complete.html has been rebuilt successfully!")
    print(f"   Total lines: {len(complete_html.splitlines())}")
    print("\nNext steps:")
    print("1. Open squarespace-complete.html in a browser to test")
    print("2. Copy entire contents to Squarespace Code Block")
    print("3. Set to 'Display Source' mode")
    print("4. Save and publish")

if __name__ == '__main__':
    main()

# Made with Bob
