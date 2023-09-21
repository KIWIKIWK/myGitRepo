from urllib.parse import urlparse
import ipaddress
import socket

url="https://han.gl/JJKIgS"

print(urlparse(url))
print(socket.gethostbyname(urlparse(url).netloc))
print(ipaddress.ip_address(socket.gethostbyname(urlparse(url).netloc)).is_global)
