import sys

read_raw_file = open('Nelisa Sales History.csv') # open current file
read_raw_text  = read_raw_file.read()
new_text = read_raw_text.strip()

new_text = new_text.replace(';','\t')

text_list = new_text.split('\r')
unique_items = []


for row in text_list:
    if row not in unique_items:
        unique_items.append(row)

print row

