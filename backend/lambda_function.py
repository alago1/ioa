import os
from os import path
import time
import fcntl
import json
from datetime import datetime

IOA_READING_PATH = "/mnt/ioa"


def get_readings(max_entries):
    files = [
        p
        for p in os.listdir(IOA_READING_PATH)
        if path.isfile(path.join(IOA_READING_PATH, p))  # and p != "profiles.json"
    ]

    readings = []
    for fpath in files:
        if len(readings) >= max_entries:
            break

        p = path.join(IOA_READING_PATH, fpath)
        with open(p, "r") as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            readings.extend(json.load(f).sort(key=lambda x: -x["timestamp"]))
            fcntl.flock(f, fcntl.LOCK_UN)

    if len(readings) > max_entries:
        readings = readings[:max_entries]

    return readings


def publish_reading(reading_obj):
    latest_reading = max(
        p
        for p in os.listdir(IOA_READING_PATH)
        if path.isfile(path.join(IOA_READING_PATH, p))  # and p != "profiles.json"
    )

    t = time.gmtime(reading_obj["timestamp"])
    new_reading = time.strftime("%Y_%M_%d_%H.json", t)

    latest_file = path.join(IOA_READING_PATH, max(latest_reading, new_reading))
    with open(latest_file, "w+") as f:
        fcntl.flock(f, fcntl.LOCK_EX)
        hour_readings = json.load(f) if latest_reading == new_reading else []
        hour_readings.append(reading_obj)
        json.dump([hour_readings], f)
        fcntl.flock(f, fcntl.LOCK_UN)


def lambda_handler(event, context):
    method = event["requestContext"]["http"]["method"]
    if method == "GET":
        max_entries = max(event["pathParameters"].get("number_entries", 10), 1)

        if type(max_entries) is not int:
            max_entries = 5

        return get_readings(max_entries)
    elif method == "POST":
        reading = event["body"]

        if "timestamp" not in reading:
            reading["timestamp"] = datetime.now().timestamp()

        if "moisture" not in reading:
            reading["moisture"] = 0.0

        if "profile" not in reading:
            reading["profile"] = None

        publish_reading(reading)
        return "OK"
    else:
        return "Unsupported"
