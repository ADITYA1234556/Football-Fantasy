import chardet

input_file_path = r'D:\DEVOPS NEW LAPTOP\4. PROJECT\PLWebsite\prem_stats.csv'
output_file_path = r'D:\DEVOPS NEW LAPTOP\4. PROJECT\PLWebsite\prem_stats_utf.csv'

with open(input_file_path, 'r', encoding='windows-1252', errors='replace') as file:
    content = file.read()

with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(content)