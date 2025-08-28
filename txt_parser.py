import os
import json
import re

'''
Parser script used to transform downloaded EU trial data text files into a JSON dump. JSON is then ingested by the Next.js application
and parsed further together with the US data fetched through API.
'''
# Folder where your 25 files are stored
input_folder = 'data'
output_file = 'output/eu_clinical_trials.json'

trialStatusPattern = r'\b\w+\([^)]*\)|Outside EU/EEA'

all_entries = []
fieldname_enums = {
    "Gender": set(),
    "Population Age": set(),
    "Trial protocol regions": set(),
    "Trial protocol statuses": set()
}

# Loop through all files in the folder
for filename in os.listdir(input_folder):
  with open(os.path.join(input_folder, filename), 'r', encoding='utf-8') as f:
    content = f.read()
    # Split on double newlines = each entry
    blocks = [block.strip() for block in content.split('\n\n') if block.strip()]
    
    for block in blocks:
      entry = {}
      for line in block.splitlines():
        if ':' in line:
          key, value = line.split(':', 1)
          key, value = key.strip(), value.strip()

          if key.lower() in ['medical condition', 'population age', 'gender']:
            entry[key] = [v.strip() for v in value.split(',')]
          elif key.lower() == "trial protocol":
            trialStatuses = re.findall(trialStatusPattern, value.strip())
            parsedStatusList = []
            for status in trialStatuses:
              if status == "Outside EU/EEA":
                fieldname_enums["Trial protocol regions"].add(status)
                parsedStatusList.append({ status: "Unknown" })
              else:
                parsedStatusList.append({ status.split('(')[0]: status.split('(')[1][:-1] })
                fieldname_enums["Trial protocol regions"].add(status.split('(')[0])
                fieldname_enums["Trial protocol statuses"].add(status.split('(')[1][:-1])
            entry[key] = parsedStatusList
          else:
              entry[key] = value

          if key.strip() == "Trial protocol":
            continue
          elif key.strip() in fieldname_enums:
            fieldname_enums[key.strip()].update([v.strip() for v in value.split(',')])
      if entry:
        all_entries.append(entry)

# Get all unique fieldnames across all entries
fieldnames = set()
for entry in all_entries:
    fieldnames.update(entry.keys())

print(fieldname_enums)
with open(output_file, 'w', encoding='utf-8') as json_file:
  json.dump(all_entries, json_file, indent=2)