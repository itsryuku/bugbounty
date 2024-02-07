import subprocess
import sys

def takeover(targets):
    with open(targets, 'r') as file:
        for target in file:
          target = target.strip()
          cname = subprocess.run(['dig', target, 'CNAME', '+short'], capture_output=True, text=True).stdout.strip()
          if cname:
            ip = subprocess.run(['dig', cname, 'A', '+short'], capture_output=True, text=True).stdout.strip()
            if not ip:
               print(f'{target} points to {cname} and has no address associated with hostname')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('usage: python3 takeover.py <targets.txt>')
        sys.exit(1)
    takeover(sys.argv[1])
