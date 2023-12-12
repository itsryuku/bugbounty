import time

def timer():
  start_time = time.time()

  while True:
    try:
      elapsed_time = time.time() - start_time
      minutes = int(elapsed_time / 60)
      seconds = int(elapsed_time % 60)
      milliseconds = int((elapsed_time % 1) * 1000)

      print(f"\r{minutes:02d}:{seconds:02d}.{milliseconds:03d}", end='', flush=True)
      time.sleep(0.01)

    except KeyboardInterrupt:
      break

timer()