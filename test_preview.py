import urllib.request
import urllib.parse
import sys

base = "http://127.0.0.1:4173"

endpoints = [
    "/",
    "/assets/logo.png",
    "/assets/hero%201-rnoKV_8R.png",
    "/assets/invoCAD%20LOGO-DSHpFDii.png",
    "/assets/COLOR%20SORTING%20OUTPUT%20CONVEYOR-DnJizWwv.png",
    "/assets/FLAT%20BELT%20CONVEYOR-DcxF9jJL.png",
    "/assets/MODULER%20CONVEYOR-CTllZ1Dz.png",
    "/assets/MAKHANA%20OPEN%20GRADER-D8dcmUMh.png",
    "/assets/MAKHANA%20CLOSED%20GRADER-BdwgJGpU.png",
    "/assets/serviceImageOne-BnS0ZQwf.png",
    "/assets/serviceImageTwo-D2jH97DN.png",
    "/assets/draftingImage-BaxF8jRZ.jpg",
    "/assets/reverseEngineering-CO2ft1xD.png",
    "/assets/2dMigration-C_jY1EV7.png",
    "/assets/serviceImage-CoHIfGk1.png",
    "/assets/simulation-iMGdvlmw.png",
    "/assets/rendering-DggMth2J.png",
    "/assets/autoCADNesting-D8cea7AI.jpg",
    "/assets/bannerImage-Cwp5u9Ba.jpg"
]

all_ok = True
for ep in endpoints:
    url = base + ep
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5) as resp:
            status = resp.status
            size = len(resp.read())
            print(f"[{status}] {ep} - {size} bytes")
    except Exception as e:
        print(f"[FAIL] {ep}: {e}")
        all_ok = False

if not all_ok:
    sys.exit(1)
print("\nALL ENDPOINTS AND AUTHENTIC ASSETS RETURNED 200 OK!")
