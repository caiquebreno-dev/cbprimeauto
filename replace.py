import re

with open('style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fonts
content = re.sub(r"--font-display:\s*'Cinzel',\s*serif;", "--font-display: 'Titillium Web', sans-serif;", content)
content = re.sub(r"--font-body:\s*'Montserrat',\s*sans-serif;", "--font-body: 'Titillium Web', sans-serif;", content)

# To avoid replacing already replaced things, we will use a function
def replace_weight(m):
    weight = int(m.group(1))
    if weight >= 700:
        return 'font-weight: 400'
    elif weight >= 500:
        return 'font-weight: 300'
    else:
        return 'font-weight: 200'

content = re.sub(r'font-weight:\s*(\d00)', replace_weight, content)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(content)
print('Replacement complete.')
