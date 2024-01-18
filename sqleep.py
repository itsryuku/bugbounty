import subprocess
import sys
import os
from urllib.parse import urlparse

def find_subdomain(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc or url
    output = f"{domain}.scope"
    command = f"subfinder -d {domain} | httpx -o {output}"
    print("[~] Gathering subdomains")
    process = subprocess.Popen(command, shell=True)
    process.wait()
    print(f"[+] subdomains saved at {output}")
    return output

def crawl_all(wordlist):
    crawled_dir = os.path.join(os.getcwd(), 'crawled')
    os.makedirs(crawled_dir, exist_ok=True)
    print(f"[+] Created folder: {crawled_dir}")
    with open(wordlist, 'r') as file:
        urls = file.read().splitlines()
        for url in urls:
            print(f"Crawling: {url}")
            filename = f"{urlparse(url).netloc}"
            output_path = os.path.join(crawled_dir, f"{filename}.crawl")
            command = f"echo '{url}' | gau > {output_path}"
            process = subprocess.Popen(command, shell=True)
            process.wait()

    for file in os.listdir(crawled_dir):
        filepath = os.path.join(crawled_dir, file)
        if os.path.isfile(filepath) and os.path.getsize(filepath) == 0:
            os.remove(filepath)
    print(f"[-] Deleted empty files..")


def test_sqli():
    crawled_dir = os.path.join(os.getcwd(), 'crawled')
    for file in os.listdir(crawled_dir):
        filepath = os.path.join(crawled_dir, file)
        if os.path.isfile(filepath) and os.path.getsize(filepath) > 0:
            print("[~] Testing {filepath} for SQLi")
            command = f"python sqlmap.py -m {filepath} --batch --random-agent"
            process = subprocess.Popen(command, shell=True)
            process.wait()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py wordlist.txt")
        sys.exit(1)
    try:
        wordlist = find_subdomain(sys.argv[1])
        crawl_all(wordlist)
        test_sqli()
    except KeyboardInterrupt:
        print("Quiting..")
