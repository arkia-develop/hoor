#!/usr/bin/env python3
"""
Comprehensive Alt Tags Update Script for حور لنقل العفش Website
Updates all image alt tags to be more descriptive and SEO-friendly
"""

import os
import re
import glob

def update_alt_tags():
    """Update alt tags in all HTML files"""
    
    # Define the files to update
    html_files = glob.glob("*.html")
    
    # Alt tag improvements
    alt_replacements = {
        # Call button improvements
        'alt="إتصل بنا"': 'alt="اتصل بنا الآن - حور لنقل العفش الكويت 66401171"',
        'alt="إتصل بنا"': 'alt="اتصل بنا الآن - حور لنقل العفش الكويت 66401171"',
        
        # WhatsApp button improvements
        'alt="واتساب"': 'alt="تواصل معنا عبر واتساب - حور لنقل العفش"',
        
        # Article image improvements
        'alt="نقل سريع"': 'alt="أسرار النقل السريع للعفش - نصائح من حور"',
        'alt="تغليف آمن"': 'alt="دليل التغليف الآمن للأثاث - نصائح من خبراء حور"',
        'alt="نقل موسمي"': 'alt="النقل الموسمي في الكويت - أفضل الأوقات لنقل العفش"',
        'alt="نقل مكاتب"': 'alt="نقل المكاتب باحترافية - خدمات حور للشركات"',
        
        # Logo improvements
        'alt="حور لنقل العفش"': 'alt="حور لنقل العفش - أفضل شركة نقل أثاث في الكويت"',
        'alt="حور - شركة نقل عفش الكويت"': 'alt="حور - شركة نقل عفش الكويت - خدمات احترافية"',
        
        # Portfolio improvements
        'alt="تغليف أثاث فاخر"': 'alt="تغليف أثاث فاخر بأعلى جودة - خدمات حور"',
        'alt="فك وتركيب باحتراف"': 'alt="فك وتركيب أثاث باحترافية - خبراء حور"',
        'alt="سيارات مبطنة ومجهزة"': 'alt="سيارات نقل عفش مبطنة ومجهزة - حور"',
        'alt="خدمات التخزين"': 'alt="خدمات التخزين الآمنة - مستودعات حور"',
    }
    
    updated_files = []
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original_content = content
            
            # Apply all replacements
            for old_alt, new_alt in alt_replacements.items():
                content = content.replace(old_alt, new_alt)
            
            # Only write if content changed
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(content)
                updated_files.append(file_path)
                print(f"✅ Updated: {file_path}")
            else:
                print(f"⏭️  No changes needed: {file_path}")
                
        except Exception as e:
            print(f"❌ Error updating {file_path}: {e}")
    
    print(f"\n🎉 Alt tags update complete!")
    print(f"📊 Files updated: {len(updated_files)}")
    print(f"📋 Updated files: {', '.join(updated_files)}")

if __name__ == "__main__":
    update_alt_tags()
