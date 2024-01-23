import httpx
import asyncio
import logging
import argparse
import aiofiles
from rich.console import Console
from rich.logging import RichHandler

CONCURRENT_REQUESTS = 30

async def fuzz_path(targets, wordlist):
    console = Console(log_path=False)
    logging.basicConfig(
        level=logging.INFO,
        format="%(message)s",
        handlers=[RichHandler(console=console, rich_tracebacks=True)],
    )

    async with httpx.AsyncClient(
        verify=False,
        timeout=10,
        limits=httpx.Limits(max_keepalive_connections=CONCURRENT_REQUESTS),
    ) as client, aiofiles.open(targets, "r") as tfile, aiofiles.open(
        wordlist, "r"
    ) as wfile:

        targets = [line.strip() for line in await tfile.readlines()]
        files = [line.strip() for line in await wfile.readlines()]

        semaphore = asyncio.Semaphore(CONCURRENT_REQUESTS)

        async def test_url(target, file):
            url = f"{target}/{file}"
            async with semaphore:
                try:
                    response = await client.get(url)
                    if response.status_code == 200:
                        console.log(f"[white]Found [/][bold green]{file}[/] [white]exposed:[/] {url}")
                except (httpx.ReadTimeout, httpx.ConnectTimeout):
                    pass
                except httpx.HTTPError as e:
                    console.log(f"Error testing {url}: {e}")

        tasks = []
        for target in targets:
            base_url = f"{target}"
            tasks.extend([test_url(base_url, file) for file in files])

        await asyncio.gather(*tasks, return_exceptions=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-t", "--targets", help="Wordlist containing targets to test.", required=True
    )
    parser.add_argument("-w", "--wordlist", required=True)
    args = parser.parse_args()
    asyncio.run(fuzz_path(args.targets, args.wordlist))
