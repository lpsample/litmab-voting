#!/usr/bin/env python3
"""
Export Firebase Mailing List to CSV
"""

import json
import csv
import requests
from datetime import datetime

# Firebase configuration
FIREBASE_URL = "https://litmab-voting-default-rtdb.firebaseio.com"
MAILING_LIST_PATH = "/mailingList.json"

def fetch_mailing_list():
    """Fetch mailing list from Firebase"""
    url = f"{FIREBASE_URL}{MAILING_LIST_PATH}"
    print(f"Fetching data from Firebase...")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if not data:
            print("No mailing list entries found.")
            return []
        
        print(f"Found {len(data)} entries")
        return data
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def export_to_csv(data, filename="mailing-list.csv"):
    """Export mailing list to CSV"""
    if not data:
        print("No data to export")
        return
    
    # Prepare rows
    rows = []
    for key, entry in data.items():
        rows.append({
            'Name': entry.get('name', ''),
            'Email': entry.get('email', ''),
            'Phone': entry.get('phone', ''),
            'Timestamp': entry.get('timestamp', ''),
            'Source': entry.get('source', ''),
            'Firebase ID': key
        })
    
    # Sort by timestamp (newest first)
    rows.sort(key=lambda x: x['Timestamp'], reverse=True)
    
    # Write to CSV
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Name', 'Email', 'Phone', 'Timestamp', 'Source', 'Firebase ID']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"✓ Exported {len(rows)} entries to {filename}")
    
    # Print summary
    print("\nSummary:")
    print(f"  Total subscribers: {len(rows)}")
    if rows:
        print(f"  Most recent: {rows[0]['Name']} ({rows[0]['Email']})")
        print(f"  Oldest: {rows[-1]['Name']} ({rows[-1]['Email']})")

def main():
    print("=" * 60)
    print("Firebase Mailing List Exporter")
    print("=" * 60)
    print()
    
    # Fetch data
    data = fetch_mailing_list()
    
    if data is None:
        print("\nFailed to fetch data from Firebase")
        return
    
    if not data:
        print("\nNo mailing list entries to export")
        return
    
    # Export to CSV
    print()
    export_to_csv(data)
    
    print()
    print("=" * 60)
    print("Done! Open mailing-list.csv to view your subscribers")
    print("=" * 60)

if __name__ == '__main__':
    main()

# Made with Bob
