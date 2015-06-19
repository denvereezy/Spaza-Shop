import sys

read_raw_file = open('Nelisa Sales History.csv') # open current file
read_raw_text  = read_raw_file.read()
new_text = read_raw_text.strip()

new_text = new_text.replace(',','\t')
# new_text = new_text.replace('::','\t') optional if you want double : to only include one column
new_text = new_text.replace(':','\t')

text_list = new_text.split('\n')
unique_items = []
for row in text_list:
    if row not in unique_items:
        unique_items.append(row)


new_file ='D:newfile.csv'
with open(new_file,'w') as write_output_file: #generate new file
    for i in range(0,len(unique_items)):
        write_output_file.write(unique_items[i]+'\n')
    write_output_file.close()
